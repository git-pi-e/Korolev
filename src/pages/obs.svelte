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
  import Containr from "../shared/gradCont.svelte";
</script>

<style type="text/scss">
  .lecture {
    img {
      max-height: 400px;
    }
    .telescD {
      top: 5px;
      right: 5px;
    }
    .telesc {
      bottom: 5px;
      left: 5px;
      font-size: 1.5em;
    }
  }
  .stpty {
    background: radial-gradient(#000b, #0002);
    width: calc(100% - 50px);
    height: calc(100% - 50px);
    border: 5px solid #fff;
    align-items: center;
    justify-content: center;
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
    <h1 class="w-100 tx-c">Observations</h1>
    <Containr title="Telescopes" icon="sat" bg="66e-37f">
      <div slot="body">
        {#each data.telescopes as tsc}
          <div class="lecture po-rel w-100">
            <div class="telescD po-abs rx-5 p-5 blur">
              {tsc.star} ({tsc.range})
            </div>
            <div class="telesc po-abs rx-5 p-5 blur">{tsc.title}</div>
            <img class="w-100 rx-5" src={tsc.img} alt="" />
          </div>
        {/each}
      </div>
    </Containr>

    <article class="p-0 m-h-auto bg-cov tx-c">
      <Slidr
        speed={4}
        images={[...Array(5)].map((e, i) => `./assets/images/astro-ph/${i}.jpeg`)}
        height="350px">
        <div slot="internal" class="w-100 p-20 m-0 flex-col f-wt1 stpty">
          <div style="font-size:3em">Astrophotography</div>
          <p class="f-wt3">Its just what it sounds like. <br /></p>
          <a href="" class="btn-std" style="height:auto;">Rules &rarr;</a>
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
        images={[...Array(7)].map((e, i) => `./assets/images/stpty/${i}.jpg`)}
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
