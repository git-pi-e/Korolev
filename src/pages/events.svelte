<script>
  import Mars from "../micro/mars.svelte";
  import data from "../data/facc.json";
  import Containr from "../shared/Containr.svelte";

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
    return 0;
  };

  fetch(sheet)
    .then((r) => r.text())
    .then((r2) => {
      jsons = JSON.parse(csvtojson(r2)).filter((e) => e.featured);
      [lec, len] = [jsons[i], jsons.length];
      x = setInterval(() => {
        fader.style.opacity = 0;
        setTimeout(() => {
          go(1);
          fader.style.opacity = 1;
        }, 1e3);
      }, 5e3);
      return 0;
    });
</script>

<style type="text/scss">
  .lecture {
    img {
      max-height: 400px;
    }
    svg {
      width: 32px;
      height: 32px;
      stroke-width: 3;
    }
  }
  .pj {
    cursor: pointer;
    height: 225px;
    flex-direction: column;
    align-items: center;
  }
  .pcd {
    padding: 5px 10px;
    &:hover {
      background: #c8e;
    }
  }
  .fader {
    opacity: 1;
    transition: opacity 0.5s ease;
  }
</style>

<celestia-page>
  <section class="adaptive">
    <h1 class="tx-c po-stx p-10 z-4" style="top: 0px;" bg="000-nil">Events</h1>
    <Containr title="Open Lectures" icon="lec" bg="e66-c26">
      <div class="lecture po-rel w-100" slot="body">
        <div class="po-rel h-100">
          <div
            class="po-abs"
            style="left:5px;top: 150px;"
            on:click={() => go(-1, 1)}>
            <svg viewBox="0 0 32 32" class="p-5 rx-5" bg="e66-c26">
              <path d="M20 30 L8 16 20 2" />
            </svg>
          </div>
          <div
            class="po-abs"
            style="right:5px;top: 150px;"
            on:click={() => go(1, 1)}>
            <svg viewBox="0 0 32 32" class="p-5 rx-5" bg="e66-c26">
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
      <div class="f-wrap jtx-ev" slot="body">
        {#each data.opensource as osc}
          {#if !(osc.show === -1)}
            <a class="pj m-5" href={osc.repo}>
              <img size="md-lg" class="rx-5" src={osc.img} alt="" />
              <div class="w-100 tx-c">{osc.title}</div>
            </a>
          {/if}
        {/each}
      </div>
    </Containr>

    <Containr title="Podcast" icon="cast" bg="b5e-83c">
      <div slot="body">
        <div class="lecture po-rel w-100">
          <img class="w-100 rx-5" src="./assets/images/podcast.png" alt="" />
        </div>
        <div class="flex p-20 jtx-ev">
          {#each data.podcast as lnk}
            <a href="https://{lnk.link}" class="pcd rx-5">
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
          class="w-100 rx-5"
          title="GravLensing Sim"
          frameborder="0"
          style="min-height:300px;" />
        <p>
          We conducts regular on campus observation sessions, which we are all
          unfortunately missing out on. This new year, we bring you Celestia's
          Guide to the Universe! A Virtual Guided Tour through universe, with
          the help of simulators like Space Engine .
        </p>
      </div>
    </Containr>

    <Containr title="Paper Presentation" icon="scroll" bg="69e-8ae">
      <p class="tx-j" slot="body">
        Paper Presentation is about how you put your theme or present your topic
        before the audience. They see the manner in which you present your
        point, the manner in which you put your focus, your introduction style,
        your language and how promptly and effectively you answer their
        questions.
      </p>
    </Containr>

    <div style="height:5em">&nbsp;</div>
    <Mars />
  </section>
</celestia-page>
