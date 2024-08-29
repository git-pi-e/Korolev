import { c as create_ssr_component, v as validate_component, e as each, d as add_attribute, b as escape } from "../../../chunks/ssr.js";
import { C as Canvas } from "../../../chunks/canvas.js";
import { I as Image } from "../../../chunks/image.js";
import { C as Containr } from "../../../chunks/slider.svelte_svelte_type_style_lang.js";
import { b as base } from "../../../chunks/paths.js";
const css$2 = {
  code: ".earth.svelte-t2kt9w{top:50%;left:50%;transform:translate(-50%, -50%)}.wrapper.svelte-t2kt9w{padding:100px 0 0 200px;position:relative;margin:0 auto;width:calc(100% - 200px);height:500px;overflow:hidden}.earth.svelte-t2kt9w{position:relative;width:300px;height:300px;background:#000;border-radius:50%;animation:svelte-t2kt9w-bhround 10s infinite linear;box-shadow:0 0 70px #ff0, 10px 10px 20px #ff0, -15px -15px 30px #fff, 40px -40px 120px #f80;z-index:0;overflow:hidden}.earth__shadow-container.svelte-t2kt9w{position:absolute;left:50%;width:100%;height:100%;overflow:hidden}@keyframes svelte-t2kt9w-bhround{0%{transform:translate(-250px, -250px) rotate(0)}100%{transform:translate(-250px, -250px) rotate(360deg)}}",
  map: '{"version":3,"file":"bh.svelte","sources":["bh.svelte"],"sourcesContent":["<div class=\\"wrapper\\">\\n\\t<div class=\\"earth\\">\\n\\t\\t<div class=\\"earth__shadow-container\\" />\\n\\t</div>\\n</div>\\n\\n<style type=\\"text/scss\\" lang=\\"scss\\">.earth {\\n  top: 50%;\\n  left: 50%;\\n  transform: translate(-50%, -50%);\\n}\\n\\n.wrapper {\\n  padding: 100px 0 0 200px;\\n  position: relative;\\n  margin: 0 auto;\\n  width: calc(100% - 200px);\\n  height: 500px;\\n  overflow: hidden;\\n}\\n\\n.earth {\\n  position: relative;\\n  width: 300px;\\n  height: 300px;\\n  background: #000;\\n  border-radius: 50%;\\n  animation: bhround 10s infinite linear;\\n  box-shadow: 0 0 70px #ff0, 10px 10px 20px #ff0, -15px -15px 30px #fff, 40px -40px 120px #f80;\\n  z-index: 0;\\n  overflow: hidden;\\n}\\n.earth__shadow-container {\\n  position: absolute;\\n  left: 50%;\\n  width: 100%;\\n  height: 100%;\\n  overflow: hidden;\\n}\\n\\n@keyframes bhround {\\n  0% {\\n    transform: translate(-250px, -250px) rotate(0);\\n  }\\n  100% {\\n    transform: translate(-250px, -250px) rotate(360deg);\\n  }\\n}</style>\\n"],"names":[],"mappings":"AAMoC,oBAAO,CACzC,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CACjC,CAEA,sBAAS,CACP,OAAO,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,KAAK,CACxB,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,KAAK,CAAC,CACzB,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,MACZ,CAEA,oBAAO,CACL,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,GAAG,CAClB,SAAS,CAAE,qBAAO,CAAC,GAAG,CAAC,QAAQ,CAAC,MAAM,CACtC,UAAU,CAAE,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,CAAC,IAAI,CAAC,CAAC,IAAI,CAAC,KAAK,CAAC,KAAK,CAAC,IAAI,CAC5F,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,MACZ,CACA,sCAAyB,CACvB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,GAAG,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MACZ,CAEA,WAAW,qBAAQ,CACjB,EAAG,CACD,SAAS,CAAE,UAAU,MAAM,CAAC,CAAC,MAAM,CAAC,CAAC,OAAO,CAAC,CAC/C,CACA,IAAK,CACH,SAAS,CAAE,UAAU,MAAM,CAAC,CAAC,MAAM,CAAC,CAAC,OAAO,MAAM,CACpD,CACF"}'
};
const Bh = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$2);
  return `<div class="wrapper svelte-t2kt9w" data-svelte-h="svelte-um4qbl"><div class="earth svelte-t2kt9w"><div class="earth__shadow-container svelte-t2kt9w"></div></div> </div>`;
});
const css$1 = {
  code: '.space__comet.svelte-hjgylf{font-size:100px;width:1.8em;height:0.6em;border-top-right-radius:0.3em;border-bottom-right-radius:0.3em;background-image:radial-gradient(circle at 0.06em 50%, #fc4 0, #fc4 0.06em, transparent 0.06em), linear-gradient(#fc4 0, #fc4), radial-gradient(circle at 0 50%, transparent 0, transparent 0.05em, #fc4 0.05em), radial-gradient(circle at 0.06em 50%, #fc4 0, #fc4 0.06em, transparent 0.06em), linear-gradient(#fc4 0, #fc4), radial-gradient(circle at 0 50%, transparent 0, transparent 0.05em, #fc4 0.05em), radial-gradient(circle at 0.06em 50%, #fc4 0, #fc4 0.06em, transparent 0.06em), linear-gradient(#fc4 0, #fc4);background-size:100% 0.12em, 1.82em 0.12em, 1.61em 0.12em, 100% 0.12em, 1.7em 0.12em, 1.5em 0.12em, 100% 0.12em, 1.87em 0.12em;background-position:0.06em 0, 0.11em 0, 0.32em 0.11em, 0.18em 0.23em, 0.24em 0.23em, 0.44em 0.35em, 0 0.47em, 0.06em 0.47em;background-repeat:no-repeat;display:flex;align-items:center;justify-content:flex-end;animation:svelte-hjgylf-flyby 10s linear infinite}.space__comet.svelte-hjgylf:before{content:" ";display:block;background:rgba(255, 255, 255, 0.5);width:0.45em;height:0.45em;border-radius:50%;margin-right:0.07em}@keyframes svelte-hjgylf-flyby{0%{transform:scale(1) rotate(45deg) translate(-100px, -100px);opacity:1}50%{transform:scale(0.85) rotate(45deg) translate(70vw, 25vh);opacity:0}100%{opacity:0}}',
  map: '{"version":3,"file":"comet.svelte","sources":["comet.svelte"],"sourcesContent":["<div class=\\"space__comet-container\\" style=\\"position:fixed;\\">\\n\\t<div class=\\"space__comet\\" />\\n</div>\\n\\n<style type=\\"text/scss\\" lang=\\"scss\\">.space__comet {\\n  font-size: 100px;\\n  width: 1.8em;\\n  height: 0.6em;\\n  border-top-right-radius: 0.3em;\\n  border-bottom-right-radius: 0.3em;\\n  background-image: radial-gradient(circle at 0.06em 50%, #fc4 0, #fc4 0.06em, transparent 0.06em), linear-gradient(#fc4 0, #fc4), radial-gradient(circle at 0 50%, transparent 0, transparent 0.05em, #fc4 0.05em), radial-gradient(circle at 0.06em 50%, #fc4 0, #fc4 0.06em, transparent 0.06em), linear-gradient(#fc4 0, #fc4), radial-gradient(circle at 0 50%, transparent 0, transparent 0.05em, #fc4 0.05em), radial-gradient(circle at 0.06em 50%, #fc4 0, #fc4 0.06em, transparent 0.06em), linear-gradient(#fc4 0, #fc4);\\n  background-size: 100% 0.12em, 1.82em 0.12em, 1.61em 0.12em, 100% 0.12em, 1.7em 0.12em, 1.5em 0.12em, 100% 0.12em, 1.87em 0.12em;\\n  background-position: 0.06em 0, 0.11em 0, 0.32em 0.11em, 0.18em 0.23em, 0.24em 0.23em, 0.44em 0.35em, 0 0.47em, 0.06em 0.47em;\\n  background-repeat: no-repeat;\\n  display: flex;\\n  align-items: center;\\n  justify-content: flex-end;\\n  animation: flyby 10s linear infinite;\\n}\\n.space__comet:before {\\n  content: \\" \\";\\n  display: block;\\n  background: rgba(255, 255, 255, 0.5);\\n  width: 0.45em;\\n  height: 0.45em;\\n  border-radius: 50%;\\n  margin-right: 0.07em;\\n}\\n\\n@keyframes flyby {\\n  0% {\\n    transform: scale(1) rotate(45deg) translate(-100px, -100px);\\n    opacity: 1;\\n  }\\n  50% {\\n    transform: scale(0.85) rotate(45deg) translate(70vw, 25vh);\\n    opacity: 0;\\n  }\\n  100% {\\n    opacity: 0;\\n  }\\n}</style>\\n"],"names":[],"mappings":"AAIoC,2BAAc,CAChD,SAAS,CAAE,KAAK,CAChB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,uBAAuB,CAAE,KAAK,CAC9B,0BAA0B,CAAE,KAAK,CACjC,gBAAgB,CAAE,gBAAgB,MAAM,CAAC,EAAE,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,MAAM,CAAC,CAAC,WAAW,CAAC,MAAM,CAAC,CAAC,CAAC,gBAAgB,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,gBAAgB,MAAM,CAAC,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,WAAW,CAAC,CAAC,CAAC,CAAC,WAAW,CAAC,MAAM,CAAC,CAAC,IAAI,CAAC,MAAM,CAAC,CAAC,CAAC,gBAAgB,MAAM,CAAC,EAAE,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,MAAM,CAAC,CAAC,WAAW,CAAC,MAAM,CAAC,CAAC,CAAC,gBAAgB,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,gBAAgB,MAAM,CAAC,EAAE,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,WAAW,CAAC,CAAC,CAAC,CAAC,WAAW,CAAC,MAAM,CAAC,CAAC,IAAI,CAAC,MAAM,CAAC,CAAC,CAAC,gBAAgB,MAAM,CAAC,EAAE,CAAC,MAAM,CAAC,GAAG,CAAC,CAAC,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,MAAM,CAAC,CAAC,WAAW,CAAC,MAAM,CAAC,CAAC,CAAC,gBAAgB,IAAI,CAAC,CAAC,CAAC,CAAC,IAAI,CAAC,CACjgB,eAAe,CAAE,IAAI,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,MAAM,CAAC,CAAC,IAAI,CAAC,MAAM,CAAC,CAAC,KAAK,CAAC,MAAM,CAAC,CAAC,KAAK,CAAC,MAAM,CAAC,CAAC,IAAI,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,MAAM,CAC/H,mBAAmB,CAAE,MAAM,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,MAAM,CAAC,CAAC,CAAC,CAAC,MAAM,CAAC,CAAC,MAAM,CAAC,MAAM,CAC5H,iBAAiB,CAAE,SAAS,CAC5B,OAAO,CAAE,IAAI,CACb,WAAW,CAAE,MAAM,CACnB,eAAe,CAAE,QAAQ,CACzB,SAAS,CAAE,mBAAK,CAAC,GAAG,CAAC,MAAM,CAAC,QAC9B,CACA,2BAAa,OAAQ,CACnB,OAAO,CAAE,GAAG,CACZ,OAAO,CAAE,KAAK,CACd,UAAU,CAAE,KAAK,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CAAC,GAAG,CAAC,CACpC,KAAK,CAAE,MAAM,CACb,MAAM,CAAE,MAAM,CACd,aAAa,CAAE,GAAG,CAClB,YAAY,CAAE,MAChB,CAEA,WAAW,mBAAM,CACf,EAAG,CACD,SAAS,CAAE,MAAM,CAAC,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,UAAU,MAAM,CAAC,CAAC,MAAM,CAAC,CAC3D,OAAO,CAAE,CACX,CACA,GAAI,CACF,SAAS,CAAE,MAAM,IAAI,CAAC,CAAC,OAAO,KAAK,CAAC,CAAC,UAAU,IAAI,CAAC,CAAC,IAAI,CAAC,CAC1D,OAAO,CAAE,CACX,CACA,IAAK,CACH,OAAO,CAAE,CACX,CACF"}'
};
const Comet = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="space__comet-container" style="position:fixed;" data-svelte-h="svelte-lm3y1v"><div class="space__comet svelte-hjgylf"></div> </div>`;
});
const going = [
  {
    under: "Dhruv Patidar",
    name: "CanSat",
    icon: "https://live.staticflickr.com/1082/672853757_9c08f408d9_b.jpg",
    desc: "Remote sensing Atmosphere",
    more: null,
    moreLink: null
  },
  {
    under: "Kaustubh Murudkar",
    name: "EINSat",
    icon: "/assets/images/projects-2020/einsat.png",
    desc: "The CubeSat project of SEDS-Celestia planned to detect exoplanets",
    more: null,
    moreLink: null
  },
  {
    under: "Venugopalan Iyengar",
    name: "Rocketry",
    icon: "/assets/images/projects-2020/rocketry.png",
    desc: "Rocketry aims to build a self landing thrust-vector controlled rockets",
    more: null
  },
  {
    under: "Vivek Gupte",
    name: "Star Tracker",
    icon: "/assets/images/projects-2020/track.jpg",
    desc: "Shows object aimed by telescope on a screen in real time",
    more: null
  },
  {
    under: "Neil Shah",
    name: "3 Sided Coin",
    icon: "/assets/images/projects-2020/3coin.jpg",
    desc: "A perfect coin that has equal probability to land on its heads, tails and it's edge",
    more: null
  },
  {
    under: "Ayushi Dubal",
    name: "Quantum Chess",
    icon: "/assets/images/projects-2020/qchess.jpeg",
    desc: "Quantum chess is reiteration of classical chess but with quantum rules",
    more: null
  },
  {
    under: "Yash Saini",
    name: "Brain Computer Interface",
    icon: "/assets/images/projects-2020/bci.png",
    desc: "Designing an Ominidirection brain controlled rover",
    more: null
  },
  {
    under: "Samarth Agrawal",
    name: "Binary Calculator",
    icon: "/assets/images/projects-2020/bincalc.png",
    desc: "A calculator made by transistor circuits",
    more: null
  },
  {
    under: "Vivek Subramanium",
    name: "Cloud Chamber",
    icon: "/assets/images/projects-2020/cloud.jpg",
    desc: "An old school particle detector",
    more: null
  },
  {
    under: "Harshvardhan Chandirashekhar",
    name: "Comet Dust Trail Simulation",
    icon: "https://live.staticflickr.com/7210/6967153925_9716066eca.jpg",
    desc: "Simulating icy comet dust trails",
    more: null
  }
];
const past = [
  {
    year: "2019",
    under: "Venugopalan Iyengar",
    name: "Lidar",
    desc: "An attempt to create our inhouce lidar",
    img: "/assets/logo-sq.png",
    more: null
  },
  {
    year: 2017,
    under: "Venugopalan Iyengar",
    name: "Tesla Coil",
    desc: "The name speaks for itself",
    img: "/assets/logo-sq.png",
    more: ""
  },
  {
    year: "2019",
    under: "Venugopalan Iyengar",
    name: "Microbial Fuel Cell",
    desc: "Utilizing bacteria in order to catalize reactions and generate current",
    img: "/assets/logo-sq.png",
    more: null
  },
  {
    year: "2019",
    under: "Venugopalan Iyengar",
    name: "Pyroboard",
    desc: "Vibrating a burning gases to tunes from a speaker",
    img: "/assets/logo-sq.png",
    more: null
  },
  {
    year: "2019",
    under: "Venugopalan Iyengar",
    name: "Spectrometer",
    desc: "Design a spectrometer to determine the chemical composition of light sources or illuminated objects",
    img: "/assets/logo-sq.png",
    more: null
  },
  {
    year: "2019",
    under: "Venugopalan Iyengar",
    name: "Physarum",
    desc: "Solve basic computation problems using Physarum slime mold",
    img: "/assets/logo-sq.png",
    more: null
  },
  {
    year: 2018,
    under: "Venugopalan Iyengar",
    name: "Sonoluminescence",
    desc: "Create a sonoluminescent bubble and take temperature and spectral measurements of the light emitted",
    img: "/assets/logo-sq.png",
    more: ""
  },
  {
    year: 2017,
    under: "Venugopalan Iyengar",
    name: "Barn Door Tracker",
    desc: "Take exposure images of night’s sky using automated DSLR mount",
    img: "/assets/logo-sq.png",
    more: ""
  },
  {
    year: 2017,
    under: "Venugopalan Iyengar",
    name: "N-body simulation",
    desc: "It aimed to simulate the gravitational interaction of a swarm of bodies and study the clustering and dynamics of the structures formed",
    img: "/assets/logo-sq.png",
    more: ""
  },
  {
    year: 2018,
    under: "Venugopalan Iyengar",
    name: "Schlieren Photography",
    desc: "To Visualize pressure, temperature and composition gradients in fluid flow and observe the complex fractal like structures of turbulence",
    img: "/assets/logo-sq.png",
    more: ""
  },
  {
    year: 2018,
    under: "Venugopalan Iyengar",
    name: "Reproduction of particle interference with walking droplets",
    desc: "It aimed to recreate a quantum phenomena like interference with walking droplets on a vibrating fluid bed",
    img: "/assets/logo-sq.png",
    more: ""
  },
  {
    year: 2018,
    under: "Venugopalan Iyengar",
    name: "Galaxy Classifier Neural Net",
    desc: "It aimed to build and train a convolutional neural network that will classify galaxies using their images",
    img: "/assets/logo-sq.png",
    more: ""
  },
  {
    year: 2018,
    under: "Venugopalan Iyengar",
    name: "Michelson Interferometers",
    desc: "Build a Michelson interferometer without any expensive equipment and to explore the applications of interferometry in seismology and acoustics",
    img: "/assets/logo-sq.png",
    more: ""
  }
];
const data = {
  going,
  past
};
const css = {
  code: "@media(max-width: 400px){#art.svelte-n1g29d{transform:scale(0.8) translateX(-5%)}}",
  map: '{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n  import BH from \\"$lib/components/macro/bh.svelte\\";\\n  import Comet from \\"$lib/components/micro/comet.svelte\\";\\n  import data from \\"$lib/data/projects\\";\\n\\n  import { Canvas, Containr, Imgr } from \\"$lib/shared\\";\\n\\n  import { base } from \\"$app/paths\\";\\n\\n  let filter = \\"\\";\\n\\n  const search = (e, filter) => {\\n    let [, under, name, desc, ,] = Object.values(e); //converting the object to array of values and destructuring\\n    return [under, name, desc].some((element) => {\\n      return element?.toLowerCase().includes(filter.toLowerCase());\\n    }); //creating an array of only needed values and running .some() method on it to return  or 1 fir condtion inside.\\n  };\\n<\/script>\\n\\n<title>Projects | SEDS Celestia</title>\\n<celestia-page>\\n  <Comet />\\n  <h1 class=\\"tx-c po-stx p-10 z-4 w-50 m-h-auto\\" style=\\"top:0;\\" bg=\\"000-nil\\">\\n    Projects\\n  </h1>\\n  <section class=\\"adaptive\\">\\n    <div id=\\"art\\" size=\\"max\\" class=\\"m-h-auto\\">\\n      <Canvas\\n        image=\\"{base}/assets/onthehouse/projArt.png\\"\\n        bg=\\"0008\\"\\n        height=\\"400\\"\\n        width=\\"400\\"\\n      />\\n    </div>\\n  </section>\\n  <section class=\\"macrodaptive tx-c f-wrap jtx-ev\\">\\n    {#each data.going as pj}\\n      <div class=\\"po-rel tx-l m-20 blur\\" size=\\"lg\\">\\n        <img src={pj.icon} class=\\"w-100 z-0\\" size=\\"lg\\" alt={pj.name} />\\n        <div loc=\\"bla\\" class=\\"p-20 w-gen\\" style=\\"--offset:40px;\\" bg=\\"nil-000\\">\\n          <span class=\\"f-wt7\\">{pj.name}</span>\\n          <hr />\\n          <details>\\n            <summary>{pj.under}</summary>\\n            <p>\\n              {pj.desc}\\n              {#if pj.more}\\n                <button class=\\"btn-std\\">\\n                  <a href={pj.moreLink}>{pj.more}</a>\\n                </button>\\n              {/if}\\n            </p>\\n          </details>\\n        </div>\\n      </div>\\n    {/each}\\n  </section>\\n  <section class=\\"adaptive\\">\\n    <Containr title=\\"Past Projects\\" icon=\\"tasks\\" bg=\\"66e-37f\\">\\n      <details class=\\"p-10 tx-l\\" bg=\\"66e-37f\\" slot=\\"body\\">\\n        <summary style=\\"font-size:20px\\"><i>(Click to Open)</i></summary>\\n        <main>\\n          <input\\n            type=\\"text\\"\\n            bg=\\"nil\\"\\n            class=\\"p-10 m-10\\"\\n            placeholder=\\"Search\\"\\n            bind:value={filter}\\n            ht=\\"30px\\"\\n          />\\n          {#each data.past.filter((e) => search(e, filter)) as pj}\\n            <!-- data.past is an array of objects, thus .filter() method sends in each element which is inturn an object as (e) into the search function -->\\n            <element class=\\"flex m-10 p-10\\">\\n              <img\\n                class=\\"rx-50 p-5\\"\\n                bg=\\"000\\"\\n                size=\\"ic-md\\"\\n                src={pj.img}\\n                alt=\\"\\"\\n              />\\n              <div class=\\"m-5 f-wt3\\">\\n                <div class=\\"f-wt7 p-5\\">{pj.name} ({pj.year || \\"Unknown\\"})</div>\\n                <div class=\\"p-5\\">{pj.desc}</div>\\n              </div>\\n            </element>\\n          {/each}\\n        </main>\\n      </details>\\n    </Containr>\\n    <Containr title=\\"Notable Spinoffs\\" icon=\\"dish\\" bg=\\"e66-c26\\">\\n      <div slot=\\"body\\">\\n        <Imgr\\n          src=\\"{base}/assets/projects/kratos.png\\"\\n          placements={{\\n            topRight: \\"Now Independent\\",\\n            bottomLeft: \\"Project Kratos\\",\\n          }}\\n        />\\n        <Imgr\\n          src=\\"{base}/assets/projects/rt.jpg\\"\\n          placements={{ topRight: \\"Now Independent\\", bottomLeft: \\"Project RT\\" }}\\n        />\\n        <Imgr\\n          src=\\"{base}/assets/projects/apeiro.jpg\\"\\n          placements={{ topRight: \\"Ended\\", bottomLeft: \\"Project Apeiro\\" }}\\n        />\\n      </div>\\n    </Containr>\\n  </section>\\n  <BH />\\n</celestia-page>\\n\\n<style>\\n  @media (max-width: 400px) {\\n    #art {\\n      transform: scale(0.8) translateX(-5%);\\n    }\\n  }\\n</style>\\n"],"names":[],"mappings":"AAiHE,MAAO,YAAY,KAAK,CAAE,CACxB,kBAAK,CACH,SAAS,CAAE,MAAM,GAAG,CAAC,CAAC,WAAW,GAAG,CACtC,CACF"}'
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let filter = "";
  const search = (e, filter2) => {
    let [, under, name, desc] = Object.values(e);
    return [under, name, desc].some((element) => {
      return element?.toLowerCase().includes(filter2.toLowerCase());
    });
  };
  $$result.css.add(css);
  return `<title data-svelte-h="svelte-umx3e1">Projects | SEDS Celestia</title> <celestia-page>${validate_component(Comet, "Comet").$$render($$result, {}, {}, {})} <h1 class="tx-c po-stx p-10 z-4 w-50 m-h-auto" style="top:0;" bg="000-nil" data-svelte-h="svelte-z331d0">Projects</h1> <section class="adaptive"><div id="art" size="max" class="m-h-auto svelte-n1g29d">${validate_component(Canvas, "Canvas").$$render(
    $$result,
    {
      image: base + "/assets/onthehouse/projArt.png",
      bg: "0008",
      height: "400",
      width: "400"
    },
    {},
    {}
  )}</div></section> <section class="macrodaptive tx-c f-wrap jtx-ev">${each(data.going, (pj) => {
    return `<div class="po-rel tx-l m-20 blur" size="lg"><img${add_attribute("src", pj.icon, 0)} class="w-100 z-0" size="lg"${add_attribute("alt", pj.name, 0)}> <div loc="bla" class="p-20 w-gen" style="--offset:40px;" bg="nil-000"><span class="f-wt7">${escape(pj.name)}</span> <hr> <details><summary>${escape(pj.under)}</summary> <p>${escape(pj.desc)} ${pj.more ? `<button class="btn-std"><a${add_attribute("href", pj.moreLink, 0)}>${escape(pj.more)}</a> </button>` : ``}</p> </details></div> </div>`;
  })}</section> <section class="adaptive">${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Past Projects",
      icon: "tasks",
      bg: "66e-37f"
    },
    {},
    {
      body: () => {
        return `<details class="p-10 tx-l" bg="66e-37f" slot="body"><summary style="font-size:20px" data-svelte-h="svelte-i0efx6"><i>(Click to Open)</i></summary> <main><input type="text" bg="nil" class="p-10 m-10" placeholder="Search" ht="30px"${add_attribute("value", filter, 0)}> ${each(data.past.filter((e) => search(e, filter)), (pj) => {
          return ` <element class="flex m-10 p-10"><img class="rx-50 p-5" bg="000" size="ic-md"${add_attribute("src", pj.img, 0)} alt=""> <div class="m-5 f-wt3"><div class="f-wt7 p-5">${escape(pj.name)} (${escape(pj.year || "Unknown")})</div> <div class="p-5">${escape(pj.desc)}</div></div> </element>`;
        })}</main></details>`;
      }
    }
  )} ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Notable Spinoffs",
      icon: "dish",
      bg: "e66-c26"
    },
    {},
    {
      body: () => {
        return `<div slot="body">${validate_component(Image, "Imgr").$$render(
          $$result,
          {
            src: base + "/assets/projects/kratos.png",
            placements: {
              topRight: "Now Independent",
              bottomLeft: "Project Kratos"
            }
          },
          {},
          {}
        )} ${validate_component(Image, "Imgr").$$render(
          $$result,
          {
            src: base + "/assets/projects/rt.jpg",
            placements: {
              topRight: "Now Independent",
              bottomLeft: "Project RT"
            }
          },
          {},
          {}
        )} ${validate_component(Image, "Imgr").$$render(
          $$result,
          {
            src: base + "/assets/projects/apeiro.jpg",
            placements: {
              topRight: "Ended",
              bottomLeft: "Project Apeiro"
            }
          },
          {},
          {}
        )}</div>`;
      }
    }
  )}</section> ${validate_component(Bh, "BH").$$render($$result, {}, {}, {})} </celestia-page>`;
});
export {
  Page as default
};
