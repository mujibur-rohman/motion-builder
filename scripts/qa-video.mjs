import { spawn } from 'node:child_process';

// A corrupt Chrome screenshot shows a different composition for one frame, then
// immediately returns to the previous picture. Compare each frame with its two
// neighbours at a small resolution so ordinary scene cuts do not trigger it.
export async function checkVideoFlicker(file) {
  const width = 90;
  const height = 160;
  const frameBytes = width * height;
  const ffmpeg = spawn('ffmpeg', [
    '-v', 'error', '-i', file,
    '-vf', `scale=${width}:${height},format=gray`,
    '-f', 'rawvideo', '-pix_fmt', 'gray', '-',
  ], { stdio: ['ignore', 'pipe', 'pipe'] });

  let pending = Buffer.alloc(0);
  let previous;
  let current;
  let index = 0;
  const suspicious = [];
  let errorText = '';
  ffmpeg.stderr.setEncoding('utf8');
  ffmpeg.stderr.on('data', (chunk) => { errorText += chunk; });

  for await (const chunk of ffmpeg.stdout) {
    pending = Buffer.concat([pending, chunk]);
    while (pending.length >= frameBytes) {
      const next = Buffer.from(pending.subarray(0, frameBytes));
      pending = pending.subarray(frameBytes);
      if (previous && current) {
        let deviation = 0;
        let neighbourDifference = 0;
        let brightnessChange = 0;
        for (let pixel = 0; pixel < frameBytes; pixel++) {
          deviation += Math.abs(current[pixel] - (previous[pixel] + next[pixel]) / 2);
          neighbourDifference += Math.abs(previous[pixel] - next[pixel]);
          brightnessChange += current[pixel] - (previous[pixel] + next[pixel]) / 2;
        }
        deviation /= frameBytes;
        neighbourDifference /= frameBytes;
        brightnessChange /= frameBytes;
        // A deliberate dip to black between scenes also differs from both
        // neighbours, but its average brightness falls rather than rising.
        if (deviation > 3 && neighbourDifference < 2.5 && brightnessChange > -1.5) {
          suspicious.push({ frame: index - 1, deviation: deviation.toFixed(2) });
        }
      }
      previous = current;
      current = next;
      index++;
    }
  }

  const exitCode = await new Promise((resolve, reject) => {
    ffmpeg.on('error', reject);
    ffmpeg.on('close', resolve);
  });
  if (exitCode !== 0 || pending.length) throw new Error(`Video QA gagal membaca frame: ${errorText.trim() || `ffmpeg ${exitCode}`}`);
  if (suspicious.length) {
    const examples = suspicious.slice(0, 12).map(({ frame, deviation }) => `${frame} (${deviation})`).join(', ');
    throw new Error(`${suspicious.length} frame berkedip terdeteksi: ${examples}${suspicious.length > 12 ? ', …' : ''}`);
  }
  return index;
}

if (process.argv[1] && new URL(`file://${process.argv[1]}`).href === import.meta.url) {
  const file = process.argv[2];
  if (!file) {
    console.error('Pemakaian: node scripts/qa-video.mjs <video.mp4>');
    process.exitCode = 1;
  } else {
    try {
      const frames = await checkVideoFlicker(file);
      console.log(`✓ Tidak ada frame berkedip dalam ${frames} frame: ${file}`);
    } catch (error) {
      console.error(`✗ ${error.message}`);
      process.exitCode = 1;
    }
  }
}
