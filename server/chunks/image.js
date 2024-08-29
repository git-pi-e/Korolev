import { c as create_ssr_component, b as escape, d as add_attribute } from "./ssr.js";
import "./slider.svelte_svelte_type_style_lang.js";
const css = {
  code: ".topRight.svelte-1c7twdb{top:5px;right:5px}.topLeft.svelte-1c7twdb{top:5px;left:5px}.bottomLeft.svelte-1c7twdb{bottom:5px;left:5px}.bottomRight.svelte-1c7twdb{bottom:5px;right:5px}",
  map: '{"version":3,"file":"image.svelte","sources":["image.svelte"],"sourcesContent":["<script>\\n  export let src,\\n    placements = { topRight: \\"\\", bottomRight: \\"\\", topLeft: \\"\\", bottomLeft: \\"\\" };\\n<\/script>\\n\\n<style>\\n  .topRight {\\n    top: 5px;\\n    right: 5px;\\n  }\\n  .topLeft {\\n    top: 5px;\\n    left: 5px;\\n  }\\n  .bottomLeft {\\n    bottom: 5px;\\n    left: 5px;\\n  }\\n  .bottomRight {\\n    bottom: 5px;\\n    right: 5px;\\n  }\\n</style>\\n\\n<div class=\\"lecture po-rel w-100\\">\\n  {#if placements.topRight}\\n    <div class=\\"topRight po-abs rx-5 p-5 blur\\">{placements.topRight}</div>\\n  {/if}\\n  {#if placements.topLeft}\\n    <div class=\\"topLeft po-abs rx-5 p-5 blur\\">{placements.topLeft}</div>\\n  {/if}\\n  {#if placements.bottomLeft}\\n    <div class=\\"bottomLeft po-abs rx-5 p-5 blur\\">{placements.bottomLeft}</div>\\n  {/if}\\n  {#if placements.bottomRight}\\n    <div class=\\"bottomRight po-abs rx-5 p-5 blur\\">{placements.bottomRight}</div>\\n  {/if}\\n  <img class=\\"w-100 rx-5\\" {src} alt=\\"\\" />\\n</div>\\n"],"names":[],"mappings":"AAME,wBAAU,CACR,GAAG,CAAE,GAAG,CACR,KAAK,CAAE,GACT,CACA,uBAAS,CACP,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GACR,CACA,0BAAY,CACV,MAAM,CAAE,GAAG,CACX,IAAI,CAAE,GACR,CACA,2BAAa,CACX,MAAM,CAAE,GAAG,CACX,KAAK,CAAE,GACT"}'
};
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { src, placements = {
    topRight: "",
    bottomRight: "",
    topLeft: "",
    bottomLeft: ""
  } } = $$props;
  if ($$props.src === void 0 && $$bindings.src && src !== void 0) $$bindings.src(src);
  if ($$props.placements === void 0 && $$bindings.placements && placements !== void 0) $$bindings.placements(placements);
  $$result.css.add(css);
  return `<div class="lecture po-rel w-100">${placements.topRight ? `<div class="topRight po-abs rx-5 p-5 blur svelte-1c7twdb">${escape(placements.topRight)}</div>` : ``} ${placements.topLeft ? `<div class="topLeft po-abs rx-5 p-5 blur svelte-1c7twdb">${escape(placements.topLeft)}</div>` : ``} ${placements.bottomLeft ? `<div class="bottomLeft po-abs rx-5 p-5 blur svelte-1c7twdb">${escape(placements.bottomLeft)}</div>` : ``} ${placements.bottomRight ? `<div class="bottomRight po-abs rx-5 p-5 blur svelte-1c7twdb">${escape(placements.bottomRight)}</div>` : ``} <img class="w-100 rx-5"${add_attribute("src", src, 0)} alt=""></div>`;
});
export {
  Image as I
};
