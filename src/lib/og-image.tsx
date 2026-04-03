import { ImageResponse } from 'next/og';

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = 'image/png';

interface OgImageOptions {
  title: string;
  subtitle?: string;
  tag?: string;
  date?: string;
}

export function generateOgImage({ title, subtitle, tag, date }: OgImageOptions) {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px',
          background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)',
          fontFamily: 'Inter, system-ui, sans-serif',
        }}
      >
        {/* Top row: tag + date */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {tag ? (
            <div
              style={{
                display: 'flex',
                padding: '8px 20px',
                background: 'rgba(59, 130, 246, 0.2)',
                border: '1px solid rgba(59, 130, 246, 0.4)',
                borderRadius: '9999px',
                color: '#93c5fd',
                fontSize: '20px',
                fontWeight: 600,
              }}
            >
              {tag}
            </div>
          ) : (
            <div />
          )}
          {date ? (
            <div style={{ color: '#94a3b8', fontSize: '20px' }}>{date}</div>
          ) : null}
        </div>

        {/* Center: title + subtitle */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', flex: 1, justifyContent: 'center' }}>
          <div
            style={{
              fontSize: title.length > 60 ? 42 : title.length > 40 ? 50 : 58,
              fontWeight: 700,
              color: '#f8fafc',
              lineHeight: 1.2,
              display: 'flex',
            }}
          >
            {title}
          </div>
          {subtitle ? (
            <div
              style={{
                fontSize: 24,
                color: '#94a3b8',
                lineHeight: 1.4,
                display: 'flex',
              }}
            >
              {subtitle.length > 120 ? subtitle.slice(0, 117) + '...' : subtitle}
            </div>
          ) : null}
        </div>

        {/* Bottom: branding */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div
              style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                borderRadius: '8px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '20px',
                fontWeight: 700,
              }}
            >
              02
            </div>
            <div style={{ color: '#e2e8f0', fontSize: '24px', fontWeight: 600, display: 'flex' }}>
              02Ship
            </div>
          </div>
          <div style={{ color: '#64748b', fontSize: '18px', display: 'flex' }}>
            {"Sydney's Claude Builder Community"}
          </div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
