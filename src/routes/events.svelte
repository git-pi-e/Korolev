<script>
  import Mars from "$lib/components/macro/mars.svelte";
  import data from "$lib/data/facc";
  import Containr from "$lib/shared/Containr.svelte";
  import Canvas from "$lib/shared/canvas.svelte";

  import LecTemp from "$lib/components/micro/lectures.svelte";
  import { onMount } from "svelte";
  import { base } from "$app/paths";

  let sheet;
  let //
    i = 0,
    jsons,
    fader,
    len = 0,
    x,
    lec;

  const go = (dir, fst = 0) => {
    if (x && fst) clearInterval(x);
    i = (i + +dir) % len;
    lec = jsons[i];
    return 0;
  };

  onMount(() => {
    sheet = atob(
      "aHR0cHM6Ly9kb2NzLmdvb2dsZS5jb20vc3ByZWFkc2hlZXRzL2QvMUp6dkhRM1hOZEphUHFSVm8tSzZBWmlsbHFYRUZGZG80NTBQLS1Xb3E0UUUvZ3Zpei90cT90cXg9b3V0OmNzdiZzaGVldD1Lb3JvbGV2LUxlY3R1cmVzLUFQSQ=="
    );

    fetch(sheet)
      .then((r) => r.text())
      .then((r2) => {
        jsons = JSON.parse(csvtojson(r2)).filter((e) => e.featured === "1");
        [lec, len] = [jsons[i], jsons.length];
        x = setInterval(() => {
          fader.style.opacity = 0;
          setTimeout(() => {
            go(1);
            fader.style.opacity = 1;
          }, 1e3);
        }, 5e3);
        jsons.forEach((e) => {
          let img = new Image();
          img.src = e.image;
        });
        return 0;
      });
  });
</script>

<title>Events | SEDS Celestia</title>

<celestia-page>
  <h1 class="tx-c po-stx z-4 m-0" style="top: 0;" bg="000-nil">Events</h1>
  <section class="adaptive">
    <div
      size="max"
      class="m-h-auto"
      style="animation: float 6s ease-in-out infinite;"
    >
      <Canvas
        image="{base}/assets/onthehouse/lecsArt.png"
        height="400"
        width="400"
      />
    </div>
    <Containr title="Open Lectures" icon="lec" bg="e66-c26">
      <div class="lecture po-rel w-100" slot="body">
        <main
          class="fader o-1"
          bind:this={fader}
          style="transition: opacity 0.5s ease;"
        >
          <div class="po-rel h-100">
            <div
              class="po-abs"
              style="left:5px;top: 100px;"
              on:click={() => go(-1, 1)}
            >
              <svg viewBox="0 0 32 32" size="svg" class="p-5 rx-5" bg="e66-c26">
                <path d="M20 30 L8 16 20 2" />
              </svg>
            </div>
            <div
              class="po-abs"
              style="right:5px;top: 100px;"
              on:click={() => go(1, 1)}
            >
              <svg viewBox="0 0 32 32" size="svg" class="p-5 rx-5" bg="e66-c26">
                <path d="M12 30 L24 16 12 2" />
              </svg>
            </div>
          </div>
          <LecTemp {lec} />
        </main>
      </div>
    </Containr>

    <Containr title="Open Source" icon="git" bg="e6e-954">
      <div class="f-wrap jtx-ev" slot="body">
        {#each data.opensource as osc}
          {#if !(osc.show === -1)}
            <a
              class="flex-col m-5"
              href={osc.repo}
              style="height: 225px;align-items: center;"
            >
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
          <img
            class="w-100 rx-5"
            src="{base}/assets/images/podcast.png"
            alt=""
            style="max-height: 400px;"
          />
        </div>
        <div class="flex p-20 jtx-ev">
          {#each data.podcast as lnk}
            <a href="https://{lnk.link}" class="p-5 rx-5">
              <img class="h-a" src={lnk.icon} alt="" style="width:40px;" />
            </a>
          {/each}
        </div>
      </div>
    </Containr>

    <Containr
      title="Celestia’s Guide to the Universe"
      icon="astronaut"
      bg="66e-37f"
    >
      <div slot="body">
        <iframe
          src="https://edu.sedscelestia.org/examples/tor/lens.html"
          class="w-100 rx-5"
          title="GravLensing Sim"
          ht="300px"
          frameborder="0"
        />
        <i>Tap/Move Mouse to Try</i>
        <p>
          We conduct regular on campus observation sessions, which we are all
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
