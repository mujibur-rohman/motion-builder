import { readFile, mkdir, access } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { getVideoConfig } from '../src/project.js';
import { checkVideoFlicker } from './qa-video.mjs';

const contentPath = process.argv[2] ?? 'contents/example.json';
const renderOptions = process.argv.slice(3);
try {
  const concurrencyOptions = renderOptions.filter((option) => option === '--concurrency' || option === '-c' || option.startsWith('--concurrency='));
  if (concurrencyOptions.some((option) => option !== '--concurrency=1')) {
    throw new Error('Render proyek ini harus memakai --concurrency=1. Beberapa worker menyebabkan frame komposisi berkedip pada Chrome.');
  }
  const project = JSON.parse(await readFile(contentPath, 'utf8'));
  getVideoConfig(project);
  const composition = project.template === 'git-vs-github' ? 'GitVsGithubLegacy' : project.template === 'cross-app-tracking' ? 'CrossAppTracking' : project.template === 'cookie-story' ? 'BahasTuntasCookie' : project.template === 'url-story' ? 'StrukturUrl' : project.template === 'cookie-local-story' ? 'CookieVsLocalStorage' : project.template === 'concurrency-story' ? 'Concurrency' : project.template === 'sql-vs-nosql-story' ? 'SqlVsNosql' : 'Motion';
  const slug = path.basename(contentPath, '.json');
  const outputOption = renderOptions.find((option) => option.startsWith('--output='));
  const output = outputOption ? path.resolve(outputOption.slice('--output='.length)) : path.resolve('out', `${slug}.mp4`);
  await mkdir(path.dirname(output), { recursive: true });
  const macChrome = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
  const browserOption = renderOptions.some((option) => option.startsWith('--browser-executable'))
    ? []
    : await access(macChrome).then(() => [`--browser-executable=${macChrome}`], () => []);
  const stableRenderOptions = [
    ...(concurrencyOptions.length ? [] : ['--concurrency=1']),
    '--disallow-parallel-encoding',
    '--gl=swangle',
  ];
  const args = ['remotion', 'render', 'src/index.jsx', composition, ...(outputOption ? [] : [output]), `--props=${JSON.stringify({ project })}`, ...browserOption, ...stableRenderOptions, ...renderOptions];
  const child = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', args, { stdio: 'inherit' });
  const exitCode = await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('close', resolve);
  });
  if (exitCode !== 0) throw new Error(`Render gagal (kode ${exitCode}).`);
  const checkedFrames = await checkVideoFlicker(output);
  console.log(`QA video: ${checkedFrames} frame tanpa kedip.`);
  console.log(`Selesai: ${output}`);
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
