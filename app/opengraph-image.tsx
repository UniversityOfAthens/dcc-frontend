import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { ImageResponse } from 'next/og';

export const alt = 'DIT Coding Club';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), 'public/logo.png'));
  const logoSrc = `data:image/png;base64,${logo.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 56,
        background: 'radial-gradient(60% 80% at 30% 30%, #4a0f5c 0%, #1b1c1c 70%)',
        color: '#ffffff',
        fontFamily: 'sans-serif',
      }}
    >
      <img src={logoSrc} width={300} height={300} alt="" />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <div style={{ fontSize: 76, fontWeight: 700, lineHeight: 1 }}>DIT Coding Club</div>
        <div style={{ fontSize: 34, color: '#43c5e7' }}>
          Security · Game Dev · CP · Hackathons · 3D Art
        </div>
      </div>
    </div>,
    size,
  );
}
