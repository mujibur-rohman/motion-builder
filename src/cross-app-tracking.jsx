import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame } from 'remotion';
import { sceneTimeline } from './project.js';
import { EditorialBackground, resolveTheme } from './editorial-style.jsx';

const I = (v, a, b, x, y) => interpolate(v, [a, b], [x, y], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
const ASSET = 'assets/cross-app-tracking/logos/';
const C = { orange: '#EE6B2B', pink: '#E14C84', purple: '#7667F5', mint: '#43D2A0', white: '#F7F8FA', muted: '#ADB3C1', panel: '#292D38', stroke: '#505665' };

function Brand({ name, size = 78, color, style = {} }) {
  return <div style={{ width: size, height: size, borderRadius: size * .25, background: color, display: 'grid', placeItems: 'center', flexShrink: 0, ...style }}>
    <Img src={staticFile(`${ASSET}${name}.svg`)} style={{ width: size * .59, height: size * .59, filter: 'invert(1)' }} />
  </div>;
}

function Shoe({ size = 180, frame = 0 }) {
  return <svg width={size} height={size * .69} viewBox="0 0 240 165" style={{ overflow: 'visible', filter: 'drop-shadow(0 20px 20px #0006)', transform: `rotate(${-8 + Math.sin(frame / 18) * 3}deg) translateY(${Math.sin(frame / 16) * 7}px)` }}>
    <path d="M29 105 Q54 94 74 58 L92 49 Q110 77 146 85 L187 91 Q209 100 219 117 L219 138 Q190 151 132 147 L39 143 Q18 137 24 118Z" fill="#F1EEE8" stroke="#B6BCC7" strokeWidth="5" />
    <path d="M73 60 Q99 74 139 87 L175 93" fill="none" stroke="#EC6B35" strokeWidth="13" strokeLinecap="round" />
    <path d="M32 125 Q121 139 217 124" fill="none" stroke="#434957" strokeWidth="13" strokeLinecap="round" />
    {[0, 1, 2].map(i => <path key={i} d={`M${94 + i * 19} ${72 + i * 5} l-15 12`} stroke="#545B66" strokeWidth="5" strokeLinecap="round" />)}
    <path d="M190 103 q18 3 25 18" fill="none" stroke="#D2D7DE" strokeWidth="5" />
  </svg>;
}

function Phone({ frame, app = 'shop', x = 250, y = 475, scale = 1, search = false, ad = false, dim = false }) {
  const isShop = app === 'shop';
  const title = isShop ? 'Shopee' : 'Instagram';
  const col = isShop ? C.orange : C.pink;
  const float = Math.sin(frame / 20) * 8;
  return <div style={{ position: 'absolute', left: x, top: y + float, width: 580, height: 960, transform: `scale(${scale})`, transformOrigin: 'top left', borderRadius: 73, padding: 16, background: '#111318', border: '5px solid #747A86', boxShadow: '0 45px 100px #0009', opacity: dim ? .65 : 1 }}>
    <div style={{ height: '100%', borderRadius: 55, background: '#F8F8FA', overflow: 'hidden', position: 'relative', color: '#20232B' }}>
      <div style={{ position: 'absolute', top: 0, left: 188, width: 200, height: 34, background: '#111318', borderRadius: '0 0 27px 27px', zIndex: 2 }} />
      <div style={{ height: 125, padding: '48px 28px 20px', background: col, color: 'white', display: 'flex', alignItems: 'center', gap: 20 }}><Brand name={isShop ? 'shopee' : 'instagram'} size={52} color="transparent" /><b style={{ fontSize: 39 }}>{title}</b><span style={{ marginLeft: 'auto', fontSize: 32 }}>⋯</span></div>
      {isShop ? <>
        <div style={{ margin: '27px 27px 0', height: 72, borderRadius: 15, border: '2px solid #CED1D7', color: '#666C77', display: 'flex', alignItems: 'center', padding: '0 20px', gap: 12, fontSize: 29 }}><span>⌕</span><span>sepatu running</span><span style={{ width: 3, height: 35, background: C.orange, opacity: search ? I(Math.sin(frame / 7), -.1, .1, 0, 1) : 0 }} /></div>
        <div style={{ display: 'flex', gap: 19, padding: '28px 27px' }}>
          {[0, 1].map(i => <div key={i} style={{ width: 240, height: 305, borderRadius: 17, background: '#fff', border: '2px solid #EAECF0', overflow: 'hidden', transform: `translateY(${I(frame - 15 - i * 9, 0, 18, 32, 0)}px)`, opacity: I(frame - 15 - i * 9, 0, 15, 0, 1) }}><div style={{ height: 200, background: i ? '#E9EAEE' : '#EEE8E2', display: 'grid', placeItems: 'center' }}><Shoe size={140} frame={frame + i * 12} /></div><div style={{ padding: '12px 14px', fontSize: 20 }}>Sepatu running</div><b style={{ padding: '0 14px', color: C.orange, fontSize: 25 }}>Rp200.000</b></div>)}
        </div><div style={{ padding: '0 32px', color: '#6F7480', fontSize: 23 }}>Produk rekomendasi untuk kamu</div>
      </> : <>
        <div style={{ height: 80, padding: '18px 25px', display: 'flex', alignItems: 'center', gap: 16, fontSize: 24 }}><span style={{ width: 43, height: 43, borderRadius: 50, background: '#B8BFCB' }} /><b>running.daily</b><span style={{ marginLeft: 'auto' }}>•••</span></div>
        <div style={{ height: 465, background: '#E9E5E3', display: 'grid', placeItems: 'center', position: 'relative' }}><Shoe size={355} frame={frame} /><div style={{ position: 'absolute', right: 20, bottom: 20, background: '#fff', borderRadius: 12, padding: '8px 14px', fontSize: 22, fontWeight: 900, color: C.pink }}>Sponsored</div></div>
        <div style={{ padding: '25px 30px', fontSize: 26, fontWeight: 800 }}>Sepatu yang tadi lu cari?</div><div style={{ margin: '0 30px', background: C.pink, borderRadius: 15, color: 'white', textAlign: 'center', padding: 18, fontSize: 25, fontWeight: 800 }}>Lihat Produk →</div>
      </>}
    </div>
  </div>;
}

function Pill({ children, x, y, color = C.purple, frame = 0, delay = 0, width }) {
  return <div style={{ position: 'absolute', left: x, top: y, width, border: `2px solid ${color}`, background: '#272B35', borderRadius: 19, padding: '18px 25px', color: C.white, fontSize: 29, fontWeight: 800, textAlign: 'center', boxShadow: `0 0 30px ${color}30`, opacity: I(frame - delay, 0, 13, 0, 1), transform: `translateY(${I(frame - delay, 0, 18, 32, 0)}px)` }}>{children}</div>;
}

function Packet({ frame, fromX, toX, y, start = 12, end = 85, label = 'EVENT', color = C.purple }) {
  const x = I(frame, start, end, fromX, toX);
  return <div style={{ position: 'absolute', left: x, top: y, padding: '13px 20px', borderRadius: 15, background: color, color: '#fff', fontSize: 23, fontWeight: 900, letterSpacing: '.05em', boxShadow: `0 0 34px ${color}88`, opacity: I(frame, start - 5, start + 4, 0, 1) }}>{label}</div>;
}

function Node({ icon, title, x, y, color, frame, delay = 0, width = 240 }) {
  return <div style={{ position: 'absolute', left: x, top: y, width, height: 210, borderRadius: 29, border: `3px solid ${color}`, background: '#282C37', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 18, color: C.white, boxShadow: `0 20px 48px #0005`, transform: `scale(${I(frame - delay, 0, 20, .65, 1)})`, opacity: I(frame - delay, 0, 12, 0, 1) }}><span style={{ fontSize: 60 }}>{icon}</span><b style={{ fontSize: 26, textAlign: 'center' }}>{title}</b></div>;
}

function Visual({ scene, frame }) {
  const mode = scene.visual.mode;
  if (mode === 'search') return <><Phone frame={frame} search /><Pill x={610} y={1180} frame={frame} delay={42} color={C.orange}>⌕ sepatu running</Pill></>;
  if (mode === 'social-ad') return <><Phone frame={frame} app="social" /><div style={{ position: 'absolute', left: 73, top: 990, width: 145, height: 145, borderRadius: '50%', border: `7px solid ${C.pink}`, opacity: I(frame, 25, 40, 0, 1), transform: `scale(${1 + Math.sin(frame / 6) * .08})`, display: 'grid', placeItems: 'center', fontSize: 60 }}>?!</div></>;
  if (mode === 'microphone') return <><div style={{ position: 'absolute', left: 390, top: 670, fontSize: 250, opacity: .9, transform: `rotate(${Math.sin(frame / 8) * 7}deg)` }}>🎙</div><div style={{ position: 'absolute', left: 250, top: 1090, width: I(frame, 25, 48, 0, 580), height: 12, background: C.pink, borderRadius: 10 }} /><Pill x={290} y={1160} frame={frame} delay={23} color={C.pink}>HP nguping?</Pill><div style={{ position: 'absolute', left: 710, top: 770, fontSize: 125, color: C.pink, transform: `scale(${I(frame, 28, 40, 0, 1)})` }}>×</div></>;
  if (mode === 'cross-app') return <><Node icon="⌕" title="Aplikasi belanja" x={90} y={760} color={C.orange} frame={frame} /><Node icon="◎" title="Sosial media" x={750} y={760} color={C.pink} frame={frame} delay={18} /><div style={{ position: 'absolute', left: 335, top: 860, width: 420, height: 5, background: C.stroke }} /><Packet frame={frame} fromX={340} toX={665} y={830} label="DATA" start={24} end={78} /><Pill x={333} y={1060} width={410} frame={frame} delay={45}>CROSS APP TRACKING</Pill></>;
  if (mode === 'device-id') return <><div style={{ position: 'absolute', left: 180, top: 575, width: 720, height: 540, border: `3px solid ${C.purple}`, borderRadius: 34, background: C.panel, transform: `rotate(${-4 + Math.sin(frame / 25) * 2}deg) scale(${I(frame, 0, 22, .75, 1)})`, boxShadow: '0 35px 70px #0006', padding: 60 }}><div style={{ fontSize: 31, color: C.muted, letterSpacing: '.1em' }}>ADVERTISING ID</div><div style={{ display: 'flex', alignItems: 'center', gap: 35, marginTop: 50 }}><span style={{ fontSize: 95 }}>▣</span><div style={{ fontSize: 62, fontWeight: 900, lineHeight: 1.1 }}>ID perangkat</div></div><div style={{ marginTop: 55, fontFamily: 'monospace', color: C.mint, fontSize: 35, letterSpacing: '.06em' }}>A7F9 · 2B41 · 0C6D</div><div style={{ marginTop: 25, color: C.muted, fontSize: 24 }}>Contoh kode ilustratif</div></div><Pill x={310} y={1195} frame={frame} delay={32}>Bisa direset / dibatasi</Pill></>;
  if (mode === 'id-types') return <><div style={{ position: 'absolute', left: 145, top: 610, display: 'flex', flexDirection: 'column', gap: 32 }}><div style={{ width: 790, height: 225, borderRadius: 30, background: C.panel, border: `2px solid ${C.stroke}`, display: 'flex', alignItems: 'center', padding: 40, gap: 37, transform: `translateX(${I(frame, 0, 22, -170, 0)}px)` }}><Brand name="android" color="#4DAE80" size={125} /><div><div style={{ fontSize: 48, fontWeight: 900 }}>GAID</div><div style={{ fontSize: 29, color: C.muted }}>Android</div></div></div><div style={{ width: 790, height: 225, borderRadius: 30, background: C.panel, border: `2px solid ${C.stroke}`, display: 'flex', alignItems: 'center', padding: 40, gap: 37, transform: `translateX(${I(frame, 12, 34, 170, 0)}px)` }}><Brand name="apple" color="#566072" size={125} /><div><div style={{ fontSize: 48, fontWeight: 900 }}>IDFA</div><div style={{ fontSize: 29, color: C.muted }}>iPhone</div></div></div></div><Pill x={205} y={1200} frame={frame} delay={35}>Akses bergantung izin & setelan</Pill></>;
  if (mode === 'sdk') return <><div style={{ position: 'absolute', left: 105, top: 610, width: 870, height: 580, borderRadius: 38, border: `3px solid ${C.orange}`, background: C.panel, padding: 50, transform: `scale(${I(frame, 0, 22, .83, 1)})` }}><div style={{ display: 'flex', alignItems: 'center', gap: 25 }}><Brand name="shopee" color={C.orange} size={90} /><b style={{ fontSize: 42 }}>Aplikasi belanja</b></div><div style={{ marginTop: 48, height: 3, background: C.stroke }} /><div style={{ marginTop: 55, display: 'flex', alignItems: 'center', gap: 27, transform: `translateX(${I(frame, 22, 48, 450, 0)}px)` }}><Brand name="meta" color={C.purple} size={95} /><div><b style={{ fontSize: 42 }}>SDK pihak ketiga</b><div style={{ fontSize: 27, color: C.muted }}>Contoh: Meta SDK</div></div></div><div style={{ marginTop: 45, fontSize: 25, color: C.muted }}>Ilustrasi mekanisme · bukan klaim integrasi aplikasi tertentu</div></div><div style={{ position: 'absolute', left: 665, top: 1000, width: 32, height: 32, borderRadius: 20, background: C.mint, boxShadow: `0 0 ${20 + Math.sin(frame / 5) * 14}px ${C.mint}` }} /></>;
  if (mode === 'product-event') return <><Phone frame={frame} search x={55} y={530} scale={.75} /><div style={{ position: 'absolute', left: 545, top: 670, width: 440, display: 'grid', gap: 25 }}><Pill x={0} y={0} width={410} frame={frame} delay={16} color={C.orange}>⌕ sepatu</Pill><Pill x={0} y={112} width={410} frame={frame} delay={29} color={C.orange}>Rp200.000</Pill><Pill x={0} y={224} width={410} frame={frame} delay={42} color={C.pink}>Belum checkout</Pill></div><Packet frame={frame} fromX={440} toX={655} y={1130} start={45} end={92} label="EVENT" /></>;
  if (mode === 'report') return <><Node icon="▣" title="Aplikasi" x={72} y={745} color={C.orange} frame={frame} /><Node icon="◇" title="Server iklan" x={756} y={745} color={C.purple} frame={frame} delay={10} /><div style={{ position: 'absolute', left: 310, top: 845, width: 455, height: 5, background: C.stroke }} /><Packet frame={frame} fromX={300} toX={665} y={810} start={20} end={88} label="ID + EVENT" color={C.mint} /><Pill x={220} y={1065} width={650} frame={frame} delay={42}>“Lihat sepatu · belum beli”</Pill></>;
  if (mode === 'match') return <><div style={{ position: 'absolute', left: 150, top: 625, display: 'grid', gap: 34 }}><Pill x={0} y={0} width={780} frame={frame} color={C.mint}>ID perangkat: A7F9…</Pill><Pill x={0} y={145} width={780} frame={frame} delay={15} color={C.purple}>Profil iklan: User A</Pill></div><div style={{ position: 'absolute', left: 490, top: 900, height: I(frame, 28, 56, 0, 160), width: 6, background: C.mint }} /><div style={{ position: 'absolute', left: 290, top: 1080, width: 500, textAlign: 'center', borderRadius: 28, border: `3px solid ${C.mint}`, padding: 30, fontSize: 41, fontWeight: 900, color: C.mint, opacity: I(frame, 52, 68, 0, 1), transform: `scale(${I(frame, 52, 68, .65, 1)})` }}>✓ COCOK</div></>;
  if (mode === 'rank') return <><div style={{ position: 'absolute', left: 90, top: 650, display: 'flex', gap: 20 }}>{[['Sepatu running', C.mint], ['Tas kantor', C.stroke], ['Kamera', C.stroke]].map(([name, color], i) => <div key={name} style={{ width: 286, height: 380, borderRadius: 25, background: C.panel, border: `3px solid ${color}`, padding: 24, opacity: i ? .58 : 1, transform: `translateY(${I(frame - i * 11, 0, 25, 100, i ? 35 : -45)}px)` }}><div style={{ height: 210, display: 'grid', placeItems: 'center', fontSize: 115 }}>{i ? i === 1 ? '▰' : '▣' : <Shoe size={180} frame={frame} />}</div><div style={{ fontSize: 25, fontWeight: 800 }}>{name}</div><div style={{ color, fontSize: 22, marginTop: 13 }}>{i ? 'relevansi rendah' : 'relevansi tinggi'}</div></div>)}</div><Pill x={280} y={1150} frame={frame} delay={40} color={C.mint}>Iklan paling relevan dipilih</Pill></>;
  return <Phone frame={frame} app="social" />;
}

function StoryScene({ scene, frame }) {
  const local = frame - scene.from;
  if (local < 0 || local >= scene.duration) return null;
  const out = I(local, scene.duration - 13, scene.duration, 1, 0);
  return <AbsoluteFill style={{ color: C.white, fontFamily: 'Avenir Next, Arial, sans-serif', opacity: out }}>
    <div style={{ position: 'absolute', left: 90, top: 135, color: C.mint, fontSize: 25, fontWeight: 900, letterSpacing: '.14em', opacity: I(local, 0, 12, 0, 1) }}>{scene.visual.kicker}</div>
    <div style={{ position: 'absolute', left: 90, top: 235, width: 900, fontSize: 64, lineHeight: 1.08, letterSpacing: '-.045em', fontWeight: 900, transform: `translateY(${I(local, 0, 20, 55, 0)}px)`, opacity: I(local, 0, 15, 0, 1) }}>{scene.text}</div>
    <Visual scene={scene} frame={local} />
    <div style={{ position: 'absolute', left: 90, right: 90, top: 1510, fontSize: 32, color: C.muted, lineHeight: 1.35, opacity: I(local, 18, 35, 0, 1) }}>{scene.visual.caption}</div>
    <div style={{ position: 'absolute', left: 90, bottom: 140, fontSize: 21, color: '#858C9B' }}>ILUSTRASI ALUR · praktik dan izin dapat berbeda tiap aplikasi</div>
    {scene.audio && <Sequence from={scene.from} durationInFrames={scene.duration}><Audio src={staticFile(scene.audio.slice(1))} /></Sequence>}
  </AbsoluteFill>;
}

export function CrossAppTrackingVideo({ project }) {
  const frame = useCurrentFrame();
  const theme = resolveTheme(project.theme);
  const timeline = sceneTimeline(project);
  const total = timeline.at(-1).from + timeline.at(-1).duration;
  return <AbsoluteFill style={{ overflow: 'hidden' }}><EditorialBackground frame={frame} theme={theme} />{timeline.map(scene => <StoryScene key={scene.index} scene={scene} frame={frame} />)}<div style={{ position: 'absolute', bottom: 76, left: 90, right: 90, height: 5, borderRadius: 5, background: '#464A56' }}><div style={{ width: `${frame / total * 100}%`, height: '100%', background: C.mint, borderRadius: 5 }} /></div></AbsoluteFill>;
}
