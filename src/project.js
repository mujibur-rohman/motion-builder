export const FPS = 30;
export const VISUAL_TYPES = ['statement', 'compare', 'cards', 'terminal', 'flow', 'focus', 'image', 'timeline', 'auth-diagram', 'tracking-story', 'cookie-story', 'url-story', 'cookie-local-story', 'concurrency-story', 'sql-nosql-story', 'id-story', 'normalization-story'];

export function validateProject(project) {
  const errors = [];
  if (!project || typeof project !== 'object') return ['File harus berisi object JSON.'];
  if (typeof project.title !== 'string' || !project.title.trim()) errors.push('title wajib diisi.');
  if (!Array.isArray(project.scenes) || project.scenes.length === 0) errors.push('scenes harus berisi minimal satu adegan.');
  for (const [index, scene] of (project.scenes ?? []).entries()) {
    const prefix = `scenes[${index}]`;
    if (typeof scene.text !== 'string' || !scene.text.trim()) errors.push(`${prefix}.text wajib diisi.`);
    if (typeof scene.seconds !== 'number' || !Number.isFinite(scene.seconds) || scene.seconds < 1) errors.push(`${prefix}.seconds harus angka minimal 1.`);
    if (scene.image && (typeof scene.image !== 'string' || !scene.image.startsWith('/'))) errors.push(`${prefix}.image harus path dari public/, diawali '/'.`);
    if (project.template !== 'git-vs-github') {
      const visual = scene.visual;
      if (!visual || typeof visual !== 'object' || !VISUAL_TYPES.includes(visual.type)) {
        errors.push(`${prefix}.visual.type wajib salah satu: ${VISUAL_TYPES.join(', ')}.`);
      } else {
        if (visual.type === 'compare' && (!visual.left?.title || !visual.right?.title)) errors.push(`${prefix}.visual butuh left.title dan right.title.`);
        if (visual.type === 'compare' && [visual.left?.image, visual.right?.image].some((image) => image && (typeof image !== 'string' || !image.startsWith('/')))) errors.push(`${prefix}.visual.left/right.image harus path dari public/.`);
        if (visual.type === 'cards' && (!Array.isArray(visual.items) || visual.items.length < 1 || visual.items.length > 4 || visual.items.some((item) => !item?.title))) errors.push(`${prefix}.visual.items butuh 1–4 kartu dengan title.`);
        if (visual.type === 'terminal' && (!Array.isArray(visual.lines) || visual.lines.length < 1 || visual.lines.some((line) => typeof line !== 'string'))) errors.push(`${prefix}.visual.lines harus berisi teks terminal.`);
        if (visual.type === 'flow' && (!Array.isArray(visual.steps) || visual.steps.length < 2 || visual.steps.length > 4 || visual.steps.some((step) => typeof step !== 'string' || !step.trim()))) errors.push(`${prefix}.visual.steps butuh 2–4 langkah.`);
        if (visual.type === 'timeline' && (!Array.isArray(visual.nodes) || visual.nodes.length < 2 || visual.nodes.length > 4 || visual.nodes.some((node) => !node?.title))) errors.push(`${prefix}.visual.nodes butuh 2–4 commit dengan title.`);
        if (visual.type === 'focus' && !visual.keyword) errors.push(`${prefix}.visual.keyword wajib diisi.`);
        if (visual.type === 'image' && !scene.image) errors.push(`${prefix}.image wajib untuk visual image.`);
        if (visual.type === 'auth-diagram' && !['session-create', 'session-request', 'token-issue', 'token-request'].includes(visual.mode)) errors.push(`${prefix}.visual.mode harus salah satu alur session/token.`);
        if (visual.type === 'tracking-story' && !['search', 'social-ad', 'microphone', 'cross-app', 'device-id', 'id-types', 'sdk', 'product-event', 'report', 'match', 'rank', 'result'].includes(visual.mode)) errors.push(`${prefix}.visual.mode tracking-story tidak dikenal.`);
        if (visual.type === 'cookie-story' && !['consent', 'accept', 'remember', 'cafe-new', 'cafe-return', 'analogy', 'login', 'issue', 'identity', 'request', 'verified', 'categories', 'essential', 'preference', 'analytics', 'advertising', 'privacy', 'cross-site', 'choices', 'nuance', 'ending'].includes(visual.mode)) errors.push(`${prefix}.visual.mode cookie-story tidak dikenal.`);
        if (visual.type === 'url-story' && !['hook', 'full-url', 'split', 'protocol', 'tls', 'subdomain', 'subexamples', 'domain', 'port', 'defaults', 'path', 'product', 'query', 'params', 'filter', 'fragment', 'scroll', 'summary', 'ending'].includes(visual.mode)) errors.push(`${prefix}.visual.mode url-story tidak dikenal.`);
        if (visual.type === 'cookie-local-story' && !['intro', 'cookie', 'cookie-definition', 'hotel', 'keycard', 'hotel-access', 'analogy', 'login', 'issue', 'request', 'recognized', 'password', 'local-intro', 'local-definition', 'no-auto', 'theme-switch', 'theme-save', 'theme-return', 'compare-intro', 'cookie-transfer', 'local-transfer', 'capacity-intro', 'cookie-size', 'local-size', 'expiry-intro', 'cookie-expiry', 'session-expiry', 'local-persist', 'cookie-final', 'local-final'].includes(visual.mode)) errors.push(`${prefix}.visual.mode cookie-local-story tidak dikenal.`);
        if (visual.type === 'id-story' && !['intro','number-id','uuid-id','question','auto-intro','auto-definition','sequence','simple','benefits','drawback','guess','url-100','url-101','not-insecure','security','distributed','collision','uuid-intro','uuid-definition','uuid-shape','uniqueness','different-servers','queue-analogy','queue-numbers','identity-analogy','distributed-fit','many-servers','auto-summary','uuid-summary'].includes(visual.mode)) errors.push(`${prefix}.visual.mode id-story tidak dikenal.`);
      }
    }
  }
  if (project.audio && (typeof project.audio !== 'string' || !project.audio.startsWith('/'))) errors.push('audio harus path dari public/, diawali "/".');
  return errors;
}

export function getVideoConfig(project) {
  const errors = validateProject(project);
  if (errors.length) throw new Error(errors.join('\n'));
  const ratio = project.ratio ?? '9:16';
  if (!['9:16', '16:9', '1:1'].includes(ratio)) throw new Error('ratio harus 9:16, 16:9, atau 1:1.');
  const dimensions = {
    '9:16': { width: 1080, height: 1920 },
    '16:9': { width: 1920, height: 1080 },
    '1:1': { width: 1080, height: 1080 },
  };
  return {
    ...dimensions[ratio],
    fps: FPS,
    durationInFrames: project.scenes.reduce((sum, scene) => sum + Math.round(scene.seconds * FPS), 0),
  };
}

export function sceneTimeline(project) {
  let from = 0;
  return project.scenes.map((scene, index) => {
    const duration = Math.round(scene.seconds * FPS);
    const item = { ...scene, index, from, duration };
    from += duration;
    return item;
  });
}
