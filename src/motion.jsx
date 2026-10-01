import React from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";
import { sceneTimeline } from "./project.js";
import { EditorialBackground, resolveTheme } from "./editorial-style.jsx";

const clamp = { extrapolateLeft: "clamp", extrapolateRight: "clamp" };
const tween = (frame, start, end, from, to) =>
  interpolate(frame, [start, end], [from, to], clamp);

function Kicker({ children, theme, size }) {
  return (
    <div
      style={{
        color: theme.accent,
        fontSize: size * 0.42,
        fontWeight: 900,
        letterSpacing: ".11em",
        textTransform: "uppercase",
        marginBottom: 30,
      }}
    >
      {children}
    </div>
  );
}

function Card({
  children,
  theme,
  frame,
  delay = 0,
  highlighted = false,
  style = {},
}) {
  return (
    <div
      style={{
        background: highlighted ? `${theme.accent}22` : theme.surface,
        border: `2px solid ${highlighted ? theme.accent : theme.line}`,
        borderRadius: 24,
        padding: "27px 31px",
        opacity: tween(frame, delay, delay + 14, 0, 1),
        transform: `translateY(${tween(frame, delay, delay + 22, 44, 0)}px)`,
        boxShadow: highlighted
          ? `0 0 45px ${theme.accent}14`
          : "0 12px 30px #0003",
        ...style,
      }}
    >
      {children}
    </div>
  );
}

function Statement({ scene, local, theme, size }) {
  const visual = scene.visual;
  const accent = visual.accentWord?.toLowerCase();
  const words = scene.text.split(/\s+/);
  return (
    <div
      style={{
        textAlign: "center",
        transform: `translateY(${tween(local, 0, 24, 45, 0)}px)`,
      }}
    >
      <Kicker theme={theme} size={size}>
        {visual.kicker ?? scene.label ?? "Pembuka"}
      </Kicker>
      <div
        style={{
          fontSize: size * 1.15,
          lineHeight: 1.08,
          fontWeight: 900,
          letterSpacing: "-.055em",
          overflowWrap: "break-word",
        }}
      >
        {words.map((word, index) => (
          <React.Fragment key={`${word}-${index}`}>
            {index ? " " : ""}
            <span
              style={{
                color:
                  word.toLowerCase().replace(/[^\p{L}\p{N}]/gu, "") === accent
                    ? theme[visual.accentColor] ?? theme.accent
                    : theme.text,
              }}
            >
              {word}
            </span>
          </React.Fragment>
        ))}
      </div>
      {visual.note && (
        <div
          style={{
            color: theme.muted,
            fontSize: size * 0.48,
            marginTop: 32,
            lineHeight: 1.35,
          }}
        >
          {visual.note}
        </div>
      )}
    </div>
  );
}

function Compare({ scene, local, theme, size }) {
  const visual = scene.visual;
  return (
    <div>
      <Kicker theme={theme} size={size}>
        {visual.kicker ?? scene.label ?? "Perbandingan"}
      </Kicker>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {[visual.left, visual.right].map((item, index) => (
          <Card
            key={index}
            theme={theme}
            frame={local}
            delay={index * 12}
            highlighted={index === (visual.active ?? 1)}
            style={{
              minHeight: 220,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            {item.image ? <Img src={staticFile(item.image.slice(1))} style={{ width: '100%', height: 85, objectFit: 'contain', objectPosition: 'left center', marginBottom: 20 }} /> : <div style={{ fontSize: size * 0.9, marginBottom: 20 }}>
              {item.icon ?? (index ? "✦" : "◈")}
            </div>}
            {!item.image && <div
              style={{ fontSize: size * 0.7, fontWeight: 900, lineHeight: 1.1 }}
            >
              {item.title}
            </div>}
            <div
              style={{
                fontSize: size * 0.37,
                color: theme.muted,
                marginTop: 12,
                lineHeight: 1.25,
              }}
            >
              {item.detail}
            </div>
          </Card>
        ))}
      </div>
      <div
        style={{
          fontSize: size * 0.72,
          fontWeight: 900,
          textAlign: "center",
          lineHeight: 1.12,
          marginTop: 42,
        }}
      >
        {scene.text}
      </div>
    </div>
  );
}

function Cards({ scene, local, theme, size }) {
  const visual = scene.visual;
  return (
    <div>
      <Kicker theme={theme} size={size}>
        {visual.kicker ?? scene.label ?? "Yang perlu dilihat"}
      </Kicker>
      <div
        style={{
          fontSize: size * 0.75,
          lineHeight: 1.13,
          fontWeight: 900,
          marginBottom: 32,
        }}
      >
        {scene.text}
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {visual.items.map((item, index) => (
          <Card
            key={index}
            theme={theme}
            frame={local}
            delay={index * 10}
            highlighted={item.highlighted}
            style={{ display: "flex", alignItems: "center", gap: 22 }}
          >
            <span
              style={{ fontSize: size * 0.6, width: 62, textAlign: "center" }}
            >
              {item.icon ?? String(index + 1).padStart(2, "0")}
            </span>
            <span>
              <span style={{ fontSize: size * 0.47, fontWeight: 850 }}>
                {item.title}
              </span>
              {item.detail && (
                <span
                  style={{
                    display: "block",
                    color: theme.muted,
                    fontSize: size * 0.31,
                    marginTop: 5,
                  }}
                >
                  {item.detail}
                </span>
              )}
            </span>
          </Card>
        ))}
      </div>
      {visual.takeaway && (
        <div
          style={{
            textAlign: "center",
            color: theme.mint,
            fontSize: size * 0.43,
            fontWeight: 800,
            marginTop: 32,
          }}
        >
          {visual.takeaway}
        </div>
      )}
    </div>
  );
}

function Terminal({ scene, local, theme, size }) {
  const visual = scene.visual;
  return (
    <div>
      <Kicker theme={theme} size={size}>
        {visual.kicker ?? scene.label ?? "Contoh nyata"}
      </Kicker>
      <div
        style={{
          fontSize: size * 0.7,
          fontWeight: 900,
          lineHeight: 1.14,
          marginBottom: 30,
        }}
      >
        {scene.text}
      </div>
      <div
        style={{
          border: `2px solid ${theme.line}`,
          borderRadius: 22,
          overflow: "hidden",
          background: "#181A1E",
          boxShadow: "0 22px 60px #0007",
        }}
      >
        <div
          style={{
            height: 54,
            background: theme.surface,
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 22px",
            color: theme.muted,
            fontSize: size * 0.25,
          }}
        >
          {["#F23F43", "#F0B232", "#43B581"].map((color) => (
            <span
              key={color}
              style={{
                width: 13,
                height: 13,
                borderRadius: "50%",
                background: color,
              }}
            />
          ))}
          <span style={{ marginLeft: 12 }}>{visual.window ?? "terminal"}</span>
        </div>
        <div
          style={{
            padding: 32,
            minHeight: 160,
            fontFamily: "SFMono-Regular, Menlo, monospace",
            fontSize: size * 0.36,
            lineHeight: 1.55,
          }}
        >
          {visual.lines.map((line, index) => (
            <div
              key={index}
              style={{
                opacity: index === 0 ? 1 : tween(local, index * 8, index * 8 + 8, 0, 1),
                color:
                  index === visual.lines.length - 1 ? theme.mint : theme.text,
                whiteSpace: "pre-wrap",
                overflowWrap: "anywhere",
              }}
            >
              {line}
            </div>
          ))}
        </div>
      </div>
      {visual.takeaway && (
        <div
          style={{
            fontSize: size * 0.39,
            color: theme.mint,
            textAlign: "center",
            fontWeight: 800,
            marginTop: 28,
          }}
        >
          {visual.takeaway}
        </div>
      )}
    </div>
  );
}

function Flow({ scene, local, theme, size }) {
  const visual = scene.visual;
  return (
    <div>
      <Kicker theme={theme} size={size}>
        {visual.kicker ?? scene.label ?? "Alurnya"}
      </Kicker>
      <div
        style={{
          fontSize: size * 0.73,
          fontWeight: 900,
          lineHeight: 1.12,
          marginBottom: 34,
        }}
      >
        {scene.text}
      </div>
      <div style={{ display: "flex", gap: 12, alignItems: "stretch" }}>
        {visual.steps.map((step, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div
                style={{
                  color: theme.accent,
                  alignSelf: "center",
                  fontSize: size * 0.55,
                }}
              >
                →
              </div>
            )}
            <Card
              theme={theme}
              frame={local}
              delay={index * 12}
              highlighted={index === visual.active}
              style={{
                flex: 1,
                minWidth: 0,
                padding: "27px 15px",
                textAlign: "center",
              }}
            >
              <div
                style={{
                  fontSize: size * 0.36,
                  color: theme.accent,
                  fontWeight: 900,
                  marginBottom: 13,
                }}
              >
                0{index + 1}
              </div>
              <div
                style={{
                  fontSize: size * 0.4,
                  fontWeight: 850,
                  lineHeight: 1.15,
                  overflowWrap: "break-word",
                }}
              >
                {step}
              </div>
            </Card>
          </React.Fragment>
        ))}
      </div>
      {visual.takeaway && (
        <div
          style={{
            color: theme.mint,
            fontSize: size * 0.4,
            fontWeight: 800,
            marginTop: 34,
            textAlign: "center",
          }}
        >
          {visual.takeaway}
        </div>
      )}
    </div>
  );
}

function Focus({ scene, local, theme, size }) {
  const visual = scene.visual;
  return (
    <div style={{ textAlign: "center" }}>
      <Kicker theme={theme} size={size}>
        {visual.kicker ?? scene.label ?? "Intinya"}
      </Kicker>
      <div
        style={{
          color: theme.accent,
          fontSize: size * 1.35,
          fontWeight: 950,
          letterSpacing: "-.07em",
          lineHeight: 1,
          transform: `scale(${tween(local, 0, 24, 0.72, 1)})`,
        }}
      >
        {visual.keyword}
      </div>
      <div
        style={{
          width: tween(local, 12, 40, 0, 220),
          height: 7,
          borderRadius: 7,
          background: theme.mint,
          margin: "30px auto",
        }}
      />
      <div style={{ fontSize: size * 0.73, fontWeight: 900, lineHeight: 1.15 }}>
        {scene.text}
      </div>
      {visual.note && (
        <div
          style={{ color: theme.muted, fontSize: size * 0.38, marginTop: 25 }}
        >
          {visual.note}
        </div>
      )}
    </div>
  );
}

function Timeline({ scene, local, theme, size }) {
  const visual = scene.visual;
  const reverse = scene.motion.includes('reverse');
  return <div>
    <Kicker theme={theme} size={size}>{visual.kicker ?? scene.label ?? 'TRACKING COMMIT'}</Kicker>
    <div style={{ fontSize: size * .75, fontWeight: 900, lineHeight: 1.12, marginBottom: 38 }}>{scene.text}</div>
    <div style={{ position: 'relative', paddingLeft: 58 }}>
      <div style={{ position: 'absolute', left: 20, top: 33, bottom: 35, width: 5, borderRadius: 6, background: theme.line }} />
      {visual.nodes.map((node, index) => {
        const broken = node.status === 'broken';
        const selected = index === visual.active;
        const color = broken ? theme.red : node.status === 'pending' ? theme.muted : selected ? theme.accent : theme.mint;
        const delay = (reverse ? visual.nodes.length - 1 - index : index) * 12;
        return <div key={index} style={{ position: 'relative', marginBottom: index === visual.nodes.length - 1 ? 0 : 18 }}>
          <div style={{ position: 'absolute', left: -56, top: 32, width: 40, height: 40, borderRadius: '50%', background: color, border: `7px solid ${theme.background}`, opacity: tween(local, delay, delay + 13, 0, 1) }} />
          <Card theme={theme} frame={local} delay={delay} highlighted={selected} style={{ borderColor: broken ? theme.red : selected ? theme.accent : theme.line, display: 'flex', alignItems: 'center', gap: 24 }}>
            <div style={{ color, fontSize: size * .42, fontWeight: 900, width: 70 }}>{broken ? '✕' : node.id ?? `0${index + 1}`}</div>
            <div><div style={{ fontSize: size * .48, fontWeight: 900, lineHeight: 1.08 }}>{node.title}</div>{node.detail && <div style={{ color: theme.muted, fontSize: size * .32, marginTop: 8 }}>{node.detail}</div>}</div>
          </Card>
        </div>;
      })}
    </div>
    {visual.takeaway && <div style={{ fontSize: size * .42, fontWeight: 850, color: theme.mint, marginTop: 32, textAlign: 'center' }}>{visual.takeaway}</div>}
  </div>;
}

function ImageScene({ scene, local, theme, size }) {
  return (
    <div style={{ textAlign: "center" }}>
      <Kicker theme={theme} size={size}>
        {scene.visual.kicker ?? scene.label ?? "Visual"}
      </Kicker>
      <Img
        src={staticFile(scene.image.slice(1))}
        style={{
          width: "100%",
          maxHeight: 580,
          objectFit: "contain",
          transform: `translateY(${tween(local, 0, 25, 35, 0)}px) scale(${tween(local, 0, 30, 0.86, 1)})`,
          filter: "drop-shadow(0 25px 35px #0006)",
        }}
      />
      <div
        style={{
          fontSize: size * 0.74,
          lineHeight: 1.13,
          fontWeight: 900,
          marginTop: 35,
        }}
      >
        {scene.text}
      </div>
    </div>
  );
}

function AuthDiagram({ scene, local, theme, size }) {
  const { mode } = scene.visual;
  const isToken = mode.startsWith('token');
  const fromServer = mode === 'session-create' || mode === 'token-issue';
  const packetX = tween(local, 15, 58, fromServer ? 69 : 31, fromServer ? 31 : 69);
  const packetOpacity = tween(local, 10, 20, 0, 1);
  const browserEnter = tween(local, 0, 22, -55, 0);
  const serverEnter = tween(local, 4, 26, 55, 0);
  const packetLabel = isToken ? 'TOKEN' : 'SESSION ID';

  return <div>
    <Kicker theme={theme} size={size}>{scene.visual.kicker}</Kicker>
    <div style={{ fontSize: size * .73, fontWeight: 900, lineHeight: 1.12, marginBottom: 22 }}>{scene.text}</div>
    <div style={{ position: 'relative', width: '100%', height: 455 }}>
      <div style={{ position: 'absolute', left: '29%', right: '25%', top: '47%', height: 5, background: theme.line, borderRadius: 4, opacity: tween(local, 12, 35, 0, 1) }} />
      <Img src={staticFile('assets/session-vs-token/login-browser.png')} style={{ position: 'absolute', width: '43%', height: 320, objectFit: 'contain', left: '-2%', top: 35, opacity: tween(local, 0, 16, 0, 1), transform: `translateX(${browserEnter}px) translateY(${Math.sin(local / 22) * 5}px)` }} />
      <Img src={staticFile('assets/session-vs-token/session-server.png')} style={{ position: 'absolute', width: '37%', height: 400, objectFit: 'contain', right: '-2%', top: 0, opacity: tween(local, 4, 20, 0, 1), transform: `translateX(${serverEnter}px) translateY(${Math.sin(local / 24 + 1) * 5}px)` }} />
      {isToken ? <Img src={staticFile('assets/session-vs-token/jwt-token.png')} style={{ position: 'absolute', width: 180, height: 125, objectFit: 'contain', top: 135, left: `${packetX}%`, opacity: packetOpacity, transform: 'translateX(-50%)', filter: `drop-shadow(0 8px 18px ${theme.accent}55)` }} /> : <div style={{ position: 'absolute', left: `${packetX}%`, top: 168, transform: 'translateX(-50%)', opacity: packetOpacity, padding: '13px 17px', borderRadius: 13, border: `2px solid ${theme.accent}`, background: theme.surface, color: theme.text, fontSize: size * .26, fontWeight: 900, whiteSpace: 'nowrap', boxShadow: `0 0 25px ${theme.accent}55` }}>{packetLabel}</div>}
      <div style={{ position: 'absolute', left: '7%', bottom: 12, color: theme.muted, fontSize: size * .32, fontWeight: 850 }}>CLIENT</div>
      <div style={{ position: 'absolute', right: '7%', bottom: 12, color: theme.muted, fontSize: size * .32, fontWeight: 850 }}>SERVER</div>
      {isToken && <div style={{ position: 'absolute', left: '38%', right: '33%', bottom: 10, color: theme.accent, fontSize: size * .27, fontWeight: 900, textAlign: 'center' }}>{packetLabel}</div>}
    </div>
    {scene.visual.takeaway && <div style={{ color: theme.mint, fontSize: size * .39, fontWeight: 800, textAlign: 'center', marginTop: 18 }}>{scene.visual.takeaway}</div>}
  </div>;
}

const visualComponents = {
  statement: Statement,
  compare: Compare,
  cards: Cards,
  terminal: Terminal,
  flow: Flow,
  focus: Focus,
  timeline: Timeline,
  image: ImageScene,
  'auth-diagram': AuthDiagram,
};

function Scene({ scene, frame, theme, size }) {
  const local = frame - scene.from;
  if (local < 0 || local >= scene.duration) return null;
  const Visual = visualComponents[scene.visual.type] ?? Statement;
  const enter = tween(local, 0, 24, 0, 1);
  const x = scene.motion.includes('slide-left') ? (1 - enter) * 90 : scene.motion.includes('slide-right') ? (enter - 1) * 90 : 0;
  const scale = scene.motion.includes('pop') || scene.motion.includes('zoom') ? .88 + .12 * enter : 1;
  return (
    <AbsoluteFill
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: theme.text,
        fontFamily: theme.font,
      }}
    >
      <div style={{ width: "84%", maxWidth: 1040, maxHeight: "83%", transform: `translateX(${x}px) scale(${scale})` }}>
        <Visual scene={scene} local={local} theme={theme} size={size} />
      </div>
      {scene.audio && <Sequence from={scene.from} durationInFrames={scene.duration}><Audio src={staticFile(scene.audio.slice(1))} /></Sequence>}
    </AbsoluteFill>
  );
}

export function MotionVideo({ project }) {
  const frame = useCurrentFrame();
  const { width, height } = useVideoConfig();
  const theme = resolveTheme(project.theme);
  const size = Math.min(
    78,
    Math.max(55, Math.min(width / 1080, height / 1920) * 78),
  );
  const timeline = sceneTimeline(project);
  const total = timeline.at(-1).from + timeline.at(-1).duration;
  return (
    <AbsoluteFill style={{ overflow: "hidden" }}>
      <EditorialBackground frame={frame} theme={theme} />
      {timeline.map((scene) => (
        <Scene
          key={scene.index}
          scene={scene}
          frame={frame}
          theme={theme}
          size={size}
        />
      ))}
      <div
        style={{
          position: "absolute",
          bottom: 65,
          left: "8%",
          right: "8%",
          height: 4,
          background: theme.line,
          opacity: 0.6,
        }}
      >
        <div
          style={{
            height: "100%",
            width: `${(frame / total) * 100}%`,
            background: theme.accent,
          }}
        />
      </div>
      {project.audio && <Audio src={staticFile(project.audio.slice(1))} />}
    </AbsoluteFill>
  );
}
