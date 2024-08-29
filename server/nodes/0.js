import * as universal from '../entries/pages/_layout.js';

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_layout.svelte.js')).default;
export { universal };
export const universal_id = "src/routes/+layout.js";
export const imports = ["_app/immutable/nodes/0.CyZA8QKA.js","_app/immutable/chunks/scheduler.DzV7pw1l.js","_app/immutable/chunks/index.OuQUVrRW.js","_app/immutable/chunks/each.D6YF6ztN.js","_app/immutable/chunks/routes.DHnXxdEj.js"];
export const stylesheets = ["_app/immutable/assets/0.CSJ_uCwz.css"];
export const fonts = [];
