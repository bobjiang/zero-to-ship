import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const NEWS_DIR = join(ROOT, 'content', 'news');
const SITE_URL = 'https://02ship.com';

const WEBHOOK_URL = process.env.DISCORD_WEBHOOK_URL;
if (!WEBHOOK_URL) {
  console.error('DISCORD_WEBHOOK_URL is required');
  process.exit(0);
}

const CATEGORY_EMOJI = {
  research: '\u{1F52C}',
  product: '\u{1F4E6}',
  'open-source': '\u{1F331}',
  industry: '\u{1F3ED}',
};

function getDate() {
  const arg = process.argv[2];
  if (arg && /^\d{4}-\d{2}-\d{2}$/.test(arg)) return arg;
  return new Date().toISOString().split('T')[0];
}

function formatDate(dateStr) {
  const date = new Date(dateStr + 'T12:00:00Z');
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  });
}

function buildEmbed(news) {
  const top5 = news.items
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const description = top5
    .map((item) => {
      const emoji = CATEGORY_EMOJI[item.category] || '';
      return `**${item.score}/10** ${emoji} [${item.title}](${item.url})\n${item.summary}`;
    })
    .join('\n\n');

  return {
    embeds: [
      {
        title: `\u{1F5DE}\u{FE0F} AI News — ${formatDate(news.date)}`,
        description,
        color: 0x6366f1,
        footer: {
          text: `See all ${news.items.length} stories`,
        },
        url: `${SITE_URL}/news/${news.date}`,
      },
    ],
  };
}

async function main() {
  const date = getDate();
  const filePath = join(NEWS_DIR, `${date}.json`);

  let news;
  try {
    news = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch {
    console.error(`No news file found for ${date}`);
    process.exit(0);
  }

  if (!news.items?.length) {
    console.error(`No items in news for ${date}`);
    process.exit(0);
  }

  const payload = buildEmbed(news);

  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (res.ok) {
    console.log(`Posted top 5 news for ${date} to Discord`);
  } else {
    const text = await res.text();
    console.error(`Discord webhook failed (${res.status}): ${text}`);
  }
}

main().catch((e) => {
  console.error('Failed to post to Discord:', e.message);
  process.exit(0);
});
