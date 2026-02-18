import { execSync } from 'child_process';
import { promises as fs } from 'fs';
import path from 'path';
import { readFileSync } from 'fs';
import { chromium } from 'playwright';

// Parse --config argument
const configArgIdx = process.argv.indexOf('--config');
if (configArgIdx === -1 || !process.argv[configArgIdx + 1]) {
  console.error('Usage: node generate-lesson-video.mjs --config <path>');
  process.exit(1);
}
const configPath = path.resolve(process.argv[configArgIdx + 1]);
const config = JSON.parse(readFileSync(configPath, 'utf8'));

const { lesson, video, slidesHtml, slidesCount, outputDir, outputFile, narrations } = config;

// Convention: config files live at <course>/video-gen/configs/<file>.json
// VIDEO_GEN_DIR resolves to <course>/video-gen/ (grandparent of config)
// All paths in the config (slidesHtml, outputDir) are relative to VIDEO_GEN_DIR
const VIDEO_GEN_DIR = path.dirname(path.dirname(configPath));
const OUTPUT_DIR = path.resolve(VIDEO_GEN_DIR, outputDir);
const AUDIO_DIR = path.join(OUTPUT_DIR, 'audio');
const FIXED_DIR = path.join(AUDIO_DIR, 'fixed');
const SLIDES_DIR = path.join(OUTPUT_DIR, 'slides');
const TEMP_DIR = path.join(OUTPUT_DIR, 'temp_build');
const SLIDES_HTML = path.resolve(VIDEO_GEN_DIR, slidesHtml);

// Parse --skip-* flags
const SKIP_SLIDES = process.argv.includes('--skip-slides');
const SKIP_AUDIO = process.argv.includes('--skip-audio');
const SKIP_SILENCE_FIX = process.argv.includes('--skip-silence-fix');

// Load Google Cloud TTS API key - search upward for .env.local
function findEnvFile(startDir) {
  let dir = startDir;
  while (dir !== path.dirname(dir)) {
    const envPath = path.join(dir, '.env.local');
    try { readFileSync(envPath, 'utf8'); return envPath; } catch {}
    dir = path.dirname(dir);
  }
  return null;
}
const envPath = findEnvFile(path.dirname(configPath));
if (!envPath) {
  console.error('.env.local not found in any parent directory');
  process.exit(1);
}
const envContent = readFileSync(envPath, 'utf8');
const apiKeyMatch = envContent.match(/GOOGLE_TTS_API_KEY=(.+)/);
if (!apiKeyMatch) {
  console.error('GOOGLE_TTS_API_KEY not found in .env.local');
  process.exit(1);
}
const API_KEY = apiKeyMatch[1].trim();

const VOICE_NAME = 'Achird';
const MODEL_NAME = 'gemini-2.5-flash-preview-tts';
const VOICE_PROMPT = 'Read aloud, clearly in a warm, enthusiasm tone. No AI tastes, but more like real human voice.';

// Silence fix settings
const SILENCE_THRESHOLD = '-30dB';
const MIN_SILENCE_DETECT = 0.35;
const TARGET_PAUSE = 0.25;

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getDuration(filePath) {
  return parseFloat(
    execSync(
      `ffprobe -v error -show_entries format=duration -of csv=p=0 "${filePath}"`,
      { encoding: 'utf8', timeout: 10000 }
    ).trim()
  );
}

// --- Step 1: Capture slide screenshots with Playwright ---

async function captureSlides() {
  console.log('\n Step 1: Capturing slide screenshots...\n');

  await fs.mkdir(SLIDES_DIR, { recursive: true });

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.setViewportSize({ width: 1920, height: 1080 });

  await page.goto(`file://${SLIDES_HTML}`, { waitUntil: 'networkidle' });

  // Wait for fonts to load
  await page.waitForTimeout(2000);

  // Inject CSS: scale to 1920x1080, use visibility (not display) to avoid grid/flex conflicts
  await page.addStyleTag({
    content: `
      html { font-size: 26px; }
      body { margin: 0; padding: 0; overflow: hidden; width: 1920px; height: 1080px; background: #0f0f14; }
      .presentation-header, .instructions { display: none !important; }
      .slides-container { max-width: none; margin: 0; padding: 0; gap: 0; position: relative; width: 1920px; height: 1080px; }
      .slide {
        width: 1920px !important;
        height: 1080px !important;
        aspect-ratio: auto !important;
        border-radius: 0 !important;
        border: none !important;
        box-shadow: none !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        visibility: hidden !important;
        opacity: 0 !important;
        padding: 4rem !important;
      }
      .slide.active {
        visibility: visible !important;
        opacity: 1 !important;
      }
      .slide::before {
        font-size: 1.1rem;
        top: 1.5rem;
        right: 2rem;
      }
      .slide-section {
        font-size: 1rem;
        top: 1.5rem;
        left: 2rem;
      }
    `,
  });

  for (let i = 1; i <= slidesCount; i++) {
    await page.evaluate((idx) => {
      document.querySelectorAll('.slide').forEach((s) => s.classList.remove('active'));
      document.querySelectorAll('.slide')[idx - 1].classList.add('active');
    }, i);

    await page.waitForTimeout(200);

    const outputPath = path.join(SLIDES_DIR, `slide-${String(i).padStart(2, '0')}.png`);
    await page.screenshot({ path: outputPath, clip: { x: 0, y: 0, width: 1920, height: 1080 } });
    console.log(`  Slide ${String(i).padStart(2)}: captured`);
  }

  await browser.close();
  console.log(`\n  All ${slidesCount} slides captured at 1920x1080`);
}

// --- Step 2: Generate TTS audio via Google Cloud TTS ---

async function generateGeminiTTSAudio(text, outputPath, maxRetries = 5) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent?key=${API_KEY}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{
              parts: [{
                text: `${VOICE_PROMPT}: ${text}`,
              }],
            }],
            generationConfig: {
              responseModalities: ['AUDIO'],
              speechConfig: {
                voiceConfig: {
                  prebuiltVoiceConfig: {
                    voiceName: VOICE_NAME,
                  },
                },
              },
            },
          }),
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Gemini TTS API error ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      if (!data.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data) {
        throw new Error(`Gemini TTS returned unexpected response: ${JSON.stringify(data).slice(0, 200)}`);
      }
      const audioB64 = data.candidates[0].content.parts[0].inlineData.data;
      const pcmBuffer = Buffer.from(audioB64, 'base64');

      // Write raw PCM, then convert to MP3 via ffmpeg (PCM is s16le, 24kHz, mono)
      const pcmPath = outputPath.replace(/\.\w+$/, '.pcm');
      await fs.writeFile(pcmPath, pcmBuffer);
      execSync(
        `ffmpeg -y -f s16le -ar 24000 -ac 1 -i "${pcmPath}" "${outputPath}" 2>/dev/null`,
        { timeout: 30000 }
      );
      await fs.unlink(pcmPath).catch(() => {});
      return; // success
    } catch (err) {
      if (attempt < maxRetries) {
        const delay = Math.min(5000 * Math.pow(2, attempt - 1), 60000);
        process.stdout.write(`\n    retry ${attempt}/${maxRetries} in ${(delay/1000).toFixed(0)}s (${err.message})... `);
        await sleep(delay);
      } else {
        throw err;
      }
    }
  }
}

async function generateAllAudio() {
  console.log(`\n Step 2: Generating TTS audio via Gemini Pro TTS (${VOICE_NAME})...\n`);

  for (const narration of narrations) {
    const num = String(narration.slide).padStart(2, '0');
    const mp3Path = path.join(AUDIO_DIR, `narration-${num}.mp3`);
    const m4aPath = path.join(AUDIO_DIR, `narration-${num}.m4a`);

    // Resume: skip if m4a already exists and has valid duration
    try {
      await fs.access(m4aPath);
      const existingDur = getDuration(m4aPath);
      if (existingDur > 0.5) {
        console.log(`  Slide ${String(narration.slide).padStart(2)}: cached (${existingDur.toFixed(1)}s)`);
        continue;
      }
    } catch {}

    process.stdout.write(`  Slide ${String(narration.slide).padStart(2)}: generating... `);

    await generateGeminiTTSAudio(narration.text, mp3Path);

    execSync(
      `ffmpeg -y -i "${mp3Path}" -c:a aac -b:a 192k "${m4aPath}" 2>/dev/null`,
      { timeout: 30000 }
    );

    const duration = getDuration(m4aPath);
    console.log(`${duration.toFixed(1)}s`);

    await sleep(500);
  }
}

// --- Step 3: Fix silence gaps in TTS audio ---

function detectSilences(filePath) {
  const output = execSync(
    `ffmpeg -i "${filePath}" -af silencedetect=noise=${SILENCE_THRESHOLD}:d=${MIN_SILENCE_DETECT} -f null - 2>&1`,
    { encoding: 'utf8', timeout: 30000 }
  );

  const silences = [];
  let currentStart = null;
  for (const line of output.split('\n')) {
    const startMatch = line.match(/silence_start:\s*([\d.]+)/);
    const endMatch = line.match(/silence_end:\s*([\d.]+)/);
    if (startMatch) currentStart = parseFloat(startMatch[1]);
    if (endMatch && currentStart !== null) {
      silences.push({ start: currentStart, end: parseFloat(endMatch[1]) });
      currentStart = null;
    }
  }
  return silences;
}

async function fixAudioFile(inputPath, outputPath, slideNum) {
  const silences = detectSilences(inputPath);
  const totalDuration = getDuration(inputPath);

  if (silences.length === 0) {
    execSync(`cp "${inputPath}" "${outputPath}"`);
    return { original: totalDuration, fixed: totalDuration, removed: 0 };
  }

  const segments = [];
  let pos = 0;
  for (const silence of silences) {
    if (silence.start > pos) {
      segments.push({ type: 'voice', start: pos, end: silence.start });
    }
    segments.push({ type: 'pause', duration: TARGET_PAUSE });
    pos = silence.end;
  }
  if (pos < totalDuration) {
    segments.push({ type: 'voice', start: pos, end: totalDuration });
  }

  const tempFiles = [];
  const concatEntries = [];
  let idx = 0;

  for (const seg of segments) {
    const tempFile = path.join(TEMP_DIR, `fix_s${slideNum}_${String(idx).padStart(3, '0')}.wav`);
    if (seg.type === 'voice') {
      const duration = seg.end - seg.start;
      if (duration < 0.01) continue;
      execSync(
        `ffmpeg -y -i "${inputPath}" -ss ${seg.start.toFixed(4)} -t ${duration.toFixed(4)} -c:a pcm_s16le "${tempFile}" 2>/dev/null`,
        { timeout: 15000 }
      );
    } else {
      execSync(
        `ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t ${seg.duration.toFixed(4)} -c:a pcm_s16le "${tempFile}" 2>/dev/null`,
        { timeout: 10000 }
      );
    }
    tempFiles.push(tempFile);
    concatEntries.push(`file '${tempFile}'`);
    idx++;
  }

  const concatFile = path.join(TEMP_DIR, `fix_s${slideNum}_concat.txt`);
  await fs.writeFile(concatFile, concatEntries.join('\n'));

  const tempWav = path.join(TEMP_DIR, `fix_s${slideNum}_joined.wav`);
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${concatFile}" -c:a pcm_s16le "${tempWav}" 2>/dev/null`,
    { timeout: 30000 }
  );
  execSync(
    `ffmpeg -y -i "${tempWav}" -c:a aac -b:a 192k "${outputPath}" 2>/dev/null`,
    { timeout: 30000 }
  );

  const fixedDuration = getDuration(outputPath);

  for (const f of [...tempFiles, concatFile, tempWav]) {
    await fs.unlink(f).catch(() => {});
  }

  return { original: totalDuration, fixed: fixedDuration, removed: totalDuration - fixedDuration };
}

async function fixAllSilence() {
  console.log('\n Step 3: Fixing silence gaps in TTS audio...\n');

  let totalRemoved = 0;

  for (let i = 0; i < narrations.length; i++) {
    const slideNum = narrations[i].slide;
    const num = String(slideNum).padStart(2, '0');
    const inputPath = path.join(AUDIO_DIR, `narration-${num}.m4a`);
    const outputPath = path.join(FIXED_DIR, `narration-${num}.m4a`);

    process.stdout.write(`  Slide ${String(slideNum).padStart(2)}: `);
    const result = await fixAudioFile(inputPath, outputPath, slideNum);
    totalRemoved += result.removed;

    if (result.removed > 0.1) {
      console.log(`${result.original.toFixed(1)}s -> ${result.fixed.toFixed(1)}s (removed ${result.removed.toFixed(1)}s)`);
    } else {
      console.log(`${result.original.toFixed(1)}s (clean)`);
    }
  }

  console.log(`\n  Total silence removed: ${totalRemoved.toFixed(1)}s`);
}

// --- Step 4: Single-pass video compositing ---

async function buildVideo() {
  console.log('\n Step 4: Building video (single-pass approach)...\n');

  // 4a: Join all fixed audio into one continuous WAV
  console.log('  4a: Building continuous audio track...');

  const audioSegments = [];
  const slideTiming = [];
  let currentTime = 0;

  for (let i = 0; i < narrations.length; i++) {
    const slideNum = narrations[i].slide;
    const num = String(slideNum).padStart(2, '0');
    const narrationPath = path.join(FIXED_DIR, `narration-${num}.m4a`);
    const narrationDur = getDuration(narrationPath);
    const pause = narrations[i].pauseAfter || 1.0;
    const totalSlideDur = narrationDur + pause;

    const wavPath = path.join(TEMP_DIR, `part-${num}-voice.wav`);
    execSync(
      `ffmpeg -y -i "${narrationPath}" -ar 44100 -ac 1 -c:a pcm_s16le "${wavPath}" 2>/dev/null`,
      { timeout: 15000 }
    );
    audioSegments.push(wavPath);

    const silPath = path.join(TEMP_DIR, `part-${num}-pause.wav`);
    execSync(
      `ffmpeg -y -f lavfi -i anullsrc=r=44100:cl=mono -t ${pause.toFixed(3)} -c:a pcm_s16le "${silPath}" 2>/dev/null`,
      { timeout: 10000 }
    );
    audioSegments.push(silPath);

    slideTiming.push({ slide: slideNum, startTime: currentTime, duration: totalSlideDur });
    console.log(`      Slide ${String(slideNum).padStart(2)}: ${currentTime.toFixed(1)}s, ${totalSlideDur.toFixed(1)}s (${narrationDur.toFixed(1)}s + ${pause}s pause)`);
    currentTime += totalSlideDur;
  }

  const concatListPath = path.join(TEMP_DIR, 'audio_concat.txt');
  await fs.writeFile(concatListPath, audioSegments.map((p) => `file '${p}'`).join('\n'));

  const fullAudioWav = path.join(TEMP_DIR, 'full_audio.wav');
  execSync(
    `ffmpeg -y -f concat -safe 0 -i "${concatListPath}" -c:a pcm_s16le "${fullAudioWav}" 2>/dev/null`,
    { timeout: 60000 }
  );

  const totalAudioDur = getDuration(fullAudioWav);
  console.log(`\n      Total audio: ${(totalAudioDur / 60).toFixed(1)} min (${totalAudioDur.toFixed(1)}s)`);

  // 4b: Build slideshow video using MPEG-TS intermediate (no edit lists)
  console.log('\n  4b: Building slideshow video track (MPEG-TS)...');

  const imageSegments = [];
  for (const timing of slideTiming) {
    const num = String(timing.slide).padStart(2, '0');
    const slidePath = path.join(SLIDES_DIR, `slide-${num}.png`);
    const segPath = path.join(TEMP_DIR, `img-${num}.ts`);

    execSync(
      `ffmpeg -y -loop 1 -i "${slidePath}" -t ${timing.duration.toFixed(4)} ` +
        `-vf "scale=1920:1080,fps=30" ` +
        `-c:v libx264 -preset ultrafast -tune stillimage -pix_fmt yuv420p ` +
        `-f mpegts "${segPath}" 2>/dev/null`,
      { timeout: 30000 }
    );
    imageSegments.push(segPath);
  }

  const fullVideoTs = path.join(TEMP_DIR, 'full_video.ts');
  const concatInput = imageSegments.join('|');
  execSync(
    `ffmpeg -y -i "concat:${concatInput}" -c:v copy "${fullVideoTs}" 2>/dev/null`,
    { timeout: 120000 }
  );

  // 4c: Single mux pass with +faststart
  console.log('\n  4c: Final mux (video + audio)...');

  const outputPath = path.join(OUTPUT_DIR, outputFile);
  execSync(
    `ffmpeg -y -i "${fullVideoTs}" -i "${fullAudioWav}" ` +
      `-c:v libx264 -crf 20 -preset medium -tune stillimage -pix_fmt yuv420p ` +
      `-c:a aac -b:a 192k -ar 44100 -ac 1 ` +
      `-shortest -movflags +faststart ` +
      `"${outputPath}" 2>/dev/null`,
    { timeout: 300000 }
  );

  // 4d: Verify
  console.log('\n  4d: Verifying output...');

  const vDur = execSync(
    `ffprobe -v error -select_streams v:0 -show_entries stream=duration -of csv=p=0 "${outputPath}"`,
    { encoding: 'utf8' }
  ).trim();
  const aDur = execSync(
    `ffprobe -v error -select_streams a:0 -show_entries stream=duration -of csv=p=0 "${outputPath}"`,
    { encoding: 'utf8' }
  ).trim();
  const drift = Math.abs(parseFloat(vDur) - parseFloat(aDur));

  const gapCheck = execSync(
    `ffprobe -v error -select_streams a:0 -show_entries packet=pts_time -of csv=p=0 "${outputPath}" 2>/dev/null | awk -F',' '{ pts=$1+0; if(NR>1 && pts-prev>0.05) count++; prev=pts } END { print count+0 }'`,
    { encoding: 'utf8', timeout: 30000 }
  ).trim();

  console.log(`      Video: ${parseFloat(vDur).toFixed(2)}s`);
  console.log(`      Audio: ${parseFloat(aDur).toFixed(2)}s`);
  console.log(`      A/V drift: ${drift.toFixed(3)}s ${drift < 0.1 ? '(OK)' : '(WARNING)'}`);
  console.log(`      Audio PTS gaps > 50ms: ${gapCheck}`);
  console.log(`\n  Output: ${outputPath}`);
  console.log(`  Duration: ${(parseFloat(vDur) / 60).toFixed(1)} minutes`);
}

// --- Main ---

async function main() {
  const label = `Lesson ${String(lesson).padStart(2, '0')} Video ${String(video).padStart(2, '0')}`;
  console.log(`Generating ${label}`);
  console.log(`Voice: ${VOICE_NAME}`);
  console.log(`Slides: ${path.basename(SLIDES_HTML)} (${slidesCount} slides)`);
  console.log(`Config: ${path.basename(configPath)}`);
  console.log(`Video-gen dir: ${VIDEO_GEN_DIR}`);
  console.log('='.repeat(50));

  await fs.mkdir(AUDIO_DIR, { recursive: true });
  await fs.mkdir(FIXED_DIR, { recursive: true });
  await fs.mkdir(SLIDES_DIR, { recursive: true });
  await fs.mkdir(TEMP_DIR, { recursive: true });

  if (!SKIP_SLIDES) {
    await captureSlides();
  } else {
    console.log('\n Step 1: SKIPPED (--skip-slides)');
  }

  if (!SKIP_AUDIO) {
    await generateAllAudio();
  } else {
    console.log('\n Step 2: SKIPPED (--skip-audio)');
  }

  if (!SKIP_SILENCE_FIX) {
    await fixAllSilence();
  } else {
    console.log('\n Step 3: SKIPPED (--skip-silence-fix)');
  }

  await buildVideo();

  // Cleanup temp
  await fs.rm(TEMP_DIR, { recursive: true, force: true }).catch(() => {});

  console.log('\n' + '='.repeat(50));
  console.log('Done!\n');
}

main().catch((err) => {
  console.error('Error:', err.message);
  console.error(err.stack);
  process.exit(1);
});
