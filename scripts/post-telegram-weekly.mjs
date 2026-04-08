import { readFileSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const WEEKLY_DIR = join(ROOT, 'content', 'weekly');
const SITE_URL = 'https://02ship.com';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
if (!BOT_TOKEN || !CHAT_ID) {
  console.error('TELEGRAM_BOT_TOKEN and TELEGRAM_CHAT_ID are required');
  process.exit(0);
}

const SECTION_EMOJI = {
  'product-updates': '\u{1F4E6}',
  'developer-tools': '\u{1F6E0}\u{FE0F}',
  'community-learning': '\u{1F91D}',
  'research-safety': '\u{1F6E1}\u{FE0F}',
  'whats-coming': '\u{1F52E}',
};

const IMPACT_DOT = {
  high: '\u{1F534}',
  medium: '\u{1F535}',
  low: '\u26AA',
};

function getWeek() {
  const arg = process.argv[2];
  if (arg && /^\d{4}-\d{2}-\d{2}$/.test(arg)) return arg;
  // Also accept legacy YYYY-WXX format
  if (arg && /^\d{4}-W\d{2}$/.test(arg)) return arg;
  const files = readdirSync(WEEKLY_DIR)
    .filter((f) => f.endsWith('.json'))
    .sort();
  if (!files.length) return null;
  return files[files.length - 1].replace('.json', '');
}

function formatDateRange(startDate, endDate) {
  const fmt = (d) =>
    new Date(d + 'T12:00:00Z').toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      timeZone: 'UTC',
    });
  return `${fmt(startDate)} – ${fmt(endDate)}`;
}

function escapeHtml(text) {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function buildMessage(digest) {
  const dateRange = formatDateRange(digest.startDate, digest.endDate);
  let msg = `\u{1F4CB} <b>Anthropic &amp; Claude Weekly — ${escapeHtml(dateRange)}</b>\n\n`;

  if (digest.summary) {
    msg += `${escapeHtml(digest.summary)}\n\n`;
  }

  for (const section of digest.sections) {
    if (!section.items?.length) continue;
    const emoji = SECTION_EMOJI[section.id] || '\u{1F4CC}';
    msg += `${emoji} <b>${escapeHtml(section.title)}</b>\n`;
    for (const item of section.items) {
      const dot = IMPACT_DOT[item.impact] || '';
      msg += `${dot} <a href="${item.url}">${escapeHtml(item.title)}</a>\n`;
      msg += `   ${escapeHtml(item.summary)}\n`;
    }
    msg += '\n';
  }

  msg += `<a href="${SITE_URL}/blog/weekly-anthropic-claude-updates">Read full digest \u{2192}</a>`;
  return msg;
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
  const week = getWeek();
  if (!week) {
    console.error('No weekly digest files found');
    process.exit(0);
  }

  const filePath = join(WEEKLY_DIR, `${week}.json`);

  let digest;
  try {
    digest = JSON.parse(readFileSync(filePath, 'utf-8'));
  } catch {
    console.error(`No weekly digest found for ${week}`);
    process.exit(0);
  }

  const message = buildMessage(digest);
  const ok = await sendTelegram(message);
  if (ok) {
    console.log(`Posted weekly digest ${week} to Telegram`);
  }
}

main().catch((e) => {
  console.error('Failed to post to Telegram:', e.message);
  process.exit(0);
});
