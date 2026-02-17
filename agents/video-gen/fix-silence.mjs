import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUTPUT_DIR = path.join(__dirname, 'output');
const AUDIO_DIR = path.join(OUTPUT_DIR, 'audio');
const SLIDES_DIR = path.join(OUTPUT_DIR, 'slides');
const FINAL_DIR = path.join(OUTPUT_DIR, 'final');
const FIXED_DIR = path.join(AUDIO_DIR, 'fixed');
const TEMP_DIR = path.join(AUDIO_DIR, 'temp');

const SILENCE_THRESHOLD = '-30dB';
const MIN_SILENCE_DETECT = 0.35; // detect silences longer than this
const TARGET_PAUSE = 0.25; // replace long silences with this duration

const PAUSE_AFTER = [
  1.5, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  1.0, 1.0, 1.0, 1.0, 1.0, 1.5, 1.0, 2.0,
];

async function ensureDirs() {
  for (const dir of [FIXED_DIR, TEMP_DIR, FINAL_DIR]) {
    await fs.mkdir(dir, { recursive: true });
  }
}

function detectSilences(filePath) {
  const output = execSync(
    `ffmpeg -i "${filePath}" -af silencedetect=noise=${SILENCE_THRESHOLD}:d=${MIN_SILENCE_DETECT} -f null - 2>&1`,
    { encoding: 'utf8', timeout: 30000 }
  );

  const silences = [];
  const lines = output.split('\n');

  let currentStart = null;
  for (const line of lines) {
    const startMatch = line.match(/silence_start:\s*([\d.]+)/);
    const endMatch = line.match(/silence_end:\s*([\d.]+)/);

    if (startMatch) {
      currentStart = parseFloat(startMatch[1]);
    }
    if (endMatch && currentStart !== null) {
      silences.push({
        start: currentStart,
        end: parseFloat(endMatch[1]),
      });
      currentStart = null;
    }
  }

  return silences;
}

function getDuration(filePath) {
  const dur = execSync(
    `ffprobe -v error -show_entries format=duration -of csv=p=0 "${filePath}" 2>/dev/null`,
    { encoding: 'utf8', timeout: 10000 }
  ).trim();
  return parseFloat(dur);
}

async function fixAudioFile(inputPath, outputPath, slideNum) {
  const silences = detectSilences(inputPath);
  const totalDuration = getDuration(inputPath);

  if (silences.length === 0) {
    // No silence issues, just copy
    execSync(`cp "${inputPath}" "${outputPath}"`);
    return { original: totalDuration, fixed: totalDuration, removed: 0 };
  }

  // Build list of voiced segments with target pauses between them
  const segments = [];
  let pos = 0;

  for (const silence of silences) {
    // Voiced segment before this silence
    if (silence.start > pos) {
      segments.push({ type: 'voice', start: pos, end: silence.start });
    }
    // Replace long silence with target pause
    segments.push({ type: 'pause', duration: TARGET_PAUSE });
    pos = silence.end;
  }

  // Remaining voiced segment after last silence
  if (pos < totalDuration) {
    segments.push({ type: 'voice', start: pos, end: totalDuration });
  }

  // Extract voiced segments and create pause files
  const tempFiles = [];
  const concatEntries = [];
  let idx = 0;

  for (const seg of segments) {
    const tempFile = path.join(TEMP_DIR, `s${slideNum}_part_${String(idx).padStart(3, '0')}.wav`);

    if (seg.type === 'voice') {
      const duration = seg.end - seg.start;
      if (duration < 0.01) continue; // skip tiny fragments
      execSync(
        `ffmpeg -y -i "${inputPath}" -ss ${seg.start.toFixed(4)} -t ${duration.toFixed(4)} -c:a pcm_s16le "${tempFile}" 2>/dev/null`,
        { timeout: 15000 }
      );
    } else {
      // Generate silence of target duration
      execSync(
        `ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t ${seg.duration.toFixed(4)} -c:a pcm_s16le "${tempFile}" 2>/dev/null`,
        { timeout: 10000 }
      );
    }

    tempFiles.push(tempFile);
    concatEntries.push(`file '${tempFile}'`);
    idx++;
  }

  // Concatenate all segments
  const concatFile = path.join(TEMP_DIR, `s${slideNum}_concat.txt`);
  await fs.writeFile(concatFile, concatEntries.join('\n'));

  // Join into final wav, then convert to m4a
  const tempWav = path.join(TEMP_DIR, `s${slideNum}_joined.wav`);
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${concatFile}" -c:a pcm_s16le "${tempWav}" 2>/dev/null`,
    { timeout: 30000 }
  );

  execSync(
    `ffmpeg -y -i "${tempWav}" -c:a aac -b:a 192k "${outputPath}" 2>/dev/null`,
    { timeout: 30000 }
  );

  const fixedDuration = getDuration(outputPath);
  const removed = totalDuration - fixedDuration;

  // Cleanup temp files
  for (const f of tempFiles) {
    await fs.unlink(f).catch(() => {});
  }
  await fs.unlink(concatFile).catch(() => {});
  await fs.unlink(tempWav).catch(() => {});

  return { original: totalDuration, fixed: fixedDuration, removed };
}

async function compositeVideo(durations) {
  console.log('\n Compositing video with fixed audio...');

  await fs.mkdir(FINAL_DIR, { recursive: true });

  const segmentPaths = [];

  for (let i = 1; i <= 17; i++) {
    const num = String(i).padStart(2, '0');
    const slidePath = path.join(SLIDES_DIR, `slide-${num}.png`);
    const audioPath = path.join(FIXED_DIR, `narration-${num}.m4a`);
    const segmentPath = path.join(FINAL_DIR, `segment-${num}.mp4`);

    const audioDur = durations[i - 1];
    const totalDuration = audioDur + PAUSE_AFTER[i - 1];

    execSync(
      `ffmpeg -y -loop 1 -i "${slidePath}" -i "${audioPath}" ` +
        `-c:v libx264 -tune stillimage -c:a aac -b:a 192k ` +
        `-pix_fmt yuv420p -t ${totalDuration.toFixed(2)} ` +
        `-vf "scale=1920:1080:force_original_aspect_ratio=decrease,pad=1920:1080:(ow-iw)/2:(oh-ih)/2:color=0f0f14,fps=30" ` +
        `"${segmentPath}" 2>/dev/null`,
      { timeout: 60000 }
    );

    segmentPaths.push(segmentPath);
    console.log(`  Segment ${i} (${totalDuration.toFixed(1)}s)`);
  }

  // Create concat file
  const concatFilePath = path.join(FINAL_DIR, 'concat.txt');
  const concatContent = segmentPaths.map((p) => `file '${p}'`).join('\n');
  await fs.writeFile(concatFilePath, concatContent);

  // Concatenate all segments
  const outputPath = path.join(OUTPUT_DIR, 'lesson-01-video-01.mp4');
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${concatFilePath}" ` +
      `-c:v libx264 -crf 20 -preset medium -c:a aac -b:a 192k ` +
      `"${outputPath}" 2>/dev/null`,
    { timeout: 300000 }
  );

  const info = execSync(
    `ffprobe -v error -show_entries format=duration -of csv=p=0 "${outputPath}" 2>/dev/null`
  )
    .toString()
    .trim();

  console.log(`\n Video generated successfully!`);
  console.log(`Output: ${outputPath}`);
  console.log(`Duration: ${(parseFloat(info) / 60).toFixed(1)} minutes`);
  console.log(`Resolution: 1920x1080`);

  // Clean up segments
  for (const segPath of segmentPaths) {
    await fs.unlink(segPath).catch(() => {});
  }
  await fs.unlink(concatFilePath).catch(() => {});
  console.log('Cleaned up temporary segments');
}

async function main() {
  console.log('Fixing silence gaps in ElevenLabs audio\n');
  console.log('='.repeat(50));
  console.log(`  Silence threshold: ${SILENCE_THRESHOLD}`);
  console.log(`  Min silence to fix: > ${MIN_SILENCE_DETECT}s`);
  console.log(`  Target pause: ${TARGET_PAUSE}s`);
  console.log('='.repeat(50) + '\n');

  await ensureDirs();

  let totalRemoved = 0;
  const fixedDurations = [];

  for (let i = 1; i <= 17; i++) {
    const num = String(i).padStart(2, '0');
    const inputPath = path.join(AUDIO_DIR, `narration-${num}.m4a`);
    const outputPath = path.join(FIXED_DIR, `narration-${num}.m4a`);

    process.stdout.write(`  Slide ${String(i).padStart(2)}: `);

    const result = await fixAudioFile(inputPath, outputPath, i);
    fixedDurations.push(result.fixed);
    totalRemoved += result.removed;

    if (result.removed > 0.1) {
      console.log(
        `${result.original.toFixed(1)}s -> ${result.fixed.toFixed(1)}s (removed ${result.removed.toFixed(1)}s of silence)`
      );
    } else {
      console.log(`${result.original.toFixed(1)}s (no change needed)`);
    }
  }

  console.log(`\nTotal silence removed: ${totalRemoved.toFixed(1)}s`);

  await compositeVideo(fixedDurations);

  // Cleanup temp dir
  await fs.rm(TEMP_DIR, { recursive: true, force: true }).catch(() => {});

  console.log('\n' + '='.repeat(50));
  console.log('Done! Video recomposited with cleaned audio.\n');
}

main().catch((err) => {
  console.error('Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
