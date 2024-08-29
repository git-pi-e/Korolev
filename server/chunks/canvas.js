import { c as create_ssr_component, d as add_attribute } from "./ssr.js";
const Canvas = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { image, height, width, bg } = $$props;
  let canvas;
  if ($$props.image === void 0 && $$bindings.image && image !== void 0) $$bindings.image(image);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.bg === void 0 && $$bindings.bg && bg !== void 0) $$bindings.bg(bg);
  return `<canvas class="rx-max"${add_attribute("bg", bg, 0)}${add_attribute("this", canvas, 0)}></canvas>`;
});
export {
  Canvas as C
};
