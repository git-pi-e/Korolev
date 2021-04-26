<script>
  const options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  import Events from "../data/events.json";
  import data from "../data/lookUp.json";
  import Slidr from "../shared/slider.svelte";
  import Containr from "../shared/Containr.svelte";
  import Image from "../shared/image.svelte";
</script>

<style type="text/scss">
  .stpty {
    background: radial-gradient(#000b, #0002);
    width: calc(100% - 50px);
    height: calc(100% - 50px);
    border: 5px solid #fff;
    align-items: center;
    font-size: 16px;
  }
  @media (max-width: 768px) {
    .stpty {
      font-size: 12px;
    }
  }
</style>

<celestia-page>
  <section class="adaptive">
    <h1 class="tx-c po-stx p-10 z-4" style="top: 0px;" bg="000-nil">
      Observations
    </h1>
    <div class="tx-c">
      <img
        src="./assets/onthehouse/obsArt.png"
        size="max"
        class="rx-max m-10"
        style="box-shadow: -5px 0 10px 10px #0006"
        alt="" />
    </div>
    <Containr title="Telescopes" icon="sat" bg="66e-37f">
      <div slot="body">
        {#each data.telescopes as tsc}
          <Image
            src={tsc.img}
            placements={{ topRight: tsc.star + ' ' + tsc.range, bottomLeft: tsc.title }} />
        {/each}
      </div>
    </Containr>

    <article class="p-0 m-h-auto bg-cov tx-c">
      <Slidr
        speed={4}
        images={[...Array(5)].map((e, i) => `./assets/obs/astro-ph/${i}.jpeg`)}
        height="350px">
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
                  {new Date(event.date).toLocaleDateString('en-UK', options)} - {event.time}</strong>
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
        height="350px">
        <div slot="internal" class="w-100 p-20 m-0 flex-col f-wt1 stpty">
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
