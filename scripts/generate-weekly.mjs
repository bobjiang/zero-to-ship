import { writeFileSync, readFileSync, existsSync, mkdirSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { XMLParser } from 'fast-xml-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const WEEKLY_DIR = join(ROOT, 'content', 'weekly');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is required');
  process.exit(1);
}

// --- Date helpers ---

function formatDate(date) {
  return date.toISOString().split('T')[0];
}

function getLast7DaysRange() {
  const end = new Date();
  const start = new Date();
  start.setDate(end.getDate() - 7);
  return {
    start: formatDate(start),
    end: formatDate(end),
    startDate: start,
    endDate: end,
  };
}

// --- Source fetchers ---

function parseRssItems(xml, source, limit = 20) {
  const parser = new XMLParser();
  const parsed = parser.parse(xml);
  const channel = parsed?.rss?.channel || parsed?.feed || {};
  const entries = channel?.item || channel?.entry || [];
  const list = Array.isArray(entries) ? entries : [entries];
  return list.slice(0, limit).map(entry => {
    const pubDate = entry.pubDate || entry.published || entry.updated || '';
    return {
      title: (entry.title || '').replace(/\n/g, ' ').trim(),
      url: entry.link?.href || entry.link || entry.guid || '',
      source,
      pubDate,
    };
  }).filter(item => item.title && item.url);
}

async function fetchAnthropicNews() {
  try {
    const res = await fetch('https://www.anthropic.com/rss.xml', {
      headers: { 'User-Agent': '02ship-weekly-bot/1.0' },
    });
    const xml = await res.text();
    return parseRssItems(xml, 'Anthropic', 20);
  } catch (e) {
    console.warn('Anthropic RSS failed:', e.message);
    return [];
  }
}

async function fetchClaudeDotCom() {
  try {
    const res = await fetch('https://claude.com/', {
      headers: { 'User-Agent': '02ship-weekly-bot/1.0' },
    });
    const html = await res.text();

    const items = [];
    // Extract links with titles from the page
    const linkRegex = /<a[^>]+href="([^"]*)"[^>]*>([^<]+)<\/a>/gi;
    let match;
    while ((match = linkRegex.exec(html)) !== null) {
      const [, href, text] = match;
      const title = text.trim();
      if (!title || title.length < 10 || title.length > 200) continue;
      // Skip navigation/footer links
      if (/^(sign|log|privacy|terms|cookie|about|home|menu)/i.test(title)) continue;

      let url = href;
      if (url.startsWith('/')) url = `https://claude.com${url}`;
      if (!url.startsWith('http')) continue;

      items.push({ title, url, source: 'Claude.com', pubDate: '' });
    }

    return items;
  } catch (e) {
    console.warn('Claude.com fetch failed:', e.message);
    return [];
  }
}

// --- Deduplication ---

function deduplicateByUrl(items) {
  const seen = new Set();
  return items.filter(item => {
    if (!item.url || seen.has(item.url)) return false;
    seen.add(item.url);
    return true;
  });
}

function filterToDateRange(items, startDate) {
  return items.filter(item => {
    if (!item.pubDate) return true; // keep items without dates
    try {
      const d = new Date(item.pubDate);
      return d >= startDate;
    } catch {
      return true;
    }
  });
}

function loadPreviousDigestUrls(currentFileId) {
  const urls = new Set();
  if (!existsSync(WEEKLY_DIR)) return urls;

  const files = readdirSync(WEEKLY_DIR).filter(f => f.endsWith('.json')).sort().reverse();
  for (const file of files.slice(0, 4)) {
    const fileId = file.replace('.json', '');
    if (fileId >= currentFileId) continue;
    try {
      const data = JSON.parse(readFileSync(join(WEEKLY_DIR, file), 'utf-8'));
      for (const section of data.sections || []) {
        for (const item of section.items || []) {
          if (item.url) urls.add(item.url);
        }
      }
    } catch {
      // skip corrupted files
    }
  }
  return urls;
}

// --- Gemini ---

async function curateWithGemini(items, weekStart, weekEnd, retries = 2) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const itemsJson = JSON.stringify(items.map(({ title, url, source, pubDate }) => ({ title, url, source, pubDate })));

  const prompt = `You are a weekly AI news curator for a site that helps non-programmers build with Claude/AI tools. Today is ${new Date().toISOString().split('T')[0]}. You are creating the weekly digest for ${weekStart} to ${weekEnd}.

Given the following items collected from Anthropic, Claude, and their official social accounts this week, organize them into the weekly digest.

SECTIONS (include a section ONLY if there are relevant items for it):

1. "product-updates" / "Product Updates and News" — Model releases, Claude.ai features, integrations, pricing changes
2. "developer-tools" / "Developer Tools and Tips and Tricks" — API changes, Claude Code, MCP, SDKs, practical how-tos
3. "community-learning" / "Community & Learning" — Anthropic Academy, tutorials, case studies, community projects
4. "research-safety" / "Research & Safety" — Plain-language summaries of safety research, policy changes, constitutional updates
5. "whats-coming" / "What's Coming" — Betas, previews, upcoming features

For each item:
- Write a concise 1-2 sentence summary focused on "what this means for builders using Claude"
- Assign impact: "high" (major announcements), "medium" (notable updates), "low" (informational)
- Add 1-3 relevant tags (e.g., "model-release", "pricing", "claude-code", "mcp", "safety", "api", "prompt-engineering")

Also write a one-line editorial summary for the whole week (the "summary" field).

Return ONLY valid JSON (no markdown fences) with this exact structure:
{
  "summary": "One-line editorial hook for the week",
  "sections": [
    {
      "id": "product-updates",
      "title": "Product Updates and News",
      "items": [
        {
          "title": "Item title",
          "summary": "What it means for builders.",
          "url": "original url",
          "impact": "high",
          "tags": ["model-release"]
        }
      ]
    }
  ]
}

If there are no items for a section, omit it entirely. If there are very few items overall, that's OK — quality over quantity.

Here are this week's items:
${itemsJson}`;

  for (let attempt = 0; attempt <= retries; attempt++) {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: {
          temperature: 0.3,
          maxOutputTokens: 16384,
          responseMimeType: 'application/json',
          thinkingConfig: { thinkingBudget: 2048 },
        },
      }),
    });

    const data = await res.json();

    if (data.error) {
      console.error('Gemini API error:', JSON.stringify(data.error, null, 2));
      if (attempt < retries) {
        console.log(`Retrying (${attempt + 1}/${retries})...`);
        await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
        continue;
      }
      process.exit(1);
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
    const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

    try {
      return JSON.parse(cleaned);
    } catch (e) {
      console.error(`Failed to parse Gemini response (attempt ${attempt + 1}):`, e.message);
      if (attempt < retries) {
        console.log(`Retrying (${attempt + 1}/${retries})...`);
        await new Promise(r => setTimeout(r, 2000 * (attempt + 1)));
        continue;
      }
      console.error('Raw response:', text.slice(0, 500));
      process.exit(1);
    }
  }
}

// --- Main ---

async function main() {
  const { start, end, startDate } = getLast7DaysRange();
  const fileId = end; // e.g. "2026-04-08"

  console.log(`Generating weekly Anthropic & Claude digest for ${start} to ${end}...`);

  // Check if this week already exists
  const outputPath = join(WEEKLY_DIR, `${fileId}.json`);
  if (existsSync(outputPath)) {
    console.log(`${fileId}.json already exists. Skipping.`);
    process.exit(0);
  }

  console.log('Fetching sources...');
  const sources = [
    { name: 'Anthropic News', fn: () => fetchAnthropicNews() },
    { name: 'Claude.com', fn: () => fetchClaudeDotCom() },
  ];

  const results = await Promise.all(
    sources.map(({ name, fn }) =>
      fn().catch(e => { console.warn(`${name} failed:`, e.message); return []; })
    )
  );

  const summary = sources.map(({ name }, i) => `${name}=${results[i].length}`).join(', ');
  console.log(`Fetched: ${summary}`);

  let allItems = deduplicateByUrl(results.flat());
  console.log(`Total unique items: ${allItems.length}`);

  allItems = filterToDateRange(allItems, startDate);
  console.log(`Items from last 7 days: ${allItems.length}`);

  // Remove items from previous digests
  const previousUrls = loadPreviousDigestUrls(fileId);
  console.log(`Loaded ${previousUrls.size} URLs from previous digests`);
  allItems = allItems.filter(item => !previousUrls.has(item.url));
  console.log(`Items after cross-digest dedup: ${allItems.length}`);

  if (allItems.length === 0) {
    console.log('No new Anthropic/Claude items found this week. Creating minimal digest.');
    const output = {
      week: fileId,
      startDate: start,
      endDate: end,
      summary: 'A quiet week from Anthropic and Claude',
      sections: [],
    };
    mkdirSync(WEEKLY_DIR, { recursive: true });
    writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');
    console.log(`Written to ${outputPath}`);
    return;
  }

  console.log('Curating with Gemini...');
  const curated = await curateWithGemini(allItems, start, end);

  const output = {
    week: fileId,
    startDate: start,
    endDate: end,
    summary: curated.summary || '',
    sections: curated.sections || [],
  };

  mkdirSync(WEEKLY_DIR, { recursive: true });
  writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');
  console.log(`Written to ${outputPath}`);

  const totalItems = output.sections.reduce((sum, s) => sum + s.items.length, 0);
  console.log(`Generated digest with ${totalItems} items across ${output.sections.length} sections`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
