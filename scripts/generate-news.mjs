import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import { XMLParser } from 'fast-xml-parser';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const NEWS_DIR = join(ROOT, 'content', 'news');

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
if (!GEMINI_API_KEY) {
  console.error('GEMINI_API_KEY is required');
  process.exit(1);
}

// --- Source fetchers ---

async function fetchHackerNews() {
  const url = 'https://hn.algolia.com/api/v1/search?query=AI+OR+LLM+OR+GPT+OR+Claude+OR+Anthropic&tags=story&numericFilters=points%3E50&hitsPerPage=30';
  const res = await fetch(url);
  const data = await res.json();
  return data.hits.map(hit => ({
    title: hit.title,
    url: hit.url || `https://news.ycombinator.com/item?id=${hit.objectID}`,
    source: 'Hacker News',
    rawScore: hit.points,
  }));
}

async function fetchReddit() {
  const url = 'https://www.reddit.com/r/MachineLearning+LocalLLaMA/top.json?t=day&limit=30';
  const res = await fetch(url, {
    headers: { 'User-Agent': '02ship-news-bot/1.0' },
  });
  const data = await res.json();
  return (data?.data?.children || []).map(child => ({
    title: child.data.title,
    url: child.data.url,
    source: 'Reddit',
    rawScore: child.data.score,
  }));
}

async function fetchArxiv() {
  const parser = new XMLParser();
  const categories = ['cs.AI', 'cs.CL', 'cs.LG'];
  const items = [];

  for (const cat of categories) {
    try {
      const res = await fetch(`https://rss.arxiv.org/rss/${cat}`);
      const xml = await res.text();
      const parsed = parser.parse(xml);
      const entries = parsed?.rdf?.item || parsed?.rss?.channel?.item || [];
      const list = Array.isArray(entries) ? entries : [entries];
      for (const entry of list.slice(0, 10)) {
        items.push({
          title: entry.title?.replace(/\n/g, ' ').trim() || '',
          url: entry.link || '',
          source: 'arXiv',
          rawScore: 0,
        });
      }
    } catch (e) {
      console.warn(`Failed to fetch arXiv ${cat}:`, e.message);
    }
  }

  return items;
}

async function fetchHuggingFace() {
  const res = await fetch('https://huggingface.co/api/daily_papers?limit=50');
  const data = await res.json();
  return data.map(paper => ({
    title: paper.title || paper.paper?.title || '',
    url: `https://huggingface.co/papers/${paper.paper?.id || paper.id || ''}`,
    source: 'Hugging Face',
    rawScore: paper.paper?.upvotes || paper.upvotes || 0,
  }));
}

// --- Tier 2 & 3 fetchers ---

function parseRssItems(xml, source, limit = 15) {
  const parser = new XMLParser();
  const parsed = parser.parse(xml);
  const channel = parsed?.rss?.channel || parsed?.feed || {};
  const entries = channel?.item || channel?.entry || [];
  const list = Array.isArray(entries) ? entries : [entries];
  return list.slice(0, limit).map(entry => ({
    title: (entry.title || '').replace(/\n/g, ' ').trim(),
    url: entry.link?.href || entry.link || entry.guid || '',
    source,
    rawScore: 0,
  })).filter(item => item.title && item.url);
}

async function fetchProductHunt() {
  const res = await fetch('https://www.producthunt.com/feed', {
    headers: { 'User-Agent': '02ship-news-bot/1.0' },
  });
  const xml = await res.text();
  return parseRssItems(xml, 'Product Hunt', 20);
}

async function fetchLobsters() {
  const res = await fetch('https://lobste.rs/t/ai.rss');
  const xml = await res.text();
  return parseRssItems(xml, 'Lobste.rs', 15);
}

async function fetchDevTo() {
  const res = await fetch('https://dev.to/api/articles?tag=ai&top=1&per_page=20', {
    headers: { 'User-Agent': '02ship-news-bot/1.0' },
  });
  const data = await res.json();
  return (Array.isArray(data) ? data : []).map(article => ({
    title: article.title || '',
    url: article.url || '',
    source: 'Dev.to',
    rawScore: article.public_reactions_count || 0,
  }));
}

async function fetchTechCrunch() {
  const res = await fetch('https://techcrunch.com/category/artificial-intelligence/feed/', {
    headers: { 'User-Agent': '02ship-news-bot/1.0' },
  });
  const xml = await res.text();
  return parseRssItems(xml, 'TechCrunch', 15);
}

async function fetchTheVerge() {
  const res = await fetch('https://www.theverge.com/rss/tech/index.xml', {
    headers: { 'User-Agent': '02ship-news-bot/1.0' },
  });
  const xml = await res.text();
  return parseRssItems(xml, 'The Verge', 15);
}

async function fetchVentureBeat() {
  const res = await fetch('https://venturebeat.com/category/ai/feed/', {
    headers: { 'User-Agent': '02ship-news-bot/1.0' },
  });
  const xml = await res.text();
  return parseRssItems(xml, 'VentureBeat', 15);
}

async function fetchGoogleAI() {
  const res = await fetch('https://blog.google/technology/ai/rss/', {
    headers: { 'User-Agent': '02ship-news-bot/1.0' },
  });
  const xml = await res.text();
  return parseRssItems(xml, 'Google AI Blog', 10);
}

async function fetchOpenAI() {
  const res = await fetch('https://openai.com/blog/rss.xml', {
    headers: { 'User-Agent': '02ship-news-bot/1.0' },
  });
  const xml = await res.text();
  return parseRssItems(xml, 'OpenAI Blog', 10);
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

// --- Gemini ---

async function rankWithGemini(items) {
  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`;

  const prompt = `You are an AI news curator. Given the following list of AI-related news items collected today from various sources, select the top 15 most impactful and interesting stories. For each selected item:

1. Write a concise one-sentence summary
2. Assign an impact score from 1-10 (10 = most impactful)
3. Categorize as one of: "research", "product", "open-source", "industry"

Consider: raw engagement scores, novelty, breadth of impact, and source credibility.

Return ONLY a JSON array (no markdown fences, no explanation) with this exact structure:
[
  {
    "title": "Original or improved title",
    "summary": "One sentence summary.",
    "source": "Original source name",
    "url": "original url",
    "score": 9,
    "category": "research"
  }
]

Here are today's items:
${JSON.stringify(items, null, 2)}`;

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 8192,
      },
    }),
  });

  const data = await res.json();

  if (data.error) {
    console.error('Gemini API error:', JSON.stringify(data.error, null, 2));
    process.exit(1);
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text || '';

  // Strip markdown fences if present
  const cleaned = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

  try {
    return JSON.parse(cleaned);
  } catch (e) {
    console.error('Failed to parse Gemini response:', e.message);
    console.error('Raw response:', text);
    process.exit(1);
  }
}

// --- Main ---

async function main() {
  const today = new Date().toISOString().split('T')[0];
  console.log(`Generating AI news for ${today}...`);

  console.log('Fetching sources...');
  const sources = [
    { name: 'HN', fn: fetchHackerNews },
    { name: 'Reddit', fn: fetchReddit },
    { name: 'arXiv', fn: fetchArxiv },
    { name: 'HF', fn: fetchHuggingFace },
    { name: 'ProductHunt', fn: fetchProductHunt },
    { name: 'Lobsters', fn: fetchLobsters },
    { name: 'DevTo', fn: fetchDevTo },
    { name: 'TechCrunch', fn: fetchTechCrunch },
    { name: 'TheVerge', fn: fetchTheVerge },
    { name: 'VentureBeat', fn: fetchVentureBeat },
    { name: 'GoogleAI', fn: fetchGoogleAI },
    { name: 'OpenAI', fn: fetchOpenAI },
  ];

  const results = await Promise.all(
    sources.map(({ name, fn }) =>
      fn().catch(e => { console.warn(`${name} failed:`, e.message); return []; })
    )
  );

  const summary = sources.map(({ name }, i) => `${name}=${results[i].length}`).join(', ');
  console.log(`Fetched: ${summary}`);

  const allItems = deduplicateByUrl(results.flat());
  console.log(`Total unique items: ${allItems.length}`);

  if (allItems.length === 0) {
    console.error('No items fetched from any source. Aborting.');
    process.exit(1);
  }

  console.log('Ranking with Gemini...');
  const ranked = await rankWithGemini(allItems);
  console.log(`Gemini returned ${ranked.length} items`);

  const output = {
    date: today,
    items: ranked.sort((a, b) => b.score - a.score),
  };

  mkdirSync(NEWS_DIR, { recursive: true });
  const outputPath = join(NEWS_DIR, `${today}.json`);
  writeFileSync(outputPath, JSON.stringify(output, null, 2) + '\n');
  console.log(`Written to ${outputPath}`);
}

main().catch(e => {
  console.error('Fatal error:', e);
  process.exit(1);
});
