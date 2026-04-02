import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const NEWS_DIR = join(ROOT, 'content', 'news');
const SITE_URL = 'https://02ship.com';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
if (!BOT_TOKEN || !CHAT_ID) {
  console.error('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required');
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

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildMessage(news) {
  const top5 = news.items
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  const lines = top5
    .map((item) => {
      const emoji = CATEGORY_EMOJI[item.category] || '';
      return `<b>${item.score}/10</b> ${emoji} <a href="${item.url}">${escapeHtml(item.title)}</a>\n${escapeHtml(item.summary)}`;
    })
    .join('\n\n');

  return (
    `\u{1F5DE}\u{FE0F} <b>AI News — ${escapeHtml(formatDate(news.date))}</b>\n\n` +
    lines +
    `\n\n<a href="${SITE_URL}/news/${news.date}">See all ${news.items.length} stories \u{2192}</a>`
  );
}

async function sendTelegram(text) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHAT_ID,
      text,
      parse_mode: 'HTML',
      disable_web_page_preview: true,
    }),
  });

  if (res.ok) {
    return true;
  }
  const body = await res.text();
  console.error(`Telegram API failed (${res.status}): ${body}`);
  return false;
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

  const message = buildMessage(news);
  const ok = await sendTelegram(message);
  if (ok) {
    console.log(`Posted top 5 news for ${date} to Telegram`);
  }
}

main().catch((e) => {
  console.error('Failed to post to Telegram:', e.message);
  process.exit(0);
});
