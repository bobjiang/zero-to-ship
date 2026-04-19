'use client';

interface Row {
  rank: number;
  title: string;
  speakerName: string;
  handle?: string;
  contact?: string;
  tag?: string;
  status: string;
  voteCount: number;
}

function csvEscape(v: string): string {
  if (/[",\n]/.test(v)) return `"${v.replace(/"/g, '""')}"`;
  return v;
}

export function ResultsExport({ rows, filename }: { rows: Row[]; filename: string }) {
  function download() {
    const header = ['rank', 'title', 'speaker', 'handle', 'contact', 'tag', 'status', 'voteCount'];
    const lines = [header.join(',')];
    for (const r of rows) {
      lines.push(
        [
          String(r.rank),
          csvEscape(r.title),
          csvEscape(r.speakerName),
          csvEscape(r.handle ?? ''),
          csvEscape(r.contact ?? ''),
          csvEscape(r.tag ?? ''),
          r.status,
          String(r.voteCount),
        ].join(',')
      );
    }
    const blob = new Blob([lines.join('\n')], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <button type="button" onClick={download} className="rounded bg-black px-3 py-1 text-sm text-white">
      Download CSV
    </button>
  );
}
