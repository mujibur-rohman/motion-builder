import React from 'react';
import { AbsoluteFill } from 'remotion';

export const DISCORD_THEME = Object.freeze({
  background: '#1E1F22',
  surface: '#2B2D31',
  accent: '#5865F2',
  accentDark: '#3946C6',
  line: '#404249',
  text: '#F2F3F5',
  muted: '#B5BAC1',
  mint: '#43B581',
  red: '#F23F43',
  font: 'Avenir Next, Arial, sans-serif',
});

export function resolveTheme(theme = {}) {
  return { ...DISCORD_THEME, ...theme };
}

export function EditorialBackground({ frame, theme }) {
  const drift = Math.sin(frame / 100) * 5;
  return <AbsoluteFill style={{ background: theme.background, overflow: 'hidden' }}>
    <AbsoluteFill style={{
      background: `radial-gradient(ellipse at ${24 + drift}% 31%, ${theme.accent}24, transparent 47%), radial-gradient(ellipse at 75% 70%, ${theme.accentDark}18, transparent 43%)`,
    }} />
    <AbsoluteFill style={{
      backgroundImage: `linear-gradient(${theme.line} 1px, transparent 1px), linear-gradient(90deg, ${theme.line} 1px, transparent 1px)`,
      backgroundSize: '52px 52px',
      opacity: .16,
    }} />
  </AbsoluteFill>;
}
