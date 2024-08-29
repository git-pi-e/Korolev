import { c as create_ssr_component, b as escape, d as add_attribute } from "./ssr.js";
import { b as base } from "./paths.js";
const Containr = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title, icon, bg, classes = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.icon === void 0 && $$bindings.icon && icon !== void 0) $$bindings.icon(icon);
  if ($$props.bg === void 0 && $$bindings.bg && bg !== void 0) $$bindings.bg(bg);
  if ($$props.classes === void 0 && $$bindings.classes && classes !== void 0) $$bindings.classes(classes);
  return `<article class="${"p-10 m-h-auto " + escape(classes, true)}"${add_attribute("bg", bg, 0)}><div class="l1 p-10 flex f-wt5"><span>${escape(title)}</span> ${icon !== "null" ? `<img size="ic" style="object-fit: contain;" src="${escape(base, true) + "/assets/icons/" + escape(icon, true) + ".svg"}" alt="">` : ``}</div> ${slots.body ? slots.body({}) : ``}</article>`;
});
export {
  Containr as C
};
