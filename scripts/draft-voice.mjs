import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { spawn } from 'node:child_process';
import path from 'node:path';

const contentPath = process.argv[2] ?? 'contents/git-vs-github.json';
const run = async (command, args) => {
  const child = spawn(command, args, { stdio: ['ignore', 'pipe', 'pipe'] });
  const stdout = [];
  const stderr = [];
  child.stdout.on('data', (chunk) => stdout.push(chunk));
  child.stderr.on('data', (chunk) => stderr.push(chunk));
  const code = await new Promise((resolve, reject) => {
    child.on('error', reject);
    child.on('close', resolve);
  });
  if (code !== 0) throw new Error(`${command}: ${Buffer.concat(stderr).toString('utf8')}`);
  return Buffer.concat(stdout).toString('utf8');
};

if (process.platform !== 'darwin') {
  console.error('Voice draft ini memakai say/afconvert bawaan macOS.');
  process.exit(1);
}

try {
  const project = JSON.parse(await readFile(contentPath, 'utf8'));
  const slug = path.basename(contentPath, '.json');
  const outputDir = path.join('public', 'assets', slug, 'voice');
  await mkdir(outputDir, { recursive: true });
  for (const [index, scene] of project.scenes.entries()) {
    if (!scene.voiceText) continue;
    const number = String(index + 1).padStart(2, '0');
    const aiff = path.join(outputDir, `${number}.aiff`);
    const m4a = path.join(outputDir, `${number}.m4a`);
    await run('say', ['-v', 'Damayanti', '-r', '215', '-o', aiff, scene.voiceText]);
    await run('afconvert', ['-f', 'm4af', '-d', 'aac', aiff, m4a]);
    const info = await run('afinfo', [m4a]);
    const seconds = Number(info.match(/estimated duration:\s*([\d.]+) sec/)?.[1]);
    if (!Number.isFinite(seconds)) throw new Error(`Durasi audio tidak terbaca: ${m4a}`);
    scene.seconds = Math.max(2.4, Math.ceil((seconds + .38) * 10) / 10);
    scene.audio = `/${m4a.replaceAll(path.sep, '/').replace(/^public\//, '')}`;
    await rm(aiff);
    console.log(`${number}/${project.scenes.length}: ${seconds.toFixed(1)}s → ${scene.seconds.toFixed(1)}s`);
  }
  await writeFile(contentPath, `${JSON.stringify(project, null, 2)}\n`, 'utf8');
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
}
