import { c as create_ssr_component, v as validate_component, b as escape, e as each, d as add_attribute } from "../../../chunks/ssr.js";
import { C as Containr } from "../../../chunks/slider.svelte_svelte_type_style_lang.js";
import { b as base } from "../../../chunks/paths.js";
const css$1 = {
  code: '.earth-aura.svelte-1hcclfc:before,.earth-aura.svelte-1hcclfc:after,.earth.svelte-1hcclfc{top:50%;left:50%;transform:translate(-50%, -50%)}.wrapper.svelte-1hcclfc{position:relative;margin:0 auto;width:100%;height:500px;overflow:hidden}.earth.svelte-1hcclfc{position:relative;width:300px;height:300px;background:#208bd2;border:solid 1% #0a1436;border-radius:50%;z-index:0;overflow:hidden}.earth__shadow-container.svelte-1hcclfc{position:absolute;left:50%;width:100%;height:100%;overflow:hidden}.earth__shadow.svelte-1hcclfc{position:absolute;top:0;left:-50%;width:100%;height:100%;background:rgba(0, 0, 0, 0.2);border-radius:50%;z-index:1000}.earth-aura.svelte-1hcclfc:after{content:"";display:block;position:absolute;width:400px;height:400px;border-radius:50%;background:#13a;opacity:0.6;z-index:-2}.earth-aura.svelte-1hcclfc:before{content:"";display:block;position:absolute;width:500px;height:500px;border-radius:50%;background:#13a;opacity:0.4;z-index:-3}.clouds.svelte-1hcclfc{position:absolute;width:100%;height:100%;top:0;left:0;animation:svelte-1hcclfc-clouds 10s linear infinite}.clouds__group-1.svelte-1hcclfc{position:absolute;top:50%;left:10%;background:#fff;border-radius:50px;opacity:0.85;width:100px;height:20px;box-shadow:-10% -10% 0 rgba(255, 255, 255, 0.8)}.clouds__group-1.svelte-1hcclfc:after{content:"";display:block;position:absolute;top:-500%;left:150%;background:#fff;border-radius:50px;opacity:0.8;width:120px;height:30px}.clouds__group-1.svelte-1hcclfc:before{content:"";display:block;position:absolute;top:-100%;left:100%;background:#fff;border-radius:50px;opacity:0.8;width:140px;height:40px;box-shadow:10% 5% 0 rgb(255, 255, 255)}.clouds__group-2.svelte-1hcclfc{position:absolute;top:25%;left:25%;background:#fff;border-radius:50px;opacity:0.85;width:80px;height:10px;box-shadow:10% 5% 0 rgb(255, 255, 255)}.clouds__group-2.svelte-1hcclfc:after{content:"";display:block;position:absolute;top:200%;left:-50%;width:60px;height:10px;background:#fff;border-radius:50px;box-shadow:-5% 5% 0 rgb(255, 255, 255)}.clouds__group-2.svelte-1hcclfc:before{content:"";display:block;position:absolute;top:200%;left:-100%;width:100px;height:10px;background:#fff;border-radius:50px}.trees.svelte-1hcclfc{position:absolute;top:0;left:0;width:100%;height:100%;animation:svelte-1hcclfc-trees 15s linear infinite}.trees__group-1.svelte-1hcclfc{position:absolute;top:75%;left:20%;width:100px;height:40px;background:#4d7;border-radius:50px}.trees__group-1.svelte-1hcclfc:after{content:"";position:absolute;display:block;top:-150%;left:70%;width:150px;height:40px;background:#4d7;border-radius:50px}.trees__group-1.svelte-1hcclfc:before{content:"";position:absolute;display:block;top:-200%;left:-50%;width:80px;height:20px;background:#4d7;border-radius:50px}.trees__group-2.svelte-1hcclfc{position:absolute;top:50%;left:70%;width:60px;height:10px;background:#4d7;border-radius:50px}.trees__group-2.svelte-1hcclfc:after{content:"";position:absolute;display:block;top:-150%;left:70%;width:70px;height:15px;background:#4d7;border-radius:50px}.trees__group-2.svelte-1hcclfc:before{content:"";position:absolute;display:block;top:-100%;left:-50%;width:90px;height:30px;background:#4d7;border-radius:50px}@keyframes svelte-1hcclfc-clouds{0%{transform:translateX(110%)}100%{transform:translateX(-100%)}}@keyframes svelte-1hcclfc-trees{0%{transform:translateX(100%)}100%{transform:translateX(-150%)}}',
  map: '{"version":3,"file":"earth.svelte","sources":["earth.svelte"],"sourcesContent":["<div class=\\"wrapper\\">\\n\\t<div class=\\"earth\\">\\n\\t\\t<div class=\\"earth__shadow-container\\">\\n\\t\\t\\t<div class=\\"earth__shadow\\" />\\n\\t\\t</div>\\n\\t\\t<div class=\\"clouds\\">\\n\\t\\t\\t<div class=\\"clouds__group-1\\" />\\n\\t\\t\\t<div class=\\"clouds__group-2\\" />\\n\\t\\t</div>\\n\\t\\t<div class=\\"trees\\">\\n\\t\\t\\t<div class=\\"trees__group-1\\" />\\n\\t\\t\\t<div class=\\"trees__group-2\\" />\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class=\\"earth-aura\\" />\\n</div>\\n\\n<style type=\\"text/scss\\" lang=\\"scss\\">.earth-aura:before, .earth-aura:after, .earth {\\n  top: 50%;\\n  left: 50%;\\n  transform: translate(-50%, -50%);\\n}\\n\\n.wrapper {\\n  position: relative;\\n  margin: 0 auto;\\n  width: 100%;\\n  height: 500px;\\n  overflow: hidden;\\n}\\n\\n.earth {\\n  position: relative;\\n  width: 300px;\\n  height: 300px;\\n  background: #208bd2;\\n  border: solid 1% #0a1436;\\n  border-radius: 50%;\\n  z-index: 0;\\n  overflow: hidden;\\n}\\n.earth__shadow-container {\\n  position: absolute;\\n  left: 50%;\\n  width: 100%;\\n  height: 100%;\\n  overflow: hidden;\\n}\\n.earth__shadow {\\n  position: absolute;\\n  top: 0;\\n  left: -50%;\\n  width: 100%;\\n  height: 100%;\\n  background: rgba(0, 0, 0, 0.2);\\n  border-radius: 50%;\\n  z-index: 1000;\\n}\\n\\n.earth-aura:after {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  width: 400px;\\n  height: 400px;\\n  border-radius: 50%;\\n  background: #13a;\\n  opacity: 0.6;\\n  z-index: -2;\\n}\\n.earth-aura:before {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  width: 500px;\\n  height: 500px;\\n  border-radius: 50%;\\n  background: #13a;\\n  opacity: 0.4;\\n  z-index: -3;\\n}\\n\\n.clouds {\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  top: 0;\\n  left: 0;\\n  animation: clouds 10s linear infinite;\\n}\\n.clouds__group-1 {\\n  position: absolute;\\n  top: 50%;\\n  left: 10%;\\n  background: #fff;\\n  border-radius: 50px;\\n  opacity: 0.85;\\n  width: 100px;\\n  height: 20px;\\n  box-shadow: -10% -10% 0 rgba(255, 255, 255, 0.8);\\n}\\n.clouds__group-1:after {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  top: -500%;\\n  left: 150%;\\n  background: #fff;\\n  border-radius: 50px;\\n  opacity: 0.8;\\n  width: 120px;\\n  height: 30px;\\n}\\n.clouds__group-1:before {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  top: -100%;\\n  left: 100%;\\n  background: #fff;\\n  border-radius: 50px;\\n  opacity: 0.8;\\n  width: 140px;\\n  height: 40px;\\n  box-shadow: 10% 5% 0 rgb(255, 255, 255);\\n}\\n.clouds__group-2 {\\n  position: absolute;\\n  top: 25%;\\n  left: 25%;\\n  background: #fff;\\n  border-radius: 50px;\\n  opacity: 0.85;\\n  width: 80px;\\n  height: 10px;\\n  box-shadow: 10% 5% 0 rgb(255, 255, 255);\\n}\\n.clouds__group-2:after {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  top: 200%;\\n  left: -50%;\\n  width: 60px;\\n  height: 10px;\\n  background: #fff;\\n  border-radius: 50px;\\n  box-shadow: -5% 5% 0 rgb(255, 255, 255);\\n}\\n.clouds__group-2:before {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  top: 200%;\\n  left: -100%;\\n  width: 100px;\\n  height: 10px;\\n  background: #fff;\\n  border-radius: 50px;\\n}\\n\\n.trees {\\n  position: absolute;\\n  top: 0;\\n  left: 0;\\n  width: 100%;\\n  height: 100%;\\n  animation: trees 15s linear infinite;\\n}\\n.trees__group-1 {\\n  position: absolute;\\n  top: 75%;\\n  left: 20%;\\n  width: 100px;\\n  height: 40px;\\n  background: #4d7;\\n  border-radius: 50px;\\n}\\n.trees__group-1:after {\\n  content: \\"\\";\\n  position: absolute;\\n  display: block;\\n  top: -150%;\\n  left: 70%;\\n  width: 150px;\\n  height: 40px;\\n  background: #4d7;\\n  border-radius: 50px;\\n}\\n.trees__group-1:before {\\n  content: \\"\\";\\n  position: absolute;\\n  display: block;\\n  top: -200%;\\n  left: -50%;\\n  width: 80px;\\n  height: 20px;\\n  background: #4d7;\\n  border-radius: 50px;\\n}\\n.trees__group-2 {\\n  position: absolute;\\n  top: 50%;\\n  left: 70%;\\n  width: 60px;\\n  height: 10px;\\n  background: #4d7;\\n  border-radius: 50px;\\n}\\n.trees__group-2:after {\\n  content: \\"\\";\\n  position: absolute;\\n  display: block;\\n  top: -150%;\\n  left: 70%;\\n  width: 70px;\\n  height: 15px;\\n  background: #4d7;\\n  border-radius: 50px;\\n}\\n.trees__group-2:before {\\n  content: \\"\\";\\n  position: absolute;\\n  display: block;\\n  top: -100%;\\n  left: -50%;\\n  width: 90px;\\n  height: 30px;\\n  background: #4d7;\\n  border-radius: 50px;\\n}\\n\\n@keyframes clouds {\\n  0% {\\n    transform: translateX(110%);\\n  }\\n  100% {\\n    transform: translateX(-100%);\\n  }\\n}\\n@keyframes trees {\\n  0% {\\n    transform: translateX(100%);\\n  }\\n  100% {\\n    transform: translateX(-150%);\\n  }\\n}</style>\\n"],"names":[],"mappings":"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"}'
};
const Earth = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css$1);
  return `<div class="wrapper svelte-1hcclfc" data-svelte-h="svelte-ck61l1"><div class="earth svelte-1hcclfc"><div class="earth__shadow-container svelte-1hcclfc"><div class="earth__shadow svelte-1hcclfc"></div></div> <div class="clouds svelte-1hcclfc"><div class="clouds__group-1 svelte-1hcclfc"></div> <div class="clouds__group-2 svelte-1hcclfc"></div></div> <div class="trees svelte-1hcclfc"><div class="trees__group-1 svelte-1hcclfc"></div> <div class="trees__group-2 svelte-1hcclfc"></div></div></div> <div class="earth-aura svelte-1hcclfc"></div> </div>`;
});
const mgmt = [
  {
    img: "/assets/team/avani.jpeg",
    post: "President",
    name: "Avani Sharan"
  },
  {
    img: "/assets/team/tanmay.jpeg",
    post: "Vice-President",
    name: "Tanmay Yadav"
  },
  {
    img: "/assets/team/vices.jpeg",
    post: "Secretary & Publicity Head",
    name: "Vishesh Agrawal"
  },
  {
    img: "/assets/team/shlok.jpeg",
    post: "Observations Head",
    name: "Shlok Kakkar"
  },
  {
    img: "/assets/team/vaid.jpeg",
    post: "Projects Head",
    name: "Vikaram Vaidyanathan Venkatraman"
  },
  {
    img: "/assets/team/pj.jpeg",
    post: "Lectures & Podcast Head",
    name: "Pranav Jain"
  }
];
const leads = [
  {
    img: "/assets/team/saiees.jpeg",
    name: "Advanced Energy Conservation",
    pos: "Saieesh Sukhrani"
  },
  {
    img: "/assets/team/vaid.jpeg",
    name: "Smoke Detection System",
    pos: "Vikram Vaidyanathan Venkatraman"
  },
  {
    img: "/assets/team/tanmay.jpeg",
    name: "TITAN DAP",
    pos: "Tanmay Yadav"
  },
  {
    img: "/assets/team/pradeep.jpeg",
    name: "Interactive PoV",
    pos: "Prateek Upadhya"
  },
  {
    img: "/assets/team/neil.jpeg",
    name: "3 Sided Coin",
    pos: "Neil Shah"
  },
  {
    img: "/assets/team/yash.jpg",
    name: "Brain Computer Interface",
    pos: "Yash Saini"
  },
  {
    img: "/assets/team/dubal.jpg",
    name: "Quantum Chess",
    pos: "Ayushi Dubal"
  },
  {
    img: "/assets/team/cube.jpg",
    name: "EINSat",
    pos: "Kaustubh Murudkar"
  },
  {
    img: "/assets/team/vivek.jpg",
    name: "Cloud Chamber",
    pos: "Vivek S."
  },
  {
    img: "/assets/team/samarth.jpg",
    name: "Binary Calculator",
    pos: "Samarth Agrawal"
  },
  {
    img: "/assets/team/patidar.jpg",
    name: "CanSat",
    pos: "Dhruv Patidar"
  },
  {
    img: "/assets/team/gupte.jpg",
    name: "Star Tracker",
    pos: "Vivek Gupte"
  },
  {
    img: "/assets/team/hvcs.png",
    name: "Comet Trail Sim",
    pos: "Harshvardhan C."
  },
  {
    img: "/assets/team/venu.jpg",
    name: "Rocketry",
    pos: "Venugopalan Iyenger"
  }
];
const past = [
  [
    {
      post: "President",
      name: "Paurush Punyasheel"
    },
    {
      post: "Vice-President",
      name: "Ankit Verma"
    },
    {
      post: "Secretary & Publicity Head",
      name: "Yash Saini"
    },
    {
      post: "Observations Head",
      name: "Kaustubh Murudkar"
    },
    {
      post: "Projects Head",
      name: "Vivek Subramaniam"
    },
    {
      post: "Lectures Head",
      name: "Abdul Jawad Khan"
    }
  ],
  [
    {
      post: "President",
      name: "Hrutwick Sawant"
    },
    {
      post: "Vice-President",
      name: "Harshvardhan Chandirasekar"
    },
    {
      post: "Secretary & Publicity Head",
      name: "Paurush Punyasheel"
    },
    {
      post: "Observations Head",
      name: "Kaustubh Murudkar"
    },
    {
      post: "Projects Head",
      name: "Ankit Verma"
    },
    {
      post: "Lectures Head",
      name: "Bhuvan S V"
    }
  ],
  [
    {
      post: "President",
      name: "Venugopalan Iyengar"
    },
    {
      post: "Vice-President",
      name: "Vidit Parab"
    },
    {
      post: "Sub-coordinator",
      name: "Soham Deshpande"
    },
    {
      post: "Secretary",
      name: "Saransh Gokhale"
    },
    {
      post: "Observations Head",
      name: "Avdhoot Bhandare"
    },
    {
      post: "Projects Head",
      name: "Harshvardhan Chandirasekar"
    },
    {
      post: "Lectures Head",
      name: "Aaditee Juyal"
    },
    {
      post: "Publicity Head",
      name: "Devesh Dimble"
    }
  ],
  [
    {
      post: "President",
      name: "Akash Chaudhary"
    },
    {
      post: "Vice-President",
      name: "Shirin Kaushik"
    },
    {
      post: "Sub-coordinator",
      name: "Ayush Agrawal"
    },
    {
      post: "Secretary",
      name: "Nikhil Bisht"
    },
    {
      post: "Projects Head",
      name: "Devashish Gupta"
    },
    {
      post: "Events Head",
      name: "Parth Dave"
    },
    {
      post: "Lectures Head",
      name: "Aditya Majali"
    },
    {
      post: "Publicity Head",
      name: "Samridh"
    }
  ],
  [
    {
      post: "President",
      name: "Surendra"
    },
    {
      post: "Vice-President",
      name: "Komal Gupta"
    },
    {
      post: "Sub-coordinator",
      name: "Prakhar"
    },
    {
      post: "Sub-coordinator",
      name: "Khyati"
    },
    {
      post: "Secretary",
      name: "Mayur Joshi"
    },
    {
      post: "Lectures Head",
      name: "Pavan"
    }
  ],
  [
    {
      post: "President",
      name: "Shivan Khullar"
    },
    {
      post: "Vice-President",
      name: "Raghav Arora"
    },
    {
      post: "Secretary",
      name: "Aman Agarwal"
    }
  ],
  [
    {
      post: "Coordinator",
      name: "Siddharth Paliwal"
    },
    {
      post: "Sub-coordinator (Technical)",
      name: "Sanket Deshpande"
    },
    {
      post: "Sub-coordinator (Managerial)",
      name: "Lucky Kapoor"
    }
  ],
  [
    {
      post: "Coordinator",
      name: "Pankaj Tiple"
    },
    {
      post: "Sub-coordinator",
      name: "Shubham Sarawat"
    }
  ],
  [
    {
      post: "Coordinator",
      name: "Nikita Mirchandani"
    },
    {
      post: "Sub-coordinator",
      name: "Vishakha Gupta"
    },
    {
      post: "Secretary",
      name: "Raj Sinai"
    }
  ]
];
const data = {
  mgmt,
  leads,
  past
};
const css = {
  code: "p.svelte-sm0tm9.svelte-sm0tm9{line-height:1.5em}.mgmt.svelte-sm0tm9.svelte-sm0tm9{width:calc(50% - 10px)}.ldes.svelte-sm0tm9.svelte-sm0tm9{width:calc(33% - 10px)}@media(max-width: 768px){.mgmt.svelte-sm0tm9.svelte-sm0tm9{width:calc(100% - 10px)}.ldes.svelte-sm0tm9.svelte-sm0tm9{width:calc(50% - 10px)}}.ldes.svelte-sm0tm9 img.svelte-sm0tm9,.mgmt.svelte-sm0tm9 img.svelte-sm0tm9{-webkit-filter:grayscale(100%);filter:grayscale(100%)}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\timport Earth from '$lib/components/macro/earth.svelte';\\n\\timport data from '$lib/data/team';\\n\\timport { Containr } from '$lib/shared';\\n\\n\\timport { base } from '$app/paths';\\n\\n\\t// let filter = \\"\\";\\n<\/script>\\n\\n<title>Team | SEDS Celestia</title>\\n<celestia-page>\\n\\t<h1 class=\\"tx-c po-stx p-10 m-0 z-4\\" style=\\"top: 0;\\" bg=\\"000-nil\\">Team</h1>\\n\\t<section class=\\"adaptive\\">\\n\\t\\t<Containr title=\\"SEDS CELESTIA\\" icon=\\"null\\" bg=\\"b5e-83c\\">\\n\\t\\t\\t<div slot=\\"body\\">\\n\\t\\t\\t\\t<p class=\\"tx-j\\">\\n\\t\\t\\t\\t\\tSEDS Celestia is a chapter that is a part of SEDS India, headquartered in VIT Vellore. The\\n\\t\\t\\t\\t\\tinternational headquarters of SEDS lies in MIT, Boston, USA.\\n\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t<p class=\\"tx-j\\">\\n\\t\\t\\t\\t\\tPeople think that we Celestials just observe the “stars and the planets” in the night sky.\\n\\t\\t\\t\\t\\tThat’s partially correct. We do much more than star gazing. We organise lectures by\\n\\t\\t\\t\\t\\tvarious eminent professors, undertake many projects, exhibitions during quark, bonhomie\\n\\t\\t\\t\\t\\twith seniors and Starparty!\\n\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t<p class=\\"tx-j\\">We are the Celestials! ❤️</p>\\n\\t\\t\\t\\t<img class=\\"w-100\\" src=\\"{base}/assets/images/core.jpg\\" alt=\\"\\" style=\\"height:200px;\\" />\\n\\t\\t\\t</div>\\n\\t\\t</Containr>\\n\\t\\t<Containr title=\\"Management\\" icon=\\"empire\\" bg=\\"66e-37f\\">\\n\\t\\t\\t<div class=\\"teamrow m-10 f-wrap\\" slot=\\"body\\">\\n\\t\\t\\t\\t{#each data.mgmt as p}\\n\\t\\t\\t\\t\\t<div class=\\"imgCont mgmt tx-c m-5 f-wt3\\">\\n\\t\\t\\t\\t\\t\\t<img size=\\"md-lg\\" class=\\"rx-2\\" src={p.img} alt=\\"\\" />\\n\\t\\t\\t\\t\\t\\t<br /><span class=\\"f-wt7\\"> {p.name} </span>\\n\\t\\t\\t\\t\\t\\t<br /><span style=\\"color:#fffc\\">{p.post}</span>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</div>\\n\\t\\t</Containr>\\n\\n\\t\\t<Containr title=\\"Leads\\" icon=\\"jedi\\" bg=\\"e66-c26\\">\\n\\t\\t\\t<div class=\\"teamrow f-wrap\\" slot=\\"body\\">\\n\\t\\t\\t\\t{#each data.leads as p}\\n\\t\\t\\t\\t\\t<div class=\\"imgCont ldes tx-c m-5 f-wt3\\">\\n\\t\\t\\t\\t\\t\\t<img size=\\"md\\" class=\\"rx-2\\" src={p.img} alt=\\"\\" />\\n\\t\\t\\t\\t\\t\\t<br /><span class=\\"f-wt7\\"> {p.pos} </span>\\n\\t\\t\\t\\t\\t\\t<br /><span style=\\"color:#fffc\\">{p.name}</span>\\n\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</div>\\n\\t\\t</Containr>\\n\\n\\t\\t<details class=\\"p-10\\" bg=\\"66e-37f\\">\\n\\t\\t\\t<summary style=\\"font-size:20px\\">\\n\\t\\t\\t\\tPast Leadership <i>(Click to Open)</i>\\n\\t\\t\\t</summary>\\n\\t\\t\\t<main>\\n\\t\\t\\t\\t<!-- <input\\n            type=\\"text\\"\\n            bg=\\"nil\\"\\n            class=\\"p-10 m-10 w-gen\\"\\n            placeholder=\\"Search\\"\\n            bind:value={filter}\\n            style=\\"height:33px;--offset:20px;font-size:1.25em;\\" /> -->\\n\\t\\t\\t\\t{#each data.past as pj, i}\\n\\t\\t\\t\\t\\t<!-- .filter((e) => JSON.stringify(e).includes(filter))  -->\\n\\t\\t\\t\\t\\t<element class=\\"pastCard m-5 p-5\\">\\n\\t\\t\\t\\t\\t\\t<h4>{2021 - i}</h4>\\n\\t\\t\\t\\t\\t\\t{#each pj as person}\\n\\t\\t\\t\\t\\t\\t\\t<div class=\\"f-wt3 w-100 flex\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<span class=\\"f-wt7\\" style=\\"flex:1\\">{person.post}</span>\\n\\t\\t\\t\\t\\t\\t\\t\\t<span style=\\"flex:1\\"> {person.name} </span>\\n\\t\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t\\t{/each}\\n\\t\\t\\t\\t\\t</element>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</main>\\n\\t\\t</details>\\n\\t\\t<Earth />\\n\\t</section>\\n</celestia-page>\\n\\n<style type=\\"text/scss\\" lang=\\"scss\\">p {\\n  line-height: 1.5em;\\n}\\n\\n.mgmt {\\n  width: calc(50% - 10px);\\n}\\n\\n.ldes {\\n  width: calc(33% - 10px);\\n}\\n\\n@media (max-width: 768px) {\\n  .mgmt {\\n    width: calc(100% - 10px);\\n  }\\n  .ldes {\\n    width: calc(50% - 10px);\\n  }\\n}\\n.ldes img,\\n.mgmt img {\\n  -webkit-filter: grayscale(100%);\\n  filter: grayscale(100%);\\n}</style>\\n"],"names":[],"mappings":"AAoFoC,6BAAE,CACpC,WAAW,CAAE,KACf,CAEA,iCAAM,CACJ,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,CACxB,CAEA,iCAAM,CACJ,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,CACxB,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,iCAAM,CACJ,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CACzB,CACA,iCAAM,CACJ,KAAK,CAAE,KAAK,GAAG,CAAC,CAAC,CAAC,IAAI,CACxB,CACF,CACA,mBAAK,CAAC,iBAAG,CACT,mBAAK,CAAC,iBAAI,CACR,cAAc,CAAE,UAAU,IAAI,CAAC,CAC/B,MAAM,CAAE,UAAU,IAAI,CACxB"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<title data-svelte-h="svelte-l214i8">Team | SEDS Celestia</title> <celestia-page><h1 class="tx-c po-stx p-10 m-0 z-4" style="top: 0;" bg="000-nil" data-svelte-h="svelte-1jdylxq">Team</h1> <section class="adaptive">${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "SEDS CELESTIA",
      icon: "null",
      bg: "b5e-83c"
    },
    {},
    {
      body: () => {
        return `<div slot="body" data-svelte-h="svelte-6kwepv"><p class="tx-j svelte-sm0tm9">SEDS Celestia is a chapter that is a part of SEDS India, headquartered in VIT Vellore. The
					international headquarters of SEDS lies in MIT, Boston, USA.</p> <p class="tx-j svelte-sm0tm9">People think that we Celestials just observe the “stars and the planets” in the night sky.
					That’s partially correct. We do much more than star gazing. We organise lectures by
					various eminent professors, undertake many projects, exhibitions during quark, bonhomie
					with seniors and Starparty!</p> <p class="tx-j svelte-sm0tm9">We are the Celestials! ❤️</p> <img class="w-100" src="${escape(base, true) + "/assets/images/core.jpg"}" alt="" style="height:200px;"></div>`;
      }
    }
  )} ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Management",
      icon: "empire",
      bg: "66e-37f"
    },
    {},
    {
      body: () => {
        return `<div class="teamrow m-10 f-wrap" slot="body">${each(data.mgmt, (p) => {
          return `<div class="imgCont mgmt tx-c m-5 f-wt3 svelte-sm0tm9"><img size="md-lg" class="rx-2 svelte-sm0tm9"${add_attribute("src", p.img, 0)} alt=""> <br><span class="f-wt7">${escape(p.name)}</span> <br><span style="color:#fffc">${escape(p.post)}</span> </div>`;
        })}</div>`;
      }
    }
  )} ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Leads",
      icon: "jedi",
      bg: "e66-c26"
    },
    {},
    {
      body: () => {
        return `<div class="teamrow f-wrap" slot="body">${each(data.leads, (p) => {
          return `<div class="imgCont ldes tx-c m-5 f-wt3 svelte-sm0tm9"><img size="md" class="rx-2 svelte-sm0tm9"${add_attribute("src", p.img, 0)} alt=""> <br><span class="f-wt7">${escape(p.pos)}</span> <br><span style="color:#fffc">${escape(p.name)}</span> </div>`;
        })}</div>`;
      }
    }
  )} <details class="p-10" bg="66e-37f"><summary style="font-size:20px" data-svelte-h="svelte-eeipf8">Past Leadership <i>(Click to Open)</i></summary> <main> ${each(data.past, (pj, i) => {
    return ` <element class="pastCard m-5 p-5"><h4>${escape(2021 - i)}</h4> ${each(pj, (person) => {
      return `<div class="f-wt3 w-100 flex"><span class="f-wt7" style="flex:1">${escape(person.post)}</span> <span style="flex:1">${escape(person.name)}</span> </div>`;
    })} </element>`;
  })}</main></details> ${validate_component(Earth, "Earth").$$render($$result, {}, {}, {})}</section> </celestia-page>`;
});
export {
  Page as default
};
