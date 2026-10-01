import { readdir, readFile, access } from 'node:fs/promises';
import path from 'node:path';
import { getVideoConfig } from '../src/project.js';

let failures = 0;
for (const file of (await readdir('contents')).filter((name) => name.endsWith('.json'))) {
  try {
    const project = JSON.parse(await readFile(path.join('contents', file), 'utf8'));
    const config = getVideoConfig(project);
    for (const scene of project.scenes) {
      if (scene.image) await access(path.join('public', scene.image.slice(1)));
      if (scene.audio) await access(path.join('public', scene.audio.slice(1)));
      for (const image of [scene.visual?.left?.image, scene.visual?.right?.image].filter(Boolean)) await access(path.join('public', image.slice(1)));
    }
    const counts = new Map();
    for (const scene of project.scenes) {
      if (project.template === 'git-vs-github' && !scene.shot) throw new Error('Setiap adegan Git vs GitHub perlu shot.');
      if (!scene.motion) throw new Error('Setiap adegan perlu motion.');
      counts.set(scene.motion, (counts.get(scene.motion) ?? 0) + 1);
    }
    const repeated = [...counts].filter(([, count]) => count > 3);
    if (repeated.length) throw new Error(`Motion dipakai lebih dari 3 kali: ${repeated.map(([name, count]) => `${name} (${count})`).join(', ')}`);
    if (project.audio) await access(path.join('public', project.audio.slice(1)));
    console.log(`✓ ${file}: ${project.scenes.length} adegan, ${(config.durationInFrames / config.fps).toFixed(1)} detik`);
  } catch (error) {
    failures++;
    console.error(`✗ ${file}: ${error.message}`);
  }
}
if (failures) process.exitCode = 1;
