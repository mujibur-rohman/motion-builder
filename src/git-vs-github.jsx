import React from 'react';
import { AbsoluteFill, Audio, Img, Sequence, interpolate, staticFile, useCurrentFrame, useVideoConfig } from 'remotion';
import { sceneTimeline } from './project.js';
import { EditorialBackground, resolveTheme } from './editorial-style.jsx';

const C = { bg: '#1E1F22', panel: '#2B2D31', raised: '#313338', border: '#404249', text: '#F2F3F5', muted: '#B5BAC1', blurple: '#5865F2', mint: '#43B581', red: '#F23F43' };
const clamp = { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' };
const assets = {
  laptop: staticFile('assets/git-vs-github/error-laptop.png'),
  save: staticFile('assets/git-vs-github/save-point.png'),
  cloud: staticFile('assets/git-vs-github/cloud-repo.png'),
  commitTrack2d: staticFile('assets/git-vs-github/commit-track-2d.png'),
  savepoint2d: staticFile('assets/git-vs-github/savepoint-2d.png'),
  cloud2d: staticFile('assets/git-vs-github/cloud-2d.png'),
  error2d: staticFile('assets/git-vs-github/error-2d.png'),
  gitLogo: staticFile('assets/git-vs-github/logos/git-white.svg'),
  githubLogo: staticFile('assets/git-vs-github/logos/github-white.svg'),
  githubMark: staticFile('assets/git-vs-github/logos/github-mark-white.svg'),
};

const lerp = (frame, points, values) => interpolate(frame, points, values, clamp);

function Asset({ src, local, width = 900, top = 0, rotate = 0 }) {
  const enter = lerp(local, [0, 24], [.82, 1]);
  const drift = Math.sin(local / 24) * 14;
  return <Img src={src} style={{ position: 'absolute', width, maxHeight: 900, objectFit: 'contain', left: '50%', top, transform: `translateX(-50%) translateY(${drift}px) scale(${enter}) rotate(${rotate}deg)`, filter: 'drop-shadow(0 35px 55px #0008)' }} />;
}

function Panel({ children, style = {} }) {
  return <div style={{ background: C.panel, border: `2px solid ${C.border}`, borderRadius: 32, boxShadow: '0 28px 70px #0006', ...style }}>{children}</div>;
}

function CodeWindow({ local, error = false, lost = false }) {
  const lines = [72, 48, 85, 60, 45, 77, 55, 84];
  return (
    <Panel style={{ position: 'absolute', width: 820, height: 600, left: 130, top: 130, padding: 34, transform: `perspective(1300px) rotateY(${-5 + Math.sin(local / 45) * 2}deg) translateY(${Math.sin(local / 32) * 10}px)` }}>
      <div style={{ display: 'flex', gap: 13, marginBottom: 45 }}><i style={{ ...dot(C.red) }} /><i style={{ ...dot('#F0B232') }} /><i style={{ ...dot(C.mint) }} /><span style={{ marginLeft: 25, color: C.muted, fontSize: 26 }}>src / app / login.js</span></div>
      {lines.map((w, i) => <div key={i} style={{ height: 16, width: `${w}%`, margin: '29px 0 0 26px', borderRadius: 9, background: error && i > 3 ? C.red : i % 3 === 0 ? C.blurple : i % 3 === 1 ? '#7E8DD0' : '#6E7684', opacity: lost ? .28 : 1, transform: `scaleX(${lerp(local - i * 3, [0, 18], [.15, 1])})`, transformOrigin: 'left' }} />)}
      {error && <div style={{ position: 'absolute', right: -22, bottom: 35, padding: '22px 35px', borderRadius: 20, background: C.red, color: 'white', fontSize: 34, fontWeight: 800, transform: `scale(${1 + Math.sin(local / 5) * .025})` }}>ERROR</div>}
    </Panel>
  );
}

function dot(color) { return { width: 17, height: 17, borderRadius: '50%', background: color, display: 'inline-block' }; }

function NodeTimeline({ local, mode }) {
  const nodes = ['Login', 'Payment', 'Eksperimen'];
  const active = mode === 'rollback' ? 2 : mode === 'timeline' ? 1 : 0;
  return (
    <div style={{ position: 'absolute', top: 345, left: 120, width: 840 }}>
      <div style={{ height: 10, background: C.border, borderRadius: 8, position: 'absolute', left: 90, right: 90, top: 41 }} />
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {nodes.map((name, i) => (
          <div key={name} style={{ width: 230, textAlign: 'center', color: i === 2 && mode === 'rollback' ? C.red : C.text, opacity: i <= active ? 1 : .35, transform: `translateY(${lerp(local - i * 8, [0, 20], [90, 0])}px)` }}>
            <div style={{ width: 90, height: 90, margin: '0 auto 32px', borderRadius: '50%', background: i === 2 && mode === 'rollback' ? C.red : C.blurple, border: '10px solid #252835', boxShadow: `0 0 0 4px ${C.border}`, display: 'grid', placeItems: 'center', fontSize: 32, fontWeight: 800 }}>{i === 2 && mode === 'rollback' ? '×' : '✓'}</div>
            <div style={{ fontSize: 31, fontWeight: 800 }}>{name}</div>
            <div style={{ color: C.muted, fontSize: 23, marginTop: 7 }}>{i === 2 ? 'working tree' : `commit 0${i + 1}`}</div>
          </div>
        ))}
      </div>
      {mode === 'rollback' && <div style={{ color: C.mint, fontWeight: 800, fontSize: 46, textAlign: 'center', marginTop: 115, transform: `translateX(${Math.sin(local / 18) * 12}px)` }}>↶ kembali ke commit 02</div>}
    </div>
  );
}

function Pair({ local, active }) {
  return <div style={{ position: 'absolute', left: 100, top: 240, width: 880, display: 'flex', flexDirection: 'column', gap: 30 }}>
    {[['Git', 'History di laptop', C.blurple, assets.gitLogo], ['GitHub', 'Repository online', C.mint, assets.githubLogo]].map(([name, meaning, color, logo], i) => <Panel key={name} style={{ padding: '34px 50px', borderColor: active === i ? color : C.border, opacity: active === i ? 1 : .55, transform: `translateX(${lerp(local - i * 8, [0, 18], [i ? 130 : -130, 0])}px)` }}><Img src={logo} style={{ width: i ? 285 : 215, height: 92, objectFit: 'contain', objectPosition: 'left center' }} /><div style={{ color: C.muted, fontSize: 31, marginTop: 12 }}>{meaning}</div></Panel>)}
  </div>;
}

function Workflow({ local, sceneIndex }) {
  const current = sceneIndex === 17 ? Math.min(1, Math.floor(local / 75)) : sceneIndex === 18 ? 2 : 3;
  const items = [['01', 'Edit kode'], ['02', 'Pilih perubahan'], ['03', 'Commit'], ['04', 'Push']];
  return <div style={{ position: 'absolute', left: 115, top: 150, width: 850, display: 'grid', gap: 23 }}>
    {items.map(([number, label], i) => <Panel key={number} style={{ height: 138, display: 'flex', alignItems: 'center', padding: '0 36px', gap: 28, borderColor: current === i ? C.blurple : C.border, opacity: current < i ? .42 : 1, transform: `translateX(${lerp(local - i * 6, [0, 20], [120, 0])}px)` }}><span style={{ fontSize: 33, color: C.blurple, fontWeight: 800 }}>{number}</span><span style={{ fontSize: 48, color: C.text, fontWeight: 800 }}>{label}</span><span style={{ marginLeft: 'auto', color: i < current ? C.mint : C.muted, fontSize: 42 }}>{i < current ? '✓' : '→'}</span></Panel>)}
  </div>;
}

const mono = 'SFMono-Regular, Menlo, Consolas, monospace';

function Pointer({ x, y, click = false }) {
  return <div style={{ position: 'absolute', left: x, top: y, zIndex: 20, filter: 'drop-shadow(0 5px 5px #0008)' }}>
    {click && <div style={{ position: 'absolute', width: 62, height: 62, left: -23, top: -23, border: `3px solid ${C.mint}`, borderRadius: '50%', opacity: .55 }} />}
    <svg width="40" height="48" viewBox="0 0 40 48"><path d="M4 3v35l9-10 8 17 7-4-8-16h15z" fill="#fff" stroke="#111" strokeWidth="3" /></svg>
  </div>;
}

function CodeLines({ local, sceneIndex }) {
  const changed = [2, 3, 4, 9, 18, 22].includes(sceneIndex);
  const broken = [3, 4, 9, 22].includes(sceneIndex);
  const lines = [
    ['01', 'export default function Login() {', 'purple'],
    ['02', '  const [email, setEmail] = useState("");', 'plain'],
    ['03', '  const [password, setPassword] = useState("");', 'plain'],
    ['04', '  async function submit() {', 'purple'],
    ['05', changed ? '    const user = await aiAuth(email);' : '    const user = await signIn(email, password);', changed ? 'change' : 'plain'],
    ['06', broken ? '    navigate(user.profile.undefined);' : '    navigate("/dashboard");', broken ? 'error' : 'success'],
    ['07', '  }', 'plain'],
    ['08', '  return <LoginForm onSubmit={submit} />;', 'plain'],
    ['09', '}', 'plain'],
  ];
  return <div style={{ padding: '33px 0 0 18px', fontFamily: mono, fontSize: 24, lineHeight: 1.9, whiteSpace: 'pre', overflow: 'hidden' }}>
    {lines.map(([number, code, kind], i) => <div key={number} style={{ display: 'flex', background: kind === 'error' ? '#6D292A88' : kind === 'change' ? '#57471D66' : 'transparent', width: '100%', opacity: lerp(local - i * 2, [0, 12], [.18, 1]) }}><span style={{ color: '#68707F', width: 65, textAlign: 'right', marginRight: 34 }}>{number}</span><span style={{ color: kind === 'purple' ? '#C8B6FF' : kind === 'error' ? '#FF8E91' : kind === 'success' ? '#8DDBAA' : kind === 'change' ? '#F3C779' : '#D8DEE9' }}>{code}</span></div>)}
  </div>;
}

function TerminalContent({ local, sceneIndex }) {
  const commands = {
    1: [['$ npm run dev', C.text], ['✓ Ready on localhost:3000', C.mint]],
    2: [['> AI: update login flow', C.blurple], ['↳ editing 7 files…', '#F3C779']],
    3: [['✕ TypeError: profile is undefined', C.red], ['✕ Build failed in login.js:6', C.red]],
    4: [['$ git status', C.text], ['modified: login.js  auth.js  routes.js', '#F3C779']],
    5: [['$ git log --oneline', C.text], ['a1b2c3  login working', C.mint]],
    6: [['$ git add .', C.text], ['$ git commit -m "login working"', C.mint]],
    7: [['$ git log --oneline', C.text], ['a1b2c3  login working', C.mint]],
    8: [['$ git log --oneline', C.text], ['d4e5f6  add payment', C.mint], ['a1b2c3  login working', C.muted]],
    9: [['$ git diff', C.text], ['- navigate("/dashboard")', C.red], ['+ navigate(user.profile.undefined)', C.mint]],
    15: [['$ git log --oneline', C.text], ['d4e5f6  add payment', C.mint], ['a1b2c3  login working', C.muted]],
    17: [['$ git status', C.text], ['modified: src/app/login.js', '#F3C779']],
    18: [['$ git add src/app/login.js', C.text], ['$ git commit -m "fix login"', C.mint]],
    19: [['$ git push origin main', C.text], ['✓ main → origin/main', C.mint]],
    21: [['$ git add .', C.text], ['$ git commit -m "before AI changes"', C.mint]],
    22: [['$ git restore .', C.text], ['✓ Working tree restored', C.mint]],
  };
  return <div style={{ padding: '23px 32px', fontFamily: mono, fontSize: 25, lineHeight: 1.7 }}>
    {(commands[sceneIndex] ?? []).map(([line, color], i) => <div key={i} style={{ color, opacity: lerp(local - 9 - i * 13, [0, 10], [0, 1]), transform: `translateY(${lerp(local - 9 - i * 13, [0, 10], [10, 0])}px)` }}>{line}</div>)}
  </div>;
}

function EditorCapture({ local, sceneIndex }) {
  const zoom = [3, 9, 18, 19, 22].includes(sceneIndex) ? 1.13 : [5, 6, 7, 8, 21].includes(sceneIndex) ? 1.08 : 1.02;
  const progress = lerp(local, [0, 25], [0, 1]);
  const scale = 1 + (zoom - 1) * progress;
  const pointerX = sceneIndex === 2 ? lerp(local, [0, 35], [590, 720]) : sceneIndex === 18 ? lerp(local, [0, 35], [150, 610]) : 680;
  const pointerY = sceneIndex === 2 ? lerp(local, [0, 35], [480, 680]) : sceneIndex === 18 ? 580 : 800;
  const toast = sceneIndex === 3 ? ['Build failed', C.red] : sceneIndex === 6 || sceneIndex === 8 || sceneIndex === 18 || sceneIndex === 21 ? ['Commit created', C.mint] : sceneIndex === 19 ? ['Pushed to GitHub', C.mint] : sceneIndex === 22 ? ['Back to safe version', C.mint] : null;
  return <div style={{ position: 'absolute', inset: 0, transform: `scale(${scale}) translateY(${sceneIndex === 3 || sceneIndex === 9 ? -14 * progress : 0}px)`, transformOrigin: sceneIndex === 3 || sceneIndex === 9 ? 'center 75%' : 'center center' }}>
    <div style={{ position: 'absolute', inset: 0, background: '#1B1D24', border: `2px solid ${C.border}`, borderRadius: 24, overflow: 'hidden', boxShadow: '0 42px 100px #0009' }}>
      <div style={{ height: 66, background: '#2A2D35', borderBottom: `2px solid ${C.border}`, display: 'flex', alignItems: 'center', padding: '0 25px', gap: 11 }}><i style={dot(C.red)} /><i style={dot('#F0B232')} /><i style={dot(C.mint)} /><span style={{ marginLeft: 28, color: '#C6CBD3', fontSize: 24, fontFamily: mono }}>motion-builder — login.js</span>{sceneIndex >= 5 && <Img src={assets.gitLogo} style={{ width: 87, height: 38, objectFit: 'contain', marginLeft: 'auto' }} />}<span style={{ marginLeft: sceneIndex >= 5 ? 18 : 'auto', color: C.red, fontSize: 22, fontWeight: 800 }}>● REC</span></div>
      <div style={{ display: 'flex', height: 655 }}>
        <div style={{ width: 145, background: '#22242B', borderRight: `2px solid ${C.border}`, padding: '25px 15px', fontFamily: mono, color: '#9299A7', fontSize: 22, lineHeight: 2.2 }}><div style={{ color: C.text }}>EXPLORER</div><div>▾ src</div><div style={{ color: C.blurple }}> login.js</div><div> auth.js</div><div> routes.js</div></div>
        <div style={{ flex: 1, overflow: 'hidden' }}><div style={{ height: 58, background: '#252832', borderBottom: `1px solid ${C.border}`, padding: '12px 30px', fontFamily: mono, color: C.text, fontSize: 24 }}>● login.js <span style={{ color: '#F3C779', marginLeft: 25 }}>{[2, 3, 4, 9, 18, 22].includes(sceneIndex) ? 'M' : ''}</span></div><CodeLines local={local} sceneIndex={sceneIndex} /></div>
      </div>
      <div style={{ height: 230, borderTop: `2px solid ${C.border}`, background: '#16191F' }}><div style={{ color: C.muted, fontFamily: mono, fontSize: 21, padding: '13px 32px', borderBottom: `1px solid ${C.border}` }}>PROBLEMS  &nbsp; OUTPUT  &nbsp; <span style={{ color: C.text }}>TERMINAL</span></div><TerminalContent local={local} sceneIndex={sceneIndex} /></div>
      {toast && <div style={{ position: 'absolute', right: 30, top: 91, padding: '18px 25px', background: '#30343B', border: `2px solid ${toast[1]}`, borderRadius: 14, color: toast[1], fontSize: 25, fontWeight: 800, opacity: lerp(local, [13, 24], [0, 1]) }}>{toast[0]}</div>}
    </div>
    <Pointer x={pointerX} y={pointerY} click={[2, 18, 19].includes(sceneIndex) && local > 20 && local < 36} />
  </div>;
}

function BrowserCapture({ local, sceneIndex }) {
  const isPush = sceneIndex === 16;
  const progress = lerp(local, [0, 38], [0, 1]);
  return <div style={{ position: 'absolute', inset: 0, background: '#0D1117', border: '2px solid #48505C', borderRadius: 24, overflow: 'hidden', boxShadow: '0 42px 100px #0009', transform: `scale(${1 + progress * .07})`, transformOrigin: 'center 30%' }}>
    <div style={{ height: 67, background: '#20242C', display: 'flex', alignItems: 'center', gap: 13, padding: '0 24px' }}><i style={dot(C.red)} /><i style={dot('#F0B232')} /><i style={dot(C.mint)} /><div style={{ marginLeft: 30, flex: 1, background: '#11151B', borderRadius: 12, padding: '10px 24px', color: '#B9C0CD', fontFamily: mono, fontSize: 22 }}>github.com / kamu / vibe-app</div><span style={{ color: C.red, fontWeight: 900 }}>● REC</span></div>
    <div style={{ height: 95, borderBottom: '1px solid #30363D', display: 'flex', alignItems: 'center', padding: '0 42px', gap: 24 }}><Img src={assets.githubMark} style={{ width: 47, height: 47 }} /><span style={{ color: C.text, fontSize: 29, fontWeight: 800 }}>kamu / vibe-app</span><span style={{ color: '#8B949E', border: '1px solid #48505C', borderRadius: 18, padding: '4px 13px', fontSize: 18 }}>Public</span></div>
    <div style={{ padding: '50px 52px' }}><div style={{ color: C.text, fontSize: 42, fontWeight: 900, marginBottom: 34 }}>vibe-app <span style={{ color: C.muted, fontSize: 25, fontWeight: 500 }}> / main</span></div><div style={{ display: 'flex', gap: 20, marginBottom: 29 }}><div style={{ background: '#238636', padding: '13px 28px', borderRadius: 9, fontWeight: 800, color: 'white', fontSize: 25 }}>▾ Code</div><div style={{ border: '1px solid #48505C', padding: '13px 28px', borderRadius: 9, color: C.text, fontSize: 25 }}>main</div></div><div style={{ background: '#161B22', border: '1px solid #30363D', borderRadius: 13, overflow: 'hidden' }}><div style={{ padding: '22px 30px', color: '#A5D6FF', fontSize: 23, borderBottom: '1px solid #30363D' }}>{isPush ? '✓ fix login · just now' : '✓ add payment · yesterday'}</div>{['src', 'public', 'package.json', 'README.md'].map((name, i) => <div key={name} style={{ padding: '21px 30px', display: 'flex', color: '#C9D1D9', fontSize: 26, borderBottom: i < 3 ? '1px solid #30363D' : 'none' }}><span style={{ color: '#8B949E', marginRight: 20 }}>{i < 2 ? '▣' : '▤'}</span>{name}<span style={{ marginLeft: 'auto', color: '#8B949E', fontSize: 20 }}>{isPush ? 'just now' : 'yesterday'}</span></div>)}</div></div>
    {isPush && <div style={{ position: 'absolute', right: 50, bottom: 54, background: '#1F6F3B', borderRadius: 12, padding: '18px 30px', color: 'white', fontSize: 27, fontWeight: 900, opacity: progress }}>↑ push complete</div>}
    <Pointer x={isPush ? 320 : 540} y={isPush ? 360 : 500} click={local > 30 && local < 46} />
  </div>;
}

function ScreenRecording({ local, sceneIndex }) {
  return <div style={{ position: 'absolute', left: 68, right: 68, top: 0, height: 1050 }}>
    {[12, 16, 19].includes(sceneIndex) ? <BrowserCapture local={local} sceneIndex={sceneIndex} /> : <EditorCapture local={local} sceneIndex={sceneIndex} />}
  </div>;
}

function CommitTrackGraphic({ scene, local }) {
  const p = lerp(local, [0, scene.duration], [0, 1]);
  const reverse = scene.motion === 'track-reverse';
  const forward = scene.motion === 'track-forward';
  const x = reverse ? lerp(p, [0, 1], [-120, 70]) : forward ? lerp(p, [0, 1], [25, -95]) : lerp(p, [0, 1], [100, 0]);
  const scale = reverse ? lerp(p, [0, 1], [1.2, 1.02]) : forward ? lerp(p, [0, 1], [1.04, 1.18]) : lerp(p, [0, 1], [.78, 1.05]);
  return <>
    <Img src={assets.commitTrack2d} style={{ position: 'absolute', width: 1040, height: 1080, objectFit: 'contain', left: 20, top: 85, transform: `translateX(${x}px) scale(${scale})`, transformOrigin: reverse ? 'left center' : 'center center' }} />
    <div style={{ position: 'absolute', left: reverse ? 170 : forward ? 410 : 100, top: 130, padding: '18px 30px', borderRadius: 17, background: reverse ? C.red : C.blurple, color: '#fff', fontSize: 30, fontWeight: 900, transform: `translateY(${lerp(local, [0, 16], [65, 0])}px)` }}>{reverse ? '↶ REWIND' : scene.index === 8 ? 'COMMIT 02' : scene.index === 7 ? 'COMMIT 01' : 'HISTORY'}</div>
    {scene.index === 5 && <Img src={assets.gitLogo} style={{ position: 'absolute', width: 230, height: 96, objectFit: 'contain', left: 710, top: 120 }} />}
  </>;
}

function SavepointGraphic({ scene, local }) {
  const p = lerp(local, [0, scene.duration], [0, 1]);
  const final = scene.motion === 'save-final';
  const enter = final ? lerp(p, [0, 1], [.85, 1.16]) : lerp(local, [0, 22], [.48, 1]);
  const bob = Math.sin(local / 16) * (final ? 7 : 16);
  return <>
    <div style={{ position: 'absolute', width: 800, height: 800, borderRadius: '50%', left: 140, top: 155, border: `3px solid ${C.blurple}`, opacity: .32 + Math.sin(local / 10) * .08, transform: `scale(${.88 + p * .13})` }} />
    <Img src={assets.savepoint2d} style={{ position: 'absolute', width: 1000, height: 1050, objectFit: 'contain', left: 40, top: 30, transform: `translateY(${bob}px) scale(${enter})` }} />
    {scene.index === 21 && <div style={{ position: 'absolute', left: 310, top: 940, padding: '16px 30px', background: C.mint, color: '#16211C', borderRadius: 16, fontSize: 33, fontWeight: 900 }}>CHECKPOINT READY ✓</div>}
  </>;
}

function ErrorGraphic({ local }) {
  const p = lerp(local, [0, 30], [0, 1]);
  return <>
    <Img src={assets.error2d} style={{ position: 'absolute', width: 1070, height: 850, objectFit: 'contain', left: 5, top: 130, transform: `translateX(${lerp(p, [0, 1], [-120, 0])}px) rotate(${lerp(p, [0, 1], [-5, 0])}deg)` }} />
    {[0, 1, 2].map((i) => <div key={i} style={{ position: 'absolute', width: 450, height: 9, background: C.red, left: 700 + i * 35, top: 470 + i * 66, opacity: .8, transform: `translateX(${lerp(local - i * 4, [0, 20], [220, 0])}px)` }} />)}
  </>;
}

function CloudGraphic({ local }) {
  const p = lerp(local, [0, 40], [0, 1]);
  return <>
    <Img src={assets.cloud2d} style={{ position: 'absolute', width: 1000, height: 930, objectFit: 'contain', left: 40, top: 115, transform: `translateY(${lerp(p, [0, 1], [110, 0])}px) scale(${lerp(p, [0, 1], [.83, 1])})` }} />
    <Img src={assets.githubLogo} style={{ position: 'absolute', width: 325, height: 95, objectFit: 'contain', left: 375, top: 1010, opacity: p }} />
  </>;
}

function LocalGraphic({ local }) {
  const p = lerp(local, [0, 35], [0, 1]);
  return <>
    <div style={{ position: 'absolute', left: 125, top: 155, width: 830, height: 820, borderRadius: 46, background: '#292C36', border: `2px solid ${C.border}`, transform: `scale(${.86 + .14 * p})` }}>
      <Img src={assets.savepoint2d} style={{ width: 600, height: 580, objectFit: 'contain', position: 'absolute', left: 115, top: 65 }} />
      <div style={{ position: 'absolute', bottom: 80, left: 70, right: 70, display: 'flex', justifyContent: 'space-between', color: C.mint, fontSize: 28, fontWeight: 800 }}><span>COMMIT</span><span>BRANCH</span><span>HISTORY</span></div>
    </div>
    <div style={{ position: 'absolute', right: 120, top: 140, background: C.blurple, padding: '13px 24px', borderRadius: 14, fontSize: 30, fontWeight: 900 }}>LOCAL</div>
  </>;
}

function WarningGraphic({ local, text }) {
  const words = text.split(' ');
  return <div style={{ position: 'absolute', top: 330, left: 75, right: 75, display: 'flex', flexWrap: 'wrap', gap: '20px 28px', alignItems: 'center' }}>
    {words.map((word, i) => <span key={`${word}-${i}`} style={{ fontSize: 125, fontWeight: 900, letterSpacing: '-.07em', color: i === words.length - 1 ? C.red : C.text, transform: `translateY(${lerp(local - i * 5, [0, 16], [150, 0])}px)`, opacity: lerp(local - i * 5, [0, 10], [0, 1]) }}>{word}</span>)}
  </div>;
}

function Artwork({ scene, local }) {
  if (scene.shot === 'editor' || scene.shot === 'browser') return <ScreenRecording local={local} sceneIndex={scene.index} />;
  if (scene.shot === 'error-art') return <ErrorGraphic local={local} />;
  if (scene.shot === 'commit-track') return <CommitTrackGraphic scene={scene} local={local} />;
  if (scene.shot === 'savepoint') return <SavepointGraphic scene={scene} local={local} />;
  if (scene.shot === 'cloud') return <CloudGraphic local={local} />;
  if (scene.shot === 'local') return <LocalGraphic local={local} />;
  if (scene.shot === 'workflow') return <Workflow local={local} sceneIndex={scene.index} />;
  if (scene.shot === 'warning') return <WarningGraphic local={local} text={scene.text} />;
  switch (scene.visual) {
    case 'hook': return <div style={{ position: 'absolute', top: 170, left: 100, width: 880, height: 650, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 55 }}><div style={{ width: 580, height: 180, borderRadius: 30, background: '#373A45', display: 'grid', placeItems: 'center' }}><Img src={assets.gitLogo} style={{ width: 320, height: 135, objectFit: 'contain' }} /></div><div style={{ color: C.muted, fontSize: 87, fontWeight: 900 }}>≠</div><div style={{ width: 580, height: 180, borderRadius: 30, background: '#373A45', display: 'grid', placeItems: 'center' }}><Img src={assets.githubLogo} style={{ width: 395, height: 120, objectFit: 'contain' }} /></div></div>;
    case 'laptop': return <CodeWindow local={local} />;
    case 'prompt': return <><CodeWindow local={local} /><Panel style={{ position: 'absolute', top: 670, left: 130, width: 810, padding: 34, borderColor: C.blurple, color: C.text, fontSize: 38, fontWeight: 700 }}>✦  Coba ubah bagian login</Panel></>;
    case 'error': return <Asset src={assets.laptop} local={local} width={990} top={115} />;
    case 'lost': return <CodeWindow local={local} lost />;
    case 'git': return <><NodeTimeline local={local} mode="git" /><div style={{ position: 'absolute', top: 70, left: 110, color: C.blurple, fontSize: 230, fontWeight: 900 }}>git</div></>;
    case 'checkpoint': return <Asset src={assets.save} local={local} width={770} top={10} />;
    case 'timeline': return <NodeTimeline local={local} mode="timeline" />;
    case 'rollback': return <NodeTimeline local={local} mode="rollback" />;
    case 'savepoint': return <Asset src={assets.save} local={local} width={800} top={0} />;
    case 'cloud': return <><Asset src={assets.cloud} local={local} width={760} top={15} /><Img src={assets.githubLogo} style={{ position: 'absolute', width: 340, height: 95, objectFit: 'contain', left: 370, top: 720 }} /></>;
    case 'compare': return <Pair local={local} active={scene.text.startsWith('GitHub') ? 1 : 0} />;
    case 'local': return <><Asset src={assets.laptop} local={local} width={680} top={20} /><div style={{ position: 'absolute', top: 690, left: 95, right: 95, textAlign: 'center', color: C.mint, fontSize: 42, fontWeight: 800 }}>commit  ·  branch  ·  history</div></>;
    case 'push': return <><Asset src={assets.cloud} local={local} width={670} top={20} /><div style={{ position: 'absolute', top: 650, left: 150, right: 150, fontSize: 65, fontWeight: 900, textAlign: 'center', color: C.blurple, transform: `translateY(${-Math.sin(local / 16) * 18}px)` }}>↑ push</div></>;
    case 'workflow': return <Workflow local={local} sceneIndex={scene.index} />;
    case 'summary': return <Pair local={local} active={Math.floor(local / 75) % 2} />;
    case 'commitfirst': return <><Asset src={assets.save} local={local} width={720} top={0} /><Panel style={{ position: 'absolute', top: 690, left: 190, right: 190, color: C.mint, fontSize: 47, fontWeight: 900, textAlign: 'center', padding: 30, borderColor: C.mint }}>✓ commit dulu</Panel></>;
    case 'closing': return <Asset src={assets.save} local={local} width={790} top={0} />;
    default: return <CodeWindow local={local} />;
  }
}

function Scene({ scene, frame, width, height }) {
  const local = frame - scene.from;
  if (local < 0 || local >= scene.duration) return null;
  const isDemo = scene.shot === 'editor' || scene.shot === 'browser';
  const enter = lerp(local, [0, 17], [75, 0]);
  const exit = lerp(local, [scene.duration - 10, scene.duration], [0, -50]);
  const opacity = Math.min(1, lerp(local, [0, 12], [0, 1]), lerp(local, [scene.duration - 9, scene.duration], [1, 0]));
  return <AbsoluteFill style={{ color: C.text }}>
    <div style={{ position: 'absolute', top: 45, left: 0, width, height: 1190 }}><Artwork scene={scene} local={local} /></div>
    {scene.shot !== 'warning' && <div style={{ position: 'absolute', left: 86, right: 86, top: isDemo ? 1310 : 1220, minHeight: isDemo ? 240 : 360, display: 'flex', flexDirection: 'column', justifyContent: 'center', transform: `translateY(${enter + exit}px)`, opacity }}>
      <div style={{ width: 102, height: 12, borderRadius: 8, background: scene.visual === 'error' || scene.visual === 'rollback' ? C.red : C.blurple, marginBottom: isDemo ? 27 : 42 }} />
      <div style={{ fontSize: isDemo ? (scene.text.length > 25 ? 69 : 79) : scene.text.length > 27 ? 91 : 112, lineHeight: 1.03, fontWeight: 900, letterSpacing: '-.065em', overflowWrap: 'break-word', textShadow: '0 8px 28px #0009' }}>{scene.text}</div>
    </div>}
    {scene.audio && <Sequence from={scene.from} durationInFrames={scene.duration}><Audio src={staticFile(scene.audio.slice(1))} /></Sequence>}
  </AbsoluteFill>;
}

export function GitVsGithubVideo({ project }) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const timeline = sceneTimeline(project);
  const progress = frame / (timeline.at(-1).from + timeline.at(-1).duration);
  return <AbsoluteFill style={{ background: C.bg, fontFamily: 'Avenir Next, Arial, sans-serif', overflow: 'hidden' }}>
    <EditorialBackground frame={frame} theme={resolveTheme(project.theme)} />
    {timeline.map((scene) => <Scene key={scene.index} scene={scene} frame={frame} width={width} height={height} />)}
    <div style={{ position: 'absolute', bottom: 91, left: 86, right: 86, height: 10, background: C.border, borderRadius: 8 }}><div style={{ width: `${progress * 100}%`, height: '100%', borderRadius: 8, background: C.blurple }} /></div>
  </AbsoluteFill>;
}
