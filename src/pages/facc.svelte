<script>
  import Mars from "../micro/mars.svelte";
  import data from "../data/facc.json";
  import Containr from "../shared/gradCont.svelte";

  import { sheet, csvtojson, base, template } from "../code/functions";

  let //
    i = 0,
    jsons,
    fader,
    len = 0,
    x,
    lec = base;

  const go = (dir, fst = 0) => {
    if (x && fst) clearInterval(x);
    i = (i + +dir) % len;
    lec = jsons[i];
  };

  fetch(sheet)
    .then((r) => r.text())
    .then((r2) => {
      jsons = JSON.parse(csvtojson(r2)).filter((e) => e.featured);
      lec = jsons[i];
      len = jsons.length;
      jsons.forEach((e) => {
        let img = new Image();
        img.src = e.url;
      });
      x = setInterval(() => {
        fader.style.opacity = 0;
        setTimeout(() => {
          go(1);
          fader.style.opacity = 1;
        }, 1e3);
      }, 5e3);
    });
</script>

<style type="text/scss">
  .lecture {
    position: relative;
    img {
      max-height: 400px;
      border-radius: 5px;
    }
    svg {
      width: 32px;
      height: 32px;
      stroke-width: 3;
      fill: none;
    }
  }
  .pj {
    cursor: pointer;
    height: 225px;
    flex-direction: column;
    align-items: center;
    img {
      width: 175px;
      height: 175px;
      border-radius: 5px;
    }
  }
  .pcd {
    border-radius: 5px;
    padding: 5px 10px;
    &:hover {
      background: #c8e;
    }
  }
  .arrs{
    position: absolute;
    top: 50%;
  }
  .fader {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
</style>

<celestia-page>
  <section class="adaptive">
    <Containr title="Open Lectures" icon="lec" bg="e66-c26">
      <div class="lecture w-100" slot="body">
        <div style="position:relative;height:100%''">
          <div class="arrs"
            style="left:-20px;"
            on:click={() => go(-1, 1)}>
            <svg viewBox="0 0 32 32">
              <path d="M20 30 L8 16 20 2" />
            </svg>
          </div>
          <div class="arrs"
            style="right:-20px;"
            on:click={() => go(1, 1)}>
            <svg viewBox="0 0 32 32">
              <path d="M12 30 L24 16 12 2" />
            </svg>
          </div>
        </div>
        <main class="fader" bind:this={fader}>
          {@html template(lec)}
        </main>
      </div>
    </Containr>

    <Containr title="Open Source" icon="git" bg="e6e-954">
      <div
        class="flex f-wrap"
        style="justify-content:space-evenly;"
        slot="body">
        {#each data.opensource as osc}
          {#if !(osc.show === -1)}
            <a class="pj m-5px" href={osc.repo}>
              <img src={osc.img} alt="" />
              <div class="w-100 tx-c">{osc.title}</div>
            </a>
          {/if}
        {/each}
      </div>
    </Containr>

    <Containr title="Podcast" icon="cast" bg="b5e-83c">
      <div slot="body">
        <div class="lecture w-100">
          <img class="w-100" src="./assets/images/podcast.png" alt="" />
        </div>
        <div class="flex p-20px" style="justify-content:space-evenly;">
          {#each data.podcast as lnk}
            <a href="https://{lnk.link}" class="pcd">
              <img class="h-a" src={lnk.icon} alt="" style="width:40px;" />
            </a>
          {/each}
        </div>
      </div>
    </Containr>

    <Containr
      title="Celestia’s Guide to the Universe"
      icon="astronaut"
      bg="66e-37f">
      <div slot="body">
        <iframe
          src="https://educelestia.herokuapp.com/examples/tor/lens.html"
          class="w-100"
          title="GravLensing Sim"
          frameborder="0"
          style="border-radius:5px;min-height:300px;" />
        <p>
          We conducts regular on campus observation sessions, which we are all
          unfortunately missing out on. This new year, we bring you Celestia's
          Guide to the Universe! A Virtual Guided Tour through universe, with
          the help of simulators like Space Engine .
        </p>
      </div>
    </Containr>

    <div style="height:5em">&nbsp;</div>
    <Mars />
  </section>
</celestia-page>
