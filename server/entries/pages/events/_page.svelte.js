import { c as create_ssr_component, d as add_attribute, b as escape, v as validate_component, e as each } from "../../../chunks/ssr.js";
import { C as Canvas } from "../../../chunks/canvas.js";
import { C as Containr } from "../../../chunks/slider.svelte_svelte_type_style_lang.js";
import { b as base } from "../../../chunks/paths.js";
const css = {
  code: '.earth-aura.svelte-1tctjtm:before,.earth-aura.svelte-1tctjtm:after,.earth.svelte-1tctjtm{top:50%;left:50%;transform:translate(-50%, -50%)}.wrapper.svelte-1tctjtm{position:relative;margin:0 auto;width:100%;height:500px;overflow:hidden}.earth.svelte-1tctjtm{position:relative;width:300px;height:300px;background:#934838;border:solid 1% #0a1436;border-radius:50%;z-index:0;overflow:hidden}.earth__shadow-container.svelte-1tctjtm{position:absolute;left:50%;width:100%;height:100%;overflow:hidden}.earth__shadow.svelte-1tctjtm{position:absolute;top:0;left:-50%;width:100%;height:100%;background:rgba(0, 0, 0, 0.2);border-radius:50%;z-index:1000}.earth-aura.svelte-1tctjtm:after{content:"";display:block;position:absolute;width:400px;height:400px;border-radius:50%;background:#954;opacity:0.6;z-index:-2}.earth-aura.svelte-1tctjtm:before{content:"";display:block;position:absolute;width:500px;height:500px;border-radius:50%;background:#954;opacity:0.4;z-index:-3}.clouds.svelte-1tctjtm{position:absolute;width:100%;height:100%;top:0;left:0;animation:svelte-1tctjtm-craters 10s linear infinite}.clouds__group-1.svelte-1tctjtm{position:absolute;top:60%;left:60%;background:#732;border-radius:50px;width:20px;height:20px}.clouds__group-1.svelte-1tctjtm:after{content:"";display:block;position:absolute;top:-500%;left:150%;background:#732;border-radius:50px;width:60px;height:60px}.clouds__group-1.svelte-1tctjtm:before{content:"";display:block;position:absolute;top:-100%;left:100%;background:#732;border-radius:50px;width:100px;height:100px}@keyframes svelte-1tctjtm-craters{0%{transform:translateX(110%)}100%{transform:translateX(-100%)}}',
  map: '{"version":3,"file":"mars.svelte","sources":["mars.svelte"],"sourcesContent":["<div class=\\"wrapper\\">\\n\\t<div class=\\"earth\\">\\n\\t\\t<div class=\\"earth__shadow-container\\">\\n\\t\\t\\t<div class=\\"earth__shadow\\" />\\n\\t\\t</div>\\n\\t\\t<div class=\\"clouds\\">\\n\\t\\t\\t<div class=\\"clouds__group-1\\" />\\n\\t\\t</div>\\n\\t</div>\\n\\t<div class=\\"earth-aura\\" />\\n</div>\\n\\n<style type=\\"text/scss\\" lang=\\"scss\\">.earth-aura:before, .earth-aura:after, .earth {\\n  top: 50%;\\n  left: 50%;\\n  transform: translate(-50%, -50%);\\n}\\n\\n.wrapper {\\n  position: relative;\\n  margin: 0 auto;\\n  width: 100%;\\n  height: 500px;\\n  overflow: hidden;\\n}\\n\\n.earth {\\n  position: relative;\\n  width: 300px;\\n  height: 300px;\\n  background: #934838;\\n  border: solid 1% #0a1436;\\n  border-radius: 50%;\\n  z-index: 0;\\n  overflow: hidden;\\n}\\n.earth__shadow-container {\\n  position: absolute;\\n  left: 50%;\\n  width: 100%;\\n  height: 100%;\\n  overflow: hidden;\\n}\\n.earth__shadow {\\n  position: absolute;\\n  top: 0;\\n  left: -50%;\\n  width: 100%;\\n  height: 100%;\\n  background: rgba(0, 0, 0, 0.2);\\n  border-radius: 50%;\\n  z-index: 1000;\\n}\\n\\n.earth-aura:after {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  width: 400px;\\n  height: 400px;\\n  border-radius: 50%;\\n  background: #954;\\n  opacity: 0.6;\\n  z-index: -2;\\n}\\n.earth-aura:before {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  width: 500px;\\n  height: 500px;\\n  border-radius: 50%;\\n  background: #954;\\n  opacity: 0.4;\\n  z-index: -3;\\n}\\n\\n.clouds {\\n  position: absolute;\\n  width: 100%;\\n  height: 100%;\\n  top: 0;\\n  left: 0;\\n  animation: craters 10s linear infinite;\\n}\\n.clouds__group-1 {\\n  position: absolute;\\n  top: 60%;\\n  left: 60%;\\n  background: #732;\\n  border-radius: 50px;\\n  width: 20px;\\n  height: 20px;\\n}\\n.clouds__group-1:after {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  top: -500%;\\n  left: 150%;\\n  background: #732;\\n  border-radius: 50px;\\n  width: 60px;\\n  height: 60px;\\n}\\n.clouds__group-1:before {\\n  content: \\"\\";\\n  display: block;\\n  position: absolute;\\n  top: -100%;\\n  left: 100%;\\n  background: #732;\\n  border-radius: 50px;\\n  width: 100px;\\n  height: 100px;\\n}\\n\\n@keyframes craters {\\n  0% {\\n    transform: translateX(110%);\\n  }\\n  100% {\\n    transform: translateX(-100%);\\n  }\\n}</style>\\n"],"names":[],"mappings":"AAYoC,0BAAW,OAAO,CAAE,0BAAW,MAAM,CAAE,qBAAO,CAChF,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,SAAS,CAAE,UAAU,IAAI,CAAC,CAAC,IAAI,CACjC,CAEA,uBAAS,CACP,QAAQ,CAAE,QAAQ,CAClB,MAAM,CAAE,CAAC,CAAC,IAAI,CACd,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,KAAK,CACb,QAAQ,CAAE,MACZ,CAEA,qBAAO,CACL,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,UAAU,CAAE,OAAO,CACnB,MAAM,CAAE,KAAK,CAAC,EAAE,CAAC,OAAO,CACxB,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,CAAC,CACV,QAAQ,CAAE,MACZ,CACA,uCAAyB,CACvB,QAAQ,CAAE,QAAQ,CAClB,IAAI,CAAE,GAAG,CACT,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,QAAQ,CAAE,MACZ,CACA,6BAAe,CACb,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,IAAI,CACV,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,UAAU,CAAE,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAC9B,aAAa,CAAE,GAAG,CAClB,OAAO,CAAE,IACX,CAEA,0BAAW,MAAO,CAChB,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,CACZ,OAAO,CAAE,EACX,CACA,0BAAW,OAAQ,CACjB,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KAAK,CACb,aAAa,CAAE,GAAG,CAClB,UAAU,CAAE,IAAI,CAChB,OAAO,CAAE,GAAG,CACZ,OAAO,CAAE,EACX,CAEA,sBAAQ,CACN,QAAQ,CAAE,QAAQ,CAClB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IAAI,CACZ,GAAG,CAAE,CAAC,CACN,IAAI,CAAE,CAAC,CACP,SAAS,CAAE,sBAAO,CAAC,GAAG,CAAC,MAAM,CAAC,QAChC,CACA,+BAAiB,CACf,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,GAAG,CACR,IAAI,CAAE,GAAG,CACT,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CACA,+BAAgB,MAAO,CACrB,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,CACV,IAAI,CAAE,IAAI,CACV,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,IAAI,CACX,MAAM,CAAE,IACV,CACA,+BAAgB,OAAQ,CACtB,OAAO,CAAE,EAAE,CACX,OAAO,CAAE,KAAK,CACd,QAAQ,CAAE,QAAQ,CAClB,GAAG,CAAE,KAAK,CACV,IAAI,CAAE,IAAI,CACV,UAAU,CAAE,IAAI,CAChB,aAAa,CAAE,IAAI,CACnB,KAAK,CAAE,KAAK,CACZ,MAAM,CAAE,KACV,CAEA,WAAW,sBAAQ,CACjB,EAAG,CACD,SAAS,CAAE,WAAW,IAAI,CAC5B,CACA,IAAK,CACH,SAAS,CAAE,WAAW,KAAK,CAC7B,CACF"}'
};
const Mars = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  $$result.css.add(css);
  return `<div class="wrapper svelte-1tctjtm" data-svelte-h="svelte-cyibrl"><div class="earth svelte-1tctjtm"><div class="earth__shadow-container svelte-1tctjtm"><div class="earth__shadow svelte-1tctjtm"></div></div> <div class="clouds svelte-1tctjtm"><div class="clouds__group-1 svelte-1tctjtm"></div></div></div> <div class="earth-aura svelte-1tctjtm"></div> </div>`;
});
const opensource = [
  {
    img: "/assets/images/qc.png",
    title: "Quantum chess",
    repo: "https://github.com/SEDSCelestiaBPGC/quantum-chess"
  },
  {
    show: -1,
    img: "https://images.immediate.co.uk/production/volatile/sites/25/2019/02/Baader-Nano-Tracker-Travelling-Mount-Baader-Nano-Tracker-Travelling-Mount-5d5a2f4.jpg?quality=90&resize=620,413",
    title: "3- Sided Coin",
    repo: ""
  },
  {
    img: "/assets/images/bci.png",
    title: "Brain Computer Interface",
    repo: "https://github.com/SEDSCelestiaBPGC/BCI"
  },
  {
    show: -1,
    img: "/assets/svgs/korolev.svg",
    title: "Celestia-Korolev Website (Soon)",
    repo: "https://github.com/SEDSCelestiaBPGC/BCI"
  }
];
const podcast = [
  {
    icon: "/assets/svgs/youtube.svg",
    link: "youtube.com/playlist?list=PLGzI_TnIg-eqKRfQTB4wxVFGOnarP3jFJ"
  },
  {
    icon: "/assets/svgs/spotify.svg",
    link: "open.spotify.com/show/0NKbVLI7LpY6069IUCF6xi"
  },
  {
    icon: "/assets/svgs/radiopublic.svg",
    link: "radiopublic.com/celestia-onair-WeRp1J"
  },
  {
    icon: "/assets/svgs/google.svg",
    link: "podcasts.google.com/feed/aHR0cHM6Ly9hbmNob3IuZm0vcy80NWYzZjAwOC9wb2RjYXN0L3Jzcw=="
  },
  {
    icon: "/assets/svgs/pocketcast.svg",
    link: "pca.st/b3mqu7bk"
  },
  {
    icon: "/assets/svgs/breaker.png",
    link: "breaker.audio/celestia-on-air"
  }
];
const data = {
  opensource,
  podcast
};
const Lectures = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { lec = {
    url: "",
    title: "",
    image: "https://www.awilsonsocialwork.net/wp-content/uploads/2017/01/placeholder.jpg",
    text: "",
    date: "",
    time: "",
    prof: ""
  } } = $$props;
  const driver = (img) => img?.includes("google") ? `https://drive.google.com/uc?export=view&id=${img?.split("/d/")[1]?.split("/")[0]}` : img;
  if ($$props.lec === void 0 && $$bindings.lec && lec !== void 0) $$bindings.lec(lec);
  return `<img class="w-100" style="object-fit:cover;"${add_attribute("src", driver(lec.image), 0)} alt=""> <div class="p-10"><div class="flex jtx-bw"><span class="f-wt7">${escape(lec.prof)}: ${escape(lec.title.length > 20 ? lec.title.slice(0, 20) + "..." : lec.title)}</span> <span>${escape(lec.date)}, ${escape(lec.time)}</span></div> <br> <div>${escape(lec.text)}</div> <br> <div class="flex jtx-bw"><span data-svelte-h="svelte-1uypmr0"> </span> <span><a class="btn-std"${add_attribute("href", lec.url, 0)} style="--theme:#faa">Watch</a></span></div></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let fader, lec;
  return `<title data-svelte-h="svelte-ob6r78">Events | SEDS Celestia</title> <celestia-page><h1 class="tx-c po-stx z-4 m-0" style="top: 0;" bg="000-nil" data-svelte-h="svelte-phddke">Events</h1> <section class="adaptive"><div size="max" class="m-h-auto" style="animation: float 6s ease-in-out infinite;">${validate_component(Canvas, "Canvas").$$render(
    $$result,
    {
      image: base + "/assets/onthehouse/lecsArt.png",
      height: "400",
      width: "400"
    },
    {},
    {}
  )}</div> ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Open Lectures",
      icon: "lec",
      bg: "e66-c26"
    },
    {},
    {
      body: () => {
        return `<div class="lecture po-rel w-100" slot="body"><main class="fader o-1" style="transition: opacity 0.5s ease;"${add_attribute("this", fader, 0)}><div class="po-rel h-100"><div class="po-abs" style="left:5px;top: 100px;" data-svelte-h="svelte-1cbachr"><svg viewBox="0 0 32 32" size="svg" class="p-5 rx-5" bg="e66-c26"><path d="M20 30 L8 16 20 2"></path></svg></div> <div class="po-abs" style="right:5px;top: 100px;" data-svelte-h="svelte-14n9k3"><svg viewBox="0 0 32 32" size="svg" class="p-5 rx-5" bg="e66-c26"><path d="M12 30 L24 16 12 2"></path></svg></div></div> ${validate_component(Lectures, "LecTemp").$$render($$result, { lec }, {}, {})}</main></div>`;
      }
    }
  )} ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Open Source",
      icon: "git",
      bg: "e6e-954"
    },
    {},
    {
      body: () => {
        return `<div class="f-wrap jtx-ev" slot="body">${each(data.opensource, (osc) => {
          return `${!(osc.show === -1) ? `<a class="flex-col m-5"${add_attribute("href", osc.repo, 0)} style="height: 225px;align-items: center;"><img size="md-lg" class="rx-5"${add_attribute("src", osc.img, 0)} alt=""> <div class="w-100 tx-c">${escape(osc.title)}</div> </a>` : ``}`;
        })}</div>`;
      }
    }
  )} ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Podcast",
      icon: "cast",
      bg: "b5e-83c"
    },
    {},
    {
      body: () => {
        return `<div slot="body"><div class="lecture po-rel w-100" data-svelte-h="svelte-915esv"><img class="w-100 rx-5" src="${escape(base, true) + "/assets/images/podcast.png"}" alt="" style="max-height: 400px;"></div> <div class="flex p-20 jtx-ev">${each(data.podcast, (lnk) => {
          return `<a href="${"https://" + escape(lnk.link, true)}" class="p-5 rx-5" data-svelte-h="svelte-w9u0d2"><img class="h-a"${add_attribute("src", lnk.icon, 0)} alt="" style="width:40px;"> </a>`;
        })}</div></div>`;
      }
    }
  )} ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Celestia's Guide to the Universe",
      icon: "astronaut",
      bg: "66e-37f"
    },
    {},
    {
      body: () => {
        return `<div slot="body" data-svelte-h="svelte-r23f9w"><iframe src="https://edu.sedscelestia.org/examples/tor/lens.html" class="w-100 rx-5" title="GravLensing Sim" ht="300px" frameborder="0"></iframe> <i>Tap/Move Mouse to Try</i> <p>We conduct regular on campus observation sessions, which we are all
          unfortunately missing out on. This new year, we bring you Celestia&#39;s
          Guide to the Universe! A Virtual Guided Tour through universe, with
          the help of simulators like Space Engine .</p></div>`;
      }
    }
  )} ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Paper Presentation",
      icon: "scroll",
      bg: "69e-8ae"
    },
    {},
    {
      body: () => {
        return `<p class="tx-j" slot="body" data-svelte-h="svelte-1avl5il">Paper Presentation is about how you put your theme or present your topic
        before the audience. They see the manner in which you present your
        point, the manner in which you put your focus, your introduction style,
        your language and how promptly and effectively you answer their
        questions.</p>`;
      }
    }
  )} <div style="height:5em" data-svelte-h="svelte-bf86qs"> </div> ${validate_component(Mars, "Mars").$$render($$result, {}, {}, {})}</section></celestia-page>`;
});
export {
  Page as default
};
