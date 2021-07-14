<script>
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  import Events from "$lib/data/events";
  import data from "$lib/data/lookUp";
  import Slidr from "$lib/shared/slider.svelte";
  import Containr from "$lib/shared/Containr.svelte";
  import Imgr from "$lib/shared/image.svelte";
  import Canvas from "$lib/shared/canvas.svelte";
  import { base } from "$app/paths";
</script>
<title>Observations | SEDS Celestia</title>
<celestia-page>
  <h1 class="tx-c po-stx z-4 m-0" style="top: 0;" bg="000-nil">Observations</h1>
  <section class="adaptive">
    <div id="art" size="max" class="m-h-auto" style="margin-bottom:10px;">
      <Canvas
        image="{base}/assets/onthehouse/obsArt.png"
        bg="0008"
        height="400"
        width="400"
      />
    </div>
    <Containr title="Telescopes" icon="sat" bg="66e-37f">
      <div slot="body">
        {#each data.telescopes as tsc}
          <Imgr
            src={tsc.img}
            placements={{
              topRight: tsc.star + " " + tsc.range,
              bottomLeft: tsc.title,
            }}
          />
        {/each}
      </div>
    </Containr>

    <article class="p-0 m-h-auto bg-cov tx-c">
      <Slidr
        speed={4}
        images={[...Array(5)].map((e, i) => `./assets/obs/astro-ph/${i}.jpeg`)}
        height="350px"
      >
        <div slot="internal" class="w-100 p-20 m-0 flex-col jtx-ct f-wt1 stpty">
          <div style="font-size:3em">Astrophotography</div>
          <p class="f-wt3">Its just what it sounds like. <br /></p>
          <!-- <a href="/astro-rules.html" class="btn-std" style="height:auto;">Rules
            &rarr;</a> -->
        </div>
      </Slidr>
    </article>

    <Containr title="Upcoming in Space" icon="meteor" bg="e6e-954">
      <div slot="body">
        {#each Events.filter((e) => new Date(e.date) - new Date() > 0) as event, i}
          {#if i < 2}
            <div>
              <span style="font-size:1.2em;">
                <strong>
                  {new Date(event.date).toLocaleDateString("en-UK", options)} - {event.time}</strong
                >
                <i style="color:#eeec">{event.title}</i>
              </span>
              <p>{event.desc} <br /> {event.misc}</p>
            </div>
          {/if}
        {/each}
      </div>
    </Containr>

    <article class="p-0 m-h-auto bg-cov tx-c">
      <Slidr
        speed={4}
        images={[...Array(7)].map((e, i) => `./assets/obs/stpty/${i}.jpg`)}
        height="350px"
      >
        <div slot="internal" class="w-100 p-20 m-0 flex-col jtx-ct f-wt1 stpty">
          <div style="font-size:3em">Looking Up, All Night</div>
          <p class="f-wt3">
            Every Year. All Night. A Fire, Maggi, Telescopes &amp; Stars. <br />
            Lovingly called as "star party".
          </p>
        </div>
      </Slidr>
    </article>
  </section>
</celestia-page>

<style type="text/scss">
  .stpty {
    background: radial-gradient(#000b, #0002);
    width: calc(100% - 50px);
    height: calc(100% - 50px);
    border: 5px solid #fff;
    align-items: center;
  }
  @media (max-width: 600px) {
    .stpty {
      font-size: 12px;
    }
  }
  @media (max-width: 400px) {
    #art {
      transform: scale(0.8) translateX(-5%);
    }
  }
</style>
