import { c as create_ssr_component, d as add_attribute, v as validate_component, e as each, b as escape } from "../../../chunks/ssr.js";
import { C as Canvas } from "../../../chunks/canvas.js";
import { I as Image } from "../../../chunks/image.js";
import { C as Containr } from "../../../chunks/slider.svelte_svelte_type_style_lang.js";
import { b as base } from "../../../chunks/paths.js";
const css$1 = {
  code: ".container.svelte-1hohhhy{background-blend-mode:darken;transition:3s ease}",
  map: '{"version":3,"file":"slider.svelte","sources":["slider.svelte"],"sourcesContent":["<script>\\n  import { onMount } from \\"svelte\\";\\n  export let //\\n    width = \\"100%\\",\\n    height = \\"400px\\",\\n    speed = 2,\\n    images = [];\\n\\n  let container;\\n\\n  function backgroundSequence() {\\n    window.clearTimeout();\\n    let k = 0;\\n    for (let i = 0; i < images.length; i++) {\\n      setTimeout(() => {\\n        container.style.background = `url(${images[k]}) no-repeat`;\\n        container.style.backgroundSize = \\"cover\\";\\n        k + 1 === images.length\\n          ? setTimeout(backgroundSequence, speed * 1e3)\\n          : k++;\\n      }, speed * 1e3 * i);\\n    }\\n    return 0;\\n  }\\n\\n  onMount(() => {\\n    images.forEach((img) => (new Image().src = img));\\n    backgroundSequence();\\n  });\\n<\/script>\\n\\n<div\\n  class=\\"container po-rel\\"\\n  style={`height:${height};width:${width};background:url(${images[0]}) no-repeat`}\\n  bind:this={container}\\n>\\n  <div class=\\"content w-100 h-100 z-1\\">\\n    <slot name=\\"internal\\" />\\n  </div>\\n</div>\\n\\n<style>\\n  .container {\\n    background-blend-mode: darken;\\n    transition: 3s ease;\\n  }\\n</style>\\n"],"names":[],"mappings":"AA0CE,yBAAW,CACT,qBAAqB,CAAE,MAAM,CAC7B,UAAU,CAAE,EAAE,CAAC,IACjB"}'
};
const Slider = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { width = "100%", height = "400px", speed = 2, images = [] } = $$props;
  let container;
  if ($$props.width === void 0 && $$bindings.width && width !== void 0) $$bindings.width(width);
  if ($$props.height === void 0 && $$bindings.height && height !== void 0) $$bindings.height(height);
  if ($$props.speed === void 0 && $$bindings.speed && speed !== void 0) $$bindings.speed(speed);
  if ($$props.images === void 0 && $$bindings.images && images !== void 0) $$bindings.images(images);
  $$result.css.add(css$1);
  return `<div class="container po-rel svelte-1hohhhy"${add_attribute("style", `height:${height};width:${width};background:url(${images[0]}) no-repeat`, 0)}${add_attribute("this", container, 0)}><div class="content w-100 h-100 z-1">${slots.internal ? slots.internal({}) : ``}</div> </div>`;
});
const Events = [
  {
    title: "March Equinox",
    date: "20 March 2021",
    time: "1457 Kolkata/Asia",
    desc: "The Sun will shine directly on the equator and there will be nearly equal amounts of day and night throughout the world",
    misc: "This is also the first day of spring (vernal equinox) in the Northern Hemisphere and the first day of fall (autumnal equinox) in the Southern Hemisphere."
  },
  {
    title: "Lyrids Meteor Shower",
    date: "22 April 2021",
    time: "All night",
    desc: "The Lyrids is an average shower, usually producing about 20 meteors per hour at its peak. ",
    misc: "It is produced by dust particles left behind by comet C/1861 G1 Thatcher, which was discovered in 1861"
  },
  {
    title: "Eta Aquarids Meteor Shower",
    date: "6 May 2021",
    time: "All night",
    desc: "The Eta Aquarids is an above average shower, capable of producing up to 60 meteors per hour at its peak.",
    misc: "It is produced by dust particles left behind by comet Halley, which has been observed since ancient times."
  },
  {
    title: "Total Lunar Eclipse",
    date: "26 May 2021",
    time: "Night",
    desc: "A total lunar eclipse occurs when the Moon passes completely through the Earth's dark shadow, or umbra. During this type of eclipse, the Moon will gradually get darker and then take on a rusty or blood red color",
    misc: "The eclipse will be visible throughout the Pacific Ocean and parts of eastern Asia, Japan, Australia, and western North America."
  },
  {
    title: "Annular Solar Eclipse",
    date: "10 June 2021",
    time: "Day",
    desc: "An annular solar eclipse occurs when the Moon is too far away from the Earth to completely cover the Sun. This results in a ring of light around the darkened Moon",
    misc: "Viewing Regions will be Russia, the Arctic Ocean, western Greenland, and Canada"
  },
  {
    title: "June Solistice",
    date: "21 June 2021",
    time: "0851 Kolkata/Asia",
    desc: " The North Pole of the earth will be tilted toward the Sun, which will have reached its northernmost position in the sky and will be directly over the Tropic of Cancer at 23.44 degrees north latitude",
    misc: "This is the first day of summer (summer solstice) in the Northern Hemisphere and the first day of winter (winter solstice) in the Southern Hemisphere"
  },
  {
    title: " Delta Aquarids Meteor Showe",
    date: "29 July 2021",
    time: "All Day",
    desc: "The Delta Aquarids is an average shower that can produce up to 20 meteors per hour at its peak",
    misc: " It is produced by debris left behind by comets Marsden and Kracht"
  },
  {
    title: "Saturn at Opposition",
    date: "2 Aug 2021",
    time: "Day",
    desc: "The ringed planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun",
    misc: "his is the best time to view and photograph Saturn and its moons"
  },
  {
    title: " Perseids Meteor Shower",
    date: "13 Aug 2021",
    time: "1470 Kolkata/Asia",
    desc: "The Perseids is one of the best meteor showers to observe, producing up to 60 meteors per hour at its peak",
    misc: " It is produced by comet Swift-Tuttle, which was discovered in 1862"
  },
  {
    title: "Jupiter at Opposition",
    date: "19 Aug 2021",
    time: "All Day",
    desc: " The giant planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun. It will be brighter than any other time of the year and will be visible all night long",
    misc: "A good pair of binoculars should allow you to see Jupiter's four largest moons, appearing as bright dots on either side of the planet"
  },
  {
    title: "Neptune at Opposition",
    date: "14 Sep 2021",
    time: "All Day",
    desc: " The blue giant planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun. It will be brighter than any other time of the year and will be visible all night long",
    misc: "Due to its extreme distance from Earth, it will only appear as a tiny blue dot in all but the most powerful telescopes"
  },
  {
    title: "September Equinox",
    date: "22 Sep 2021",
    time: "0041 Kolkata/Asia",
    desc: "The Sun will shine directly on the equator and there will be nearly equal amounts of day and night throughout the world",
    misc: "This is also the first day of fall (autumnal equinox) in the Northern Hemisphere and the first day of spring (vernal equinox) in the Southern Hemisphere."
  },
  {
    title: "Draconids Meteor Shower",
    date: "7 Oct 2021",
    time: "Early evening",
    desc: " The Draconids is a minor meteor shower producing only about 10 meteors per hour.",
    misc: " It is produced by dust grains left behind by comet 21P Giacobini-Zinner, which was first discovered in 1900."
  },
  {
    title: "Orionids Meteor Shower",
    date: "21 Oct 2021",
    time: "1470 Kolkata/Asia",
    desc: "The Orionids is an average shower producing up to 20 meteors per hour at its peak",
    misc: " It is produced by dust grains left behind by comet Halley, which has been known and observed since ancient times"
  },
  {
    title: "Taurids Meteor Shower",
    date: "4 Nov 2021",
    time: "All Night",
    desc: "The Taurids is a long-running minor meteor shower producing only about 5-10 meteors per hour. It is unusual in that it consists of two separate streams",
    misc: "The first is produced by dust grains left behind by Asteroid 2004 TG10. The second stream is produced by debris left behind by Comet 2P Encke"
  },
  {
    title: "Uranus at Opposition",
    date: "5 Nov 2021",
    time: "All Day",
    desc: "he blue-green planet will be at its closest approach to Earth and its face will be fully illuminated by the Sun. It will be brighter than any other time of the year and will be visible all night long",
    misc: "This is the best time to view Uranus. Due to its distance, it will only appear as a tiny blue-green dot"
  },
  {
    title: "Leonids Meteor Shower",
    date: "17 Feb 2021",
    time: "All Night",
    desc: "The Leonids is an average shower, producing up to 15 meteors per hour at its peak. This shower is unique in that it has a cyclonic peak about every 33 years where hundreds of meteors per hour can be seen. That last of these occurred in 2001",
    misc: "The Leonids is produced by dust grains left behind by comet Tempel-Tuttle, which was discovered in 1865"
  },
  {
    title: "Partial Lunar Eclipse",
    date: "19 Nov 2021",
    time: "Night",
    desc: "A partial lunar eclipse occurs when the Moon passes through the Earth's partial shadow, or penumbra, and only a portion of it passes through the darkest shadow, or umbra. During this type of eclipse a part of the Moon will darken as it moves through the Earth's shadow",
    misc: " The eclipse will be visible throughout most of eastern Russia, Japan, the Pacific Ocean, North America, Mexico, Central America, and parts of western South America"
  },
  {
    title: "Total Solar Eclipse",
    date: "4 Dec 2021",
    time: "Day",
    desc: "A total solar eclipse occurs when the moon completely blocks the Sun, revealing the Sun's beautiful outer atmosphere known as the corona",
    misc: "The path of totality will for this eclipse will be limited to Antarctica and the southern Atlantic Ocean"
  },
  {
    title: "Geminids Meteor Shower",
    date: "13 Dec 2021",
    time: "Evening",
    desc: "The Geminids is the king of the meteor showers. It is considered by many to be the best shower in the heavens, producing up to 120 multicolored meteors per hour at its peak",
    misc: "It is produced by debris left behind by an asteroid known as 3200 Phaethon, which was discovered in 1982"
  },
  {
    title: "December Solstice",
    date: "21 Dec 2021",
    time: "2120 Kolkata/Asia",
    desc: "The South Pole of the earth will be tilted toward the Sun, which will have reached its southernmost position in the sky and will be directly over the Tropic of Capricorn at 23.44 degrees south latitude",
    misc: "This is the first day of winter (winter solstice) in the Northern Hemisphere and the first day of summer (summer solstice) in the Southern Hemisphere"
  },
  {
    title: "Ursids Meteor Shower",
    date: "22 Dec 2021",
    time: "Night",
    desc: "The Ursids is a minor meteor shower producing about 5-10 meteors per hour",
    misc: " It is produced by dust grains left behind by comet Tuttle, which was first discovered in 1790"
  }
];
const telescopes = [
  {
    title: "Celestron Astromaster 130EQ",
    img: "/assets/obs/celestron.jpg",
    star: "f/7.87",
    range: "18x - 300x"
  },
  {
    title: 'Sky-Watcher Dobsonian 8" Traditional',
    img: "/assets/obs/dobbynew.jpeg",
    star: "f/5.9",
    range: "1x - 409x"
  },
  {
    title: 'Sky-Watcher Dobsonian 6" Traditional',
    img: "/assets/obs/dobbyold.jpeg",
    star: "f/7.8",
    range: "1x - 306x"
  }
];
const data = {
  telescopes
};
const css = {
  code: ".stpty.svelte-w847cd{background:radial-gradient(rgba(0, 0, 0, 0.7333333333), rgba(0, 0, 0, 0.1333333333));width:calc(100% - 50px);height:calc(100% - 50px);border:5px solid #fff;align-items:center}@media(max-width: 600px){.stpty.svelte-w847cd{font-size:12px}}@media(max-width: 400px){#art.svelte-w847cd{transform:scale(0.8) translateX(-5%)}}",
  map: `{"version":3,"file":"+page.svelte","sources":["+page.svelte"],"sourcesContent":["<script>\\n\\tconst options = {\\n\\t\\tweekday: 'short',\\n\\t\\tyear: 'numeric',\\n\\t\\tmonth: 'short',\\n\\t\\tday: 'numeric'\\n\\t};\\n\\n\\timport Events from '$lib/data/events';\\n\\timport data from '$lib/data/lookUp';\\n\\timport { Canvas, Containr, Imgr, Slidr } from '$lib/shared';\\n\\timport { base } from '$app/paths';\\n<\/script>\\n\\n<title>Observations | SEDS Celestia</title>\\n<celestia-page>\\n\\t<h1 class=\\"tx-c po-stx z-4 m-0\\" style=\\"top: 0;\\" bg=\\"000-nil\\">Observations</h1>\\n\\t<section class=\\"adaptive\\">\\n\\t\\t<div id=\\"art\\" size=\\"max\\" class=\\"m-h-auto\\" style=\\"margin-bottom:10px;\\">\\n\\t\\t\\t<Canvas image=\\"{base}/assets/onthehouse/obsArt.png\\" bg=\\"0008\\" height=\\"400\\" width=\\"400\\" />\\n\\t\\t</div>\\n\\t\\t<Containr title=\\"Telescopes\\" icon=\\"sat\\" bg=\\"66e-37f\\">\\n\\t\\t\\t<div slot=\\"body\\">\\n\\t\\t\\t\\t{#each data.telescopes as tsc}\\n\\t\\t\\t\\t\\t<Imgr\\n\\t\\t\\t\\t\\t\\tsrc={tsc.img}\\n\\t\\t\\t\\t\\t\\tplacements={{\\n\\t\\t\\t\\t\\t\\t\\ttopRight: tsc.star + ' ' + tsc.range,\\n\\t\\t\\t\\t\\t\\t\\tbottomLeft: tsc.title\\n\\t\\t\\t\\t\\t\\t}}\\n\\t\\t\\t\\t\\t/>\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</div>\\n\\t\\t</Containr>\\n\\n\\t\\t<article class=\\"p-0 m-h-auto bg-cov tx-c\\">\\n\\t\\t\\t<Slidr\\n\\t\\t\\t\\tspeed={4}\\n\\t\\t\\t\\timages={[...Array(5)].map((e, i) => \`./assets/obs/astro-ph/\${i}.jpeg\`)}\\n\\t\\t\\t\\theight=\\"350px\\"\\n\\t\\t\\t>\\n\\t\\t\\t\\t<div slot=\\"internal\\" class=\\"w-100 p-20 m-0 flex-col jtx-ct f-wt1 stpty\\">\\n\\t\\t\\t\\t\\t<div style=\\"font-size:3em\\">Astrophotography</div>\\n\\t\\t\\t\\t\\t<p class=\\"f-wt3\\">Its just what it sounds like. <br /></p>\\n\\t\\t\\t\\t\\t<!-- <a href=\\"/astro-rules.html\\" class=\\"btn-std\\" style=\\"height:auto;\\">Rules\\n            &rarr;</a> -->\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</Slidr>\\n\\t\\t</article>\\n\\n\\t\\t<Containr title=\\"Upcoming in Space\\" icon=\\"meteor\\" bg=\\"e6e-954\\">\\n\\t\\t\\t<div slot=\\"body\\">\\n\\t\\t\\t\\t{#each Events.filter((e) => new Date(e.date) - new Date() > 0) as event, i}\\n\\t\\t\\t\\t\\t{#if i < 2}\\n\\t\\t\\t\\t\\t\\t<div>\\n\\t\\t\\t\\t\\t\\t\\t<span style=\\"font-size:1.2em;\\">\\n\\t\\t\\t\\t\\t\\t\\t\\t<strong>\\n\\t\\t\\t\\t\\t\\t\\t\\t\\t{new Date(event.date).toLocaleDateString('en-UK', options)} - {event.time}</strong\\n\\t\\t\\t\\t\\t\\t\\t\\t>\\n\\t\\t\\t\\t\\t\\t\\t\\t<i style=\\"color:#eeec\\">{event.title}</i>\\n\\t\\t\\t\\t\\t\\t\\t</span>\\n\\t\\t\\t\\t\\t\\t\\t<p>{event.desc} <br /> {event.misc}</p>\\n\\t\\t\\t\\t\\t\\t</div>\\n\\t\\t\\t\\t\\t{/if}\\n\\t\\t\\t\\t{/each}\\n\\t\\t\\t</div>\\n\\t\\t</Containr>\\n\\n\\t\\t<article class=\\"p-0 m-h-auto bg-cov tx-c\\">\\n\\t\\t\\t<Slidr\\n\\t\\t\\t\\tspeed={4}\\n\\t\\t\\t\\timages={[...Array(7)].map((e, i) => \`./assets/obs/stpty/\${i}.jpg\`)}\\n\\t\\t\\t\\theight=\\"350px\\"\\n\\t\\t\\t>\\n\\t\\t\\t\\t<div slot=\\"internal\\" class=\\"w-100 p-20 m-0 flex-col jtx-ct f-wt1 stpty\\">\\n\\t\\t\\t\\t\\t<div style=\\"font-size:3em\\">Looking Up, All Night</div>\\n\\t\\t\\t\\t\\t<p class=\\"f-wt3\\">\\n\\t\\t\\t\\t\\t\\tEvery Year. All Night. A Fire, Maggi, Telescopes &amp; Stars. <br />\\n\\t\\t\\t\\t\\t\\tLovingly called as \\"star party\\".\\n\\t\\t\\t\\t\\t</p>\\n\\t\\t\\t\\t</div>\\n\\t\\t\\t</Slidr>\\n\\t\\t</article>\\n\\t</section>\\n</celestia-page>\\n\\n<style type=\\"text/scss\\" lang=\\"scss\\">.stpty {\\n  background: radial-gradient(rgba(0, 0, 0, 0.7333333333), rgba(0, 0, 0, 0.1333333333));\\n  width: calc(100% - 50px);\\n  height: calc(100% - 50px);\\n  border: 5px solid #fff;\\n  align-items: center;\\n}\\n\\n@media (max-width: 600px) {\\n  .stpty {\\n    font-size: 12px;\\n  }\\n}\\n@media (max-width: 400px) {\\n  #art {\\n    transform: scale(0.8) translateX(-5%);\\n  }\\n}</style>\\n"],"names":[],"mappings":"AAsFoC,oBAAO,CACzC,UAAU,CAAE,gBAAgB,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,YAAY,CAAC,CAAC,CAAC,KAAK,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,CAAC,YAAY,CAAC,CAAC,CACrF,KAAK,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CACxB,MAAM,CAAE,KAAK,IAAI,CAAC,CAAC,CAAC,IAAI,CAAC,CACzB,MAAM,CAAE,GAAG,CAAC,KAAK,CAAC,IAAI,CACtB,WAAW,CAAE,MACf,CAEA,MAAO,YAAY,KAAK,CAAE,CACxB,oBAAO,CACL,SAAS,CAAE,IACb,CACF,CACA,MAAO,YAAY,KAAK,CAAE,CACxB,kBAAK,CACH,SAAS,CAAE,MAAM,GAAG,CAAC,CAAC,WAAW,GAAG,CACtC,CACF"}`
};
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric"
  };
  $$result.css.add(css);
  return `<title data-svelte-h="svelte-etezyq">Observations | SEDS Celestia</title> <celestia-page><h1 class="tx-c po-stx z-4 m-0" style="top: 0;" bg="000-nil" data-svelte-h="svelte-1h6xjo0">Observations</h1> <section class="adaptive"><div id="art" size="max" class="m-h-auto svelte-w847cd" style="margin-bottom:10px;">${validate_component(Canvas, "Canvas").$$render(
    $$result,
    {
      image: base + "/assets/onthehouse/obsArt.png",
      bg: "0008",
      height: "400",
      width: "400"
    },
    {},
    {}
  )}</div> ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Telescopes",
      icon: "sat",
      bg: "66e-37f"
    },
    {},
    {
      body: () => {
        return `<div slot="body">${each(data.telescopes, (tsc) => {
          return `${validate_component(Image, "Imgr").$$render(
            $$result,
            {
              src: tsc.img,
              placements: {
                topRight: tsc.star + " " + tsc.range,
                bottomLeft: tsc.title
              }
            },
            {},
            {}
          )}`;
        })}</div>`;
      }
    }
  )} <article class="p-0 m-h-auto bg-cov tx-c">${validate_component(Slider, "Slidr").$$render(
    $$result,
    {
      speed: 4,
      images: [...Array(5)].map((e, i) => `./assets/obs/astro-ph/${i}.jpeg`),
      height: "350px"
    },
    {},
    {
      internal: () => {
        return `<div slot="internal" class="w-100 p-20 m-0 flex-col jtx-ct f-wt1 stpty svelte-w847cd" data-svelte-h="svelte-1pd7xc0"><div style="font-size:3em">Astrophotography</div> <p class="f-wt3">Its just what it sounds like. <br></p> </div>`;
      }
    }
  )}</article> ${validate_component(Containr, "Containr").$$render(
    $$result,
    {
      title: "Upcoming in Space",
      icon: "meteor",
      bg: "e6e-954"
    },
    {},
    {
      body: () => {
        return `<div slot="body">${each(Events.filter((e) => new Date(e.date) - /* @__PURE__ */ new Date() > 0), (event, i) => {
          return `${i < 2 ? `<div><span style="font-size:1.2em;"><strong>${escape(new Date(event.date).toLocaleDateString("en-UK", options))} - ${escape(event.time)}</strong> <i style="color:#eeec">${escape(event.title)}</i></span> <p>${escape(event.desc)} <br> ${escape(event.misc)}</p> </div>` : ``}`;
        })}</div>`;
      }
    }
  )} <article class="p-0 m-h-auto bg-cov tx-c">${validate_component(Slider, "Slidr").$$render(
    $$result,
    {
      speed: 4,
      images: [...Array(7)].map((e, i) => `./assets/obs/stpty/${i}.jpg`),
      height: "350px"
    },
    {},
    {
      internal: () => {
        return `<div slot="internal" class="w-100 p-20 m-0 flex-col jtx-ct f-wt1 stpty svelte-w847cd" data-svelte-h="svelte-1kiqwsw"><div style="font-size:3em">Looking Up, All Night</div> <p class="f-wt3">Every Year. All Night. A Fire, Maggi, Telescopes &amp; Stars. <br>
						Lovingly called as &quot;star party&quot;.</p></div>`;
      }
    }
  )}</article></section> </celestia-page>`;
});
export {
  Page as default
};
