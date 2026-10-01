import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { validateProject } from '../src/project.js';

const [slug, scriptPath] = process.argv.slice(2);
if (!slug || !scriptPath || !/^[a-z0-9-]+$/.test(slug)) {
  console.error('Pakai: npm run new -- nama-konten path/ke/script.txt');
  process.exit(1);
}

try {
  const script = (await readFile(scriptPath, 'utf8')).trim();
  if (!script) throw new Error('Script kosong.');
  const chunks = script.split(/\n\s*\n/).flatMap((paragraph) => paragraph.split(/(?<=[.!?])\s+/)).map((line) => line.trim()).filter(Boolean);
  const scenes = chunks.map((line, index) => ({
    text: line.replace(/[.!]$/, ''),
    label: `Adegan ${String(index + 1).padStart(2, '0')}`,
    seconds: Math.max(2.5, Math.min(7, Math.ceil(line.split(/\s+/).length / 2.6 * 2) / 2)),
    motion: 'title-rise',
    visual: { type: 'statement', kicker: slug.replaceAll('-', ' ') },
  }));
  const project = { title: slug.replaceAll('-', ' '), ratio: '9:16', script, theme: { background: '#1E1F22', surface: '#2B2D31', accent: '#5865F2', accentDark: '#3946C6', line: '#404249', text: '#F2F3F5', font: 'Avenir Next, Arial, sans-serif' }, scenes };
  const errors = validateProject(project);
  if (errors.length) throw new Error(errors.join('\n'));
  const output = path.resolve('contents', `${slug}.json`);
  await mkdir(path.dirname(output), { recursive: true });
  await access(output).then(() => { throw new Error(`Sudah ada: ${output}`); }, (error) => { if (error.code !== 'ENOENT') throw error; });
  await writeFile(output, `${JSON.stringify(project, null, 2)}\n`, 'utf8');
  console.log(`Dibuat: ${output}\nIni storyboard awal. Sesuaikan visual tiap adegan (statement, compare, cards, terminal, flow, timeline, focus, image), konten visual, motion, dan durasi sebelum render.`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
