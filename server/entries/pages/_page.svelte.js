import { c as create_ssr_component, b as escape, v as validate_component, e as each, d as add_attribute } from "../../chunks/ssr.js";
import { C as Containr } from "../../chunks/slider.svelte_svelte_type_style_lang.js";
import { b as base } from "../../chunks/paths.js";
import { l as links } from "../../chunks/routes.js";
const miles = [
  {
    year: 2009,
    event: "Founded"
  },
  {
    year: 2015,
    event: "Affiliated to SEDS"
  },
  {
    year: 2016,
    event: "Founded Apeiro"
  },
  {
    year: 2017,
    event: "Project RT Starts"
  },
  {
    year: 2018,
    event: "Project Kratos Starts"
  },
  {
    year: 2020,
    event: "Project EINSat & Rocketry Starts"
  }
];
const data = {
  miles
};
const Logo = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { wd = 128 } = $$props;
  if ($$props.wd === void 0 && $$bindings.wd && wd !== void 0) $$bindings.wd(wd);
  return `<svg viewBox="-6 -8 1096 528" width="${escape(wd, true) + "px"}" font-size="100" font-family="Helvetica"><style>circle {
            stroke: #fff;
        }
    </style><defs><circle id="m" cx="256" cy="256" r="248" stroke-width="8" fill="#0000"></circle><clipPath id="eclipse"><use xlink:href="#m"></use></clipPath></defs><circle cx="256" cy="256" r="248" stroke-width="32" fill="#0000"></circle><g clip-path="url(#eclipse)"><circle cx="420" cy="256" r="300" fill="#fff"></circle><text y="290" x="160" fill="#000">SEDS</text></g><circle cx="512" cy="256" r="64" fill="#fff" style="mix-blend-mode: difference;"></circle><text y="290" x="595" fill="#fff">CELESTIA</text></svg>`;
});
const css$1 = {
  code: '@keyframes svelte-1fhyk54-legacy{to{opacity:1}}.legacy.svelte-1fhyk54.svelte-1fhyk54{opacity:0;animation:svelte-1fhyk54-legacy 1.5s ease-in forwards 3.5s}#container.svelte-1fhyk54.svelte-1fhyk54{--orange:#ffd480;top:50%;margin:auto}#container.svelte-1fhyk54 .rocket_c.svelte-1fhyk54{position:absolute;margin:auto;bottom:75px;left:0;right:0;width:36px;height:300px;background:linear-gradient(to right, #bbb, white, #f1f1f1);border-top:5px solid #000;border-bottom:5px solid #000;border-top-left-radius:2px;border-top-right-radius:2px;transform:translate(-100px, -200%) rotateZ(-25deg) scale(0.5);animation:svelte-1fhyk54-land 4s cubic-bezier(0.28, 0.8, 0.65, 0.87) forwards}#container.svelte-1fhyk54 .rocket_c .sec_pop.svelte-1fhyk54{position:absolute;top:10.5%;height:4px;width:4px;left:0;border-radius:30px;animation:sec_prop 3s linear 0.5s forwards}#container.svelte-1fhyk54 .rocket_c .ganch.svelte-1fhyk54{position:absolute;top:0.5%;height:4px}#container.svelte-1fhyk54 .rocket_c .ganch_1.svelte-1fhyk54{width:16px;margin:auto;left:0;right:0;border-bottom-left-radius:100px;border-bottom-right-radius:100px;background:#999;transform:rotateZ(-45deg);animation:ganch 4s linear forwards}#container.svelte-1fhyk54 .rocket_c .ganch_2.svelte-1fhyk54{width:16px;left:-16px;border-bottom-left-radius:150%;transform:rotateZ(6deg);background:#aaa;border-bottom:1px solid #555}#container.svelte-1fhyk54 .rocket_c .ganch_3.svelte-1fhyk54{width:16px;right:-16px;border-bottom-right-radius:150%;transform:rotateZ(-6deg);background:#aaa;border-bottom:1px solid #555}#container.svelte-1fhyk54 .rocket_c .text.svelte-1fhyk54{height:85px;top:45%}#container.svelte-1fhyk54 .rocket_c .text .us.svelte-1fhyk54{padding:2px;width:66%;margin:18px auto}#container.svelte-1fhyk54 .rocket_c .text .spacex.svelte-1fhyk54{color:#058;width:50%;font-size:0.8em;margin:auto;writing-mode:vertical-rl;text-orientation:upright}#container.svelte-1fhyk54 .rocket_c .leg.svelte-1fhyk54{position:absolute;background:#222;bottom:47.0588235294px;height:28px;border-radius:20px;transform-origin:bottom;transition:transform 1s cubic-bezier(0.52, 0.22, 0.89, 0.73), height 1s linear}#container.svelte-1fhyk54 .rocket_c .leg_1.svelte-1fhyk54{width:5px;left:-3px;animation:leg_m 2s linear forwards 1s, leg_1 2s cubic-bezier(0.27, 0.59, 0.78, 0.93) forwards 1s}#container.svelte-1fhyk54 .rocket_c .leg_2.svelte-1fhyk54{width:5px;right:-3px;animation:leg_m 2s linear forwards 1s, leg_2 2s cubic-bezier(0.27, 0.59, 0.78, 0.93) forwards 1s}#container.svelte-1fhyk54 .rocket_c .leg_3.svelte-1fhyk54{width:6px;margin:auto;left:0;right:0;animation:leg_m 2s linear forwards 1s, leg_3 2s cubic-bezier(0.27, 0.59, 0.78, 0.93) forwards 1s}#container.svelte-1fhyk54 .rocket_c .stand.svelte-1fhyk54{position:absolute;bottom:0;transform-origin:bottom;height:80px}#container.svelte-1fhyk54 .rocket_c .stand_1.svelte-1fhyk54{margin:auto;left:0;right:0;width:8px;border-radius:200% 200% 0 0;border-top-left-radius:100% 100%;border-top-right-radius:100% 100%;border:10px solid #fff;background:#fff;animation:stand_1 2s linear forwards 1s, backgrounder 2s linear forwards 1s}#container.svelte-1fhyk54 .rocket_c .stand_2.svelte-1fhyk54{width:8px;left:-5px;border-top-left-radius:100%;border-bottom-left-radius:80% 90%;background:#fff;animation:stand_2 2s linear forwards 1s, backgrounder 2s linear forwards 1s}#container.svelte-1fhyk54 .rocket_c .stand_2.svelte-1fhyk54:after{content:"";display:block;position:absolute;width:8px;height:8px;background:#000;bottom:-5px;border-radius:50%;left:0;right:0;margin:auto}#container.svelte-1fhyk54 .rocket_c .stand_3.svelte-1fhyk54{width:8px;right:-5px;border-top-right-radius:80% 90%;border-bottom-right-radius:80% 90%;background:#fff;animation:stand_3 2s linear forwards 1s, backgrounder 2s linear forwards 1s}#container.svelte-1fhyk54 .rocket_c .stand_3.svelte-1fhyk54:after{content:"";display:block;position:absolute;width:8px;height:8px;background:#000;bottom:-5px;border-radius:50%;left:0;right:0;margin:auto}#container.svelte-1fhyk54 .rocket_c .prop.svelte-1fhyk54{position:relative;top:90%;width:12px;height:20px;background:linear-gradient(to right, #222, #333, #222);border-radius:70% 70% 0 0}#container.svelte-1fhyk54 .rocket_c .prop.svelte-1fhyk54:after{content:"";display:inline-block;position:absolute;margin-left:24px;width:12px;height:20px;background:linear-gradient(to right, #222, #333, #222);border-radius:70% 70% 0 0}#container.svelte-1fhyk54 .rocket_c .prop.svelte-1fhyk54:before{content:"";display:inline-block;position:absolute;margin-left:12px;width:12px;height:20px;background:linear-gradient(to right, #191919, #222, #191919);border-radius:70% 70% 0 0}#container.svelte-1fhyk54 .platform.svelte-1fhyk54{position:absolute;display:block;bottom:20px;width:60%;height:20px;margin:auto;left:0;right:0;background:#444;animation:plat_burning 2s linear forwards 1.5s}@keyframes svelte-1fhyk54-land{100%{transform:translateY(0%)}}.boost.svelte-1fhyk54.svelte-1fhyk54{position:relative;width:100%;transform:rotateZ(170deg) translateX(-10px);top:90.5%;animation:fix_flame 2s ease-out forwards 1s}.flame.svelte-1fhyk54.svelte-1fhyk54{width:18px;height:80px;margin:0px auto;position:relative;animation:move 0.5s, move-left 3s, scaledown 2s ease forwards 2s;transform-origin:50% 90%}.flame.svelte-1fhyk54 .top.svelte-1fhyk54{width:16px;height:100%;position:absolute;top:0;left:0;background:white;border-top-left-radius:500%;border-bottom-left-radius:100px;border-top-right-radius:500%;border-bottom-right-radius:20px;transform:skewY(-10deg);box-shadow:0 0px 0px 3px white, 0 -20px 1px 4px white, 0 -25px 2px 3px #ffd9b3, 0 -30px 5px 4px #ffd9b3, 0 0px 150px 15px #ffd9b3, 0 -10px 2px 4px white, 0 -5px 3px 3px white;animation:flame-up 1s infinite}@media(max-width: 400px){#container.svelte-1fhyk54.svelte-1fhyk54{transform:scale(0.8) translateX(-5%)}}',
  map: '{"version":3,"file":"rocket.svelte","sources":["rocket.svelte"],"sourcesContent":["<script>\\n  import { base } from \\"$app/paths\\";\\n<\/script>\\n\\n<div id=\\"container\\" size=\\"max\\" class=\\"po-rel\\" bg=\\"0000\\" style=\\"display:none;\\">\\n  <img\\n    src=\\"{base}/assets/legacy.svg\\"\\n    class=\\"po-abs legacy\\"\\n    size=\\"max\\"\\n    alt=\\"Legacy\\"\\n  />\\n  <div class=\\"rocket_c\\">\\n    <img\\n      class=\\"us rx-50 m-7\\"\\n      src=\\"{base}/assets/logo-sq.png\\"\\n      size=\\"min\\"\\n      bg=\\"000\\"\\n      alt=\\"Mini Logo\\"\\n    />\\n    <div class=\\"ganch ganch_1\\" />\\n    <div class=\\"ganch ganch_2\\" />\\n    <div class=\\"ganch ganch_3\\" />\\n    <div class=\\"sec_pop\\" />\\n    <div class=\\"text po-abs tx-c w-100\\">\\n      <p class=\\"spacex\\">CELESTIA</p>\\n    </div>\\n    <div class=\\"prop\\" />\\n\\n    <div class=\\"boost\\">\\n      <div class=\\"flame\\">\\n        <div class=\\"top\\" />\\n      </div>\\n    </div>\\n\\n    <div class=\\"leg leg_1\\" />\\n    <div class=\\"leg leg_2\\" />\\n    <div class=\\"leg leg_3\\" />\\n\\n    <div class=\\"stand stand_1\\" />\\n    <div class=\\"stand stand_2\\" />\\n    <div class=\\"stand stand_3\\" />\\n  </div>\\n  <div class=\\"smoke\\" />\\n  <div class=\\"platform\\" />\\n</div>\\n\\n<style type=\\"text/scss\\" lang=\\"scss\\">@keyframes legacy {\\n  to {\\n    opacity: 1;\\n  }\\n}\\n.legacy {\\n  opacity: 0;\\n  animation: legacy 1.5s ease-in forwards 3.5s;\\n}\\n\\n#container {\\n  --orange: #ffd480;\\n  top: 50%;\\n  margin: auto;\\n}\\n#container .rocket_c {\\n  position: absolute;\\n  margin: auto;\\n  bottom: 75px;\\n  left: 0;\\n  right: 0;\\n  width: 36px;\\n  height: 300px;\\n  background: linear-gradient(to right, #bbb, white, #f1f1f1);\\n  border-top: 5px solid #000;\\n  border-bottom: 5px solid #000;\\n  border-top-left-radius: 2px;\\n  border-top-right-radius: 2px;\\n  transform: translate(-100px, -200%) rotateZ(-25deg) scale(0.5);\\n  animation: land 4s cubic-bezier(0.28, 0.8, 0.65, 0.87) forwards;\\n}\\n#container .rocket_c .sec_pop {\\n  position: absolute;\\n  top: 10.5%;\\n  height: 4px;\\n  width: 4px;\\n  left: 0;\\n  border-radius: 30px;\\n  animation: sec_prop 3s linear 0.5s forwards;\\n}\\n#container .rocket_c .ganch {\\n  position: absolute;\\n  top: 0.5%;\\n  height: 4px;\\n}\\n#container .rocket_c .ganch_1 {\\n  width: 16px;\\n  margin: auto;\\n  left: 0;\\n  right: 0;\\n  border-bottom-left-radius: 100px;\\n  border-bottom-right-radius: 100px;\\n  background: #999;\\n  transform: rotateZ(-45deg);\\n  animation: ganch 4s linear forwards;\\n}\\n#container .rocket_c .ganch_2 {\\n  width: 16px;\\n  left: -16px;\\n  border-bottom-left-radius: 150%;\\n  transform: rotateZ(6deg);\\n  background: #aaa;\\n  border-bottom: 1px solid #555;\\n}\\n#container .rocket_c .ganch_3 {\\n  width: 16px;\\n  right: -16px;\\n  border-bottom-right-radius: 150%;\\n  transform: rotateZ(-6deg);\\n  background: #aaa;\\n  border-bottom: 1px solid #555;\\n}\\n#container .rocket_c .text {\\n  height: 85px;\\n  top: 45%;\\n}\\n#container .rocket_c .text .us {\\n  padding: 2px;\\n  width: 66%;\\n  margin: 18px auto;\\n}\\n#container .rocket_c .text .spacex {\\n  color: #058;\\n  width: 50%;\\n  font-size: 0.8em;\\n  margin: auto;\\n  writing-mode: vertical-rl;\\n  text-orientation: upright;\\n}\\n#container .rocket_c .leg {\\n  position: absolute;\\n  background: #222;\\n  bottom: 47.0588235294px;\\n  height: 28px;\\n  border-radius: 20px;\\n  transform-origin: bottom;\\n  transition: transform 1s cubic-bezier(0.52, 0.22, 0.89, 0.73), height 1s linear;\\n}\\n#container .rocket_c .leg_1 {\\n  width: 5px;\\n  left: -3px;\\n  animation: leg_m 2s linear forwards 1s, leg_1 2s cubic-bezier(0.27, 0.59, 0.78, 0.93) forwards 1s;\\n}\\n#container .rocket_c .leg_2 {\\n  width: 5px;\\n  right: -3px;\\n  animation: leg_m 2s linear forwards 1s, leg_2 2s cubic-bezier(0.27, 0.59, 0.78, 0.93) forwards 1s;\\n}\\n#container .rocket_c .leg_3 {\\n  width: 6px;\\n  margin: auto;\\n  left: 0;\\n  right: 0;\\n  animation: leg_m 2s linear forwards 1s, leg_3 2s cubic-bezier(0.27, 0.59, 0.78, 0.93) forwards 1s;\\n}\\n#container .rocket_c .stand {\\n  position: absolute;\\n  bottom: 0;\\n  transform-origin: bottom;\\n  height: 80px;\\n}\\n#container .rocket_c .stand_1 {\\n  margin: auto;\\n  left: 0;\\n  right: 0;\\n  width: 8px;\\n  border-radius: 200% 200% 0 0;\\n  border-top-left-radius: 100% 100%;\\n  border-top-right-radius: 100% 100%;\\n  border: 10px solid #fff;\\n  background: #fff;\\n  animation: stand_1 2s linear forwards 1s, backgrounder 2s linear forwards 1s;\\n}\\n#container .rocket_c .stand_2 {\\n  width: 8px;\\n  left: -5px;\\n  border-top-left-radius: 100%;\\n  border-bottom-left-radius: 80% 90%;\\n  background: #fff;\\n  animation: stand_2 2s linear forwards 1s, backgrounder 2s linear forwards 1s;\\n}\\n#container .rocket_c .stand_2:after {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  width: 8px;\\n  height: 8px;\\n  background: #000;\\n  bottom: -5px;\\n  border-radius: 50%;\\n  left: 0;\\n  right: 0;\\n  margin: auto;\\n}\\n#container .rocket_c .stand_3 {\\n  width: 8px;\\n  right: -5px;\\n  border-top-right-radius: 80% 90%;\\n  border-bottom-right-radius: 80% 90%;\\n  background: #fff;\\n  animation: stand_3 2s linear forwards 1s, backgrounder 2s linear forwards 1s;\\n}\\n#container .rocket_c .stand_3:after {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  width: 8px;\\n  height: 8px;\\n  background: #000;\\n  bottom: -5px;\\n  border-radius: 50%;\\n  left: 0;\\n  right: 0;\\n  margin: auto;\\n}\\n#container .rocket_c .prop {\\n  position: relative;\\n  top: 90%;\\n  width: 12px;\\n  height: 20px;\\n  background: linear-gradient(to right, #222, #333, #222);\\n  border-radius: 70% 70% 0 0;\\n}\\n#container .rocket_c .prop:after {\\n  content: \\"\\";\\n  display: inline-block;\\n  position: absolute;\\n  margin-left: 24px;\\n  width: 12px;\\n  height: 20px;\\n  background: linear-gradient(to right, #222, #333, #222);\\n  border-radius: 70% 70% 0 0;\\n}\\n#container .rocket_c .prop:before {\\n  content: \\"\\";\\n  display: inline-block;\\n  position: absolute;\\n  margin-left: 12px;\\n  width: 12px;\\n  height: 20px;\\n  background: linear-gradient(to right, #191919, #222, #191919);\\n  border-radius: 70% 70% 0 0;\\n}\\n#container .platform {\\n  position: absolute;\\n  display: block;\\n  bottom: 20px;\\n  width: 60%;\\n  height: 20px;\\n  margin: auto;\\n  left: 0;\\n  right: 0;\\n  background: #444;\\n  animation: plat_burning 2s linear forwards 1.5s;\\n}\\n\\n@keyframes land {\\n  100% {\\n    transform: translateY(0%);\\n  }\\n}\\n.boost {\\n  position: relative;\\n  width: 100%;\\n  transform: rotateZ(170deg) translateX(-10px);\\n  top: 90.5%;\\n  animation: fix_flame 2s ease-out forwards 1s;\\n}\\n\\n.flame {\\n  width: 18px;\\n  height: 80px;\\n  margin: 0px auto;\\n  position: relative;\\n  animation: move 0.5s, move-left 3s, scaledown 2s ease forwards 2s;\\n  transform-origin: 50% 90%;\\n}\\n.flame .top {\\n  width: 16px;\\n  height: 100%;\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  background: white;\\n  border-top-left-radius: 500%;\\n  border-bottom-left-radius: 100px;\\n  border-top-right-radius: 500%;\\n  border-bottom-right-radius: 20px;\\n  transform: skewY(-10deg);\\n  box-shadow: 0 0px 0px 3px white, 0 -20px 1px 4px white, 0 -25px 2px 3px #ffd9b3, 0 -30px 5px 4px #ffd9b3, 0 0px 150px 15px #ffd9b3, 0 -10px 2px 4px white, 0 -5px 3px 3px white;\\n  animation: flame-up 1s infinite;\\n}\\n\\n@media (max-width: 400px) {\\n  #container {\\n    transform: scale(0.8) translateX(-5%);\\n  }\\n}</style>\\n"],"names":[],"mappings":"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"}'
};
const Rocket = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div id="container" size="max" class="po-rel svelte-1fhyk54" bg="0000" style="display:none;" data-svelte-h="svelte-2s58dd"><img src="${escape(base, true) + "/assets/legacy.svg"}" class="po-abs legacy svelte-1fhyk54" size="max" alt="Legacy"> <div class="rocket_c svelte-1fhyk54"><img class="us rx-50 m-7 svelte-1fhyk54" src="${escape(base, true) + "/assets/logo-sq.png"}" size="min" bg="000" alt="Mini Logo"> <div class="ganch ganch_1 svelte-1fhyk54"></div> <div class="ganch ganch_2 svelte-1fhyk54"></div> <div class="ganch ganch_3 svelte-1fhyk54"></div> <div class="sec_pop svelte-1fhyk54"></div> <div class="text po-abs tx-c w-100 svelte-1fhyk54"><p class="spacex svelte-1fhyk54">CELESTIA</p></div> <div class="prop svelte-1fhyk54"></div> <div class="boost svelte-1fhyk54"><div class="flame svelte-1fhyk54"><div class="top svelte-1fhyk54"></div></div></div> <div class="leg leg_1 svelte-1fhyk54"></div> <div class="leg leg_2 svelte-1fhyk54"></div> <div class="leg leg_3 svelte-1fhyk54"></div> <div class="stand stand_1 svelte-1fhyk54"></div> <div class="stand stand_2 svelte-1fhyk54"></div> <div class="stand stand_3 svelte-1fhyk54"></div></div> <div class="smoke"></div> <div class="platform svelte-1fhyk54"></div> </div>`;
});
const css = {
  code: ".logo.svelte-fue50r{opacity:0;transform:translateY(40vh) scale(1);--offset:calc(2 * (50% - 100px));padding:10px calc(50% - 100px);animation:logopen 2s ease forwards}.welc.svelte-fue50r{align-items:center;top:0;opacity:0;font-size:3em;animation:welcs 2s ease forwards}.darr.svelte-fue50r{bottom:5px;font-size:4em;animation:darr 2s ease forwards;transform:translateY(-20vh);opacity:0}article.svelte-fue50r{margin:20px auto}.milestones.svelte-fue50r{font-size:24px;height:400px;overflow-y:scroll}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\timport data from '$lib/data/home';\\n\\timport Logo from '$lib/components/micro/logo.svelte';\\n\\timport { Containr } from '$lib/shared';\\n\\timport Rocket from '$lib/components/macro/rocket.svelte';\\n\\timport { onMount } from 'svelte';\\n\\n\\timport { base } from '$app/paths';\\n\\n\\timport links from '$lib/data/routes.json';\\n\\n\\tonMount(() => {\\n\\t\\tconst target = document.querySelector('#rocket');\\n\\t\\tlet handleIntersection = (entries) =>\\n\\t\\t\\tentries.map((entry) => {\\n\\t\\t\\t\\tif (entry.isIntersecting) entry.target.childNodes[0].classList.add('display');\\n\\t\\t\\t});\\n\\t\\tconst observer = new IntersectionObserver(handleIntersection);\\n\\t\\tobserver.observe(target);\\n\\t\\treturn 0;\\n\\t});\\n<\/script>\\n\\n<title>Home | SEDS Celestia</title>\\n<celestia-page class=\\"p-0 m-0\\">\\n\\t<div class=\\"section\\">\\n\\t\\t<div class=\\"image-container p-0 m-0 w-100 po-rel\\" style=\\"height:100vh;\\">\\n\\t\\t\\t<div class=\\"z-0 po-abs w-gen logo\\">\\n\\t\\t\\t\\t<Logo wd=\\"200\\" />\\n\\t\\t\\t</div>\\n\\t\\t\\t<img\\n\\t\\t\\t\\tclass=\\"m-0 w-100 h-100\\"\\n\\t\\t\\t\\tsrc=\\"https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pillars_of_creation.jpg\\"\\n\\t\\t\\t\\talt=\\"\\"\\n\\t\\t\\t/>\\n\\t\\t</div>\\n\\t\\t<div\\n\\t\\t\\tclass=\\"p-20 po-abs flex jtx-ct welc\\"\\n\\t\\t\\tbg=\\"0008\\"\\n\\t\\t\\tstyle=\\"height:calc(100% - 40px);width:calc(100% - 40px)\\"\\n\\t\\t>\\n\\t\\t\\tWelcome to SEDS Celestia\\n\\t\\t</div>\\n\\t\\t<div class=\\"po-abs w-100 flex jtx-ct darr\\">&darr;</div>\\n\\t</div>\\n\\t<section class=\\"adaptive\\">\\n\\t\\t<article class=\\"flex jtx-ar\\">\\n\\t\\t\\t<a href=\\"/projects\\">\\n\\t\\t\\t\\t<button class=\\"btn-std\\">Projects</button>\\n\\t\\t\\t</a>\\n\\t\\t\\t<a href=\\"http://blog.sedscelestia.org\\">\\n\\t\\t\\t\\t<button class=\\"btn-std\\">Blog</button>\\n\\t\\t\\t</a>\\n\\t\\t</article>\\n\\n\\t\\t<div id=\\"rocket\\" style=\\"min-height:100px;\\">\\n\\t\\t\\t<Rocket />\\n\\t\\t</div>\\n\\t\\t<Containr title=\\"Through the Telescope\\" icon=\\"clock\\" bg=\\"e66-c26\\">\\n\\t\\t\\t<article class=\\"flex-col p-10 milestones rx-5\\" slot=\\"body\\">\\n\\t\\t\\t\\t{#each data.miles.reverse() as event}\\n\\t\\t\\t\\t\\t<div class=\\"tx-c m-10 p-10\\" style=\\"white-space: nowrap;\\">\\n\\t\\t\\t\\t\\t\\t<div class=\\"p-10\\">{event.event}</div>\\n\\t\\t\\t\\t\\t\\t<div class=\\"po-rel\\">\\n\\t\\t\\t\\t\\t\\t\\t<li class=\\"p-0 m-0 po-abs\\" style=\\"top:-0.66em;left:calc(50% - 5px);font-size:48px;\\" />\\n\\t\\t\\t\\t\\t\\t\\t<hr />\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t<div class=\\"p-10\\">{event.year}</div>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</article>\\n\\t\\t</Containr>\\n\\t\\t<Containr title=\\"Connect With Us\\" icon=\\"heart\\" bg=\\"66e-37f\\">\\n\\t\\t\\t<article class=\\"p-10 flex jtx-ev\\" slot=\\"body\\">\\n\\t\\t\\t\\t<a target=\\"_blank\\" href={links.content.yt}>\\n\\t\\t\\t\\t\\t<img size=\\"ic-lg\\" src=\\"{base}/assets/icons/youtube.svg\\" alt=\\"Youtube\\" />\\n\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t<a target=\\"_blank\\" href={links.social.fb}>\\n\\t\\t\\t\\t\\t<img size=\\"ic-lg\\" src=\\"{base}/assets/icons/facebook.svg\\" alt=\\"Facebook\\" />\\n\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t<a target=\\"_blank\\" href={links.social.ig}>\\n\\t\\t\\t\\t\\t<img size=\\"ic-lg\\" src=\\"{base}/assets/icons/insta.svg\\" alt=\\"Instagram\\" />\\n\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t<a target=\\"_blank\\" href={links.social.tw}>\\n\\t\\t\\t\\t\\t<img size=\\"ic-lg\\" src=\\"{base}/assets/icons/twitter.svg\\" alt=\\"Twitter\\" />\\n\\t\\t\\t\\t</a>\\n\\t\\t\\t\\t<a target=\\"_blank\\" href={links.social.spo}>\\n\\t\\t\\t\\t\\t<img size=\\"ic-lg\\" src=\\"{base}/assets/icons/spotify.svg\\" alt=\\"Spotify\\" />\\n\\t\\t\\t\\t</a>\\n\\t\\t\\t</article>\\n\\t\\t</Containr>\\n\\t</section>\\n</celestia-page>\\n\\n<style type=\\"text/scss\\" lang=\\"scss\\">.logo {\\n  opacity: 0;\\n  transform: translateY(40vh) scale(1);\\n  --offset: calc(2 * (50% - 100px));\\n  padding: 10px calc(50% - 100px);\\n  animation: logopen 2s ease forwards;\\n}\\n\\n.welc {\\n  align-items: center;\\n  top: 0;\\n  opacity: 0;\\n  font-size: 3em;\\n  animation: welcs 2s ease forwards;\\n}\\n\\n.darr {\\n  bottom: 5px;\\n  font-size: 4em;\\n  animation: darr 2s ease forwards;\\n  transform: translateY(-20vh);\\n  opacity: 0;\\n}\\n\\narticle {\\n  margin: 20px auto;\\n}\\n\\n.milestones {\\n  font-size: 24px;\\n  height: 400px;\\n  overflow-y: scroll;\\n}</style>\\n"],"names":[],"mappings":"AA8FoC,mBAAM,CACxC,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,WAAW,IAAI,CAAC,CAAC,MAAM,CAAC,CAAC,CACpC,QAAQ,CAAE,uBAAuB,CACjC,OAAO,CAAE,IAAI,CAAC,KAAK,GAAG,CAAC,CAAC,CAAC,KAAK,CAAC,CAC/B,SAAS,CAAE,OAAO,CAAC,EAAE,CAAC,IAAI,CAAC,QAC7B,CAEA,mBAAM,CACJ,WAAW,CAAE,MAAM,CACnB,GAAG,CAAE,CAAC,CACN,OAAO,CAAE,CAAC,CACV,SAAS,CAAE,GAAG,CACd,SAAS,CAAE,KAAK,CAAC,EAAE,CAAC,IAAI,CAAC,QAC3B,CAEA,mBAAM,CACJ,MAAM,CAAE,GAAG,CACX,SAAS,CAAE,GAAG,CACd,SAAS,CAAE,IAAI,CAAC,EAAE,CAAC,IAAI,CAAC,QAAQ,CAChC,SAAS,CAAE,WAAW,KAAK,CAAC,CAC5B,OAAO,CAAE,CACX,CAEA,qBAAQ,CACN,MAAM,CAAE,IAAI,CAAC,IACf,CAEA,yBAAY,CACV,SAAS,CAAE,IAAI,CACf,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,MACd"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<title data-svelte-h="svelte-mgek3a">Home | SEDS Celestia</title> <celestia-page class="p-0 m-0"><div class="section"><div class="image-container p-0 m-0 w-100 po-rel" style="height:100vh;"><div class="z-0 po-abs w-gen logo svelte-fue50r">${validate_component(Logo, "Logo").$$render($$result, { wd: "200" }, {}, {})}</div> <img class="m-0 w-100 h-100" src="https://www.nasa.gov/sites/default/files/styles/full_width_feature/public/thumbnails/image/pillars_of_creation.jpg" alt=""></div> <div class="p-20 po-abs flex jtx-ct welc svelte-fue50r" bg="0008" style="height:calc(100% - 40px);width:calc(100% - 40px)" data-svelte-h="svelte-1x12ouk">Welcome to SEDS Celestia</div> <div class="po-abs w-100 flex jtx-ct darr svelte-fue50r" data-svelte-h="svelte-15e7w0a">↓</div></div> <section class="adaptive"><article class="flex jtx-ar svelte-fue50r" data-svelte-h="svelte-11ox3yk"><a href="/projects"><button class="btn-std">Projects</button></a> <a href="http://blog.sedscelestia.org"><button class="btn-std">Blog</button></a></article> <div id="rocket" style="min-height:100px;">${validate_component(Rocket, "Rocket").$$render($$result, {}, {}, {})}</div> ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Through the Telescope",
      icon: "clock",
      bg: "e66-c26"
    },
    {},
    {
      body: () => {
        return `<article class="flex-col p-10 milestones rx-5 svelte-fue50r" slot="body">${each(data.miles.reverse(), (event) => {
          return `<div class="tx-c m-10 p-10" style="white-space: nowrap;"><div class="p-10">${escape(event.event)}</div> <div class="po-rel" data-svelte-h="svelte-5m3po"><li class="p-0 m-0 po-abs" style="top:-0.66em;left:calc(50% - 5px);font-size:48px;"></li> <hr></div> <div class="p-10">${escape(event.year)}</div> </div>`;
        })}</article>`;
      }
    }
  )} ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Connect With Us",
      icon: "heart",
      bg: "66e-37f"
    },
    {},
    {
      body: () => {
        return `<article class="p-10 flex jtx-ev svelte-fue50r" slot="body" data-svelte-h="svelte-1xx8ng"><a target="_blank"${add_attribute("href", links.content.yt, 0)}><img size="ic-lg" src="${escape(base, true) + "/assets/icons/youtube.svg"}" alt="Youtube"></a> <a target="_blank"${add_attribute("href", links.social.fb, 0)}><img size="ic-lg" src="${escape(base, true) + "/assets/icons/facebook.svg"}" alt="Facebook"></a> <a target="_blank"${add_attribute("href", links.social.ig, 0)}><img size="ic-lg" src="${escape(base, true) + "/assets/icons/insta.svg"}" alt="Instagram"></a> <a target="_blank"${add_attribute("href", links.social.tw, 0)}><img size="ic-lg" src="${escape(base, true) + "/assets/icons/twitter.svg"}" alt="Twitter"></a> <a target="_blank"${add_attribute("href", links.social.spo, 0)}><img size="ic-lg" src="${escape(base, true) + "/assets/icons/spotify.svg"}" alt="Spotify"></a></article>`;
      }
    }
  )}</section> </celestia-page>`;
});
export {
  Page as default
};
