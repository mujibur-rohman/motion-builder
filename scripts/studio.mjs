import { readFile } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import { getVideoConfig } from '../src/project.js';

const contentPath = process.argv[2] ?? 'contents/example.json';
try {
  const project = JSON.parse(await readFile(contentPath, 'utf8'));
  getVideoConfig(project);
  const args = ['remotion', 'studio', 'src/index.jsx', `--props=${JSON.stringify({ project })}`, ...process.argv.slice(3)];
  const child = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', args, { stdio: 'inherit' });
  const exitCode = await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('close', resolve);
  });
  process.exitCode = exitCode ?? 1;
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
