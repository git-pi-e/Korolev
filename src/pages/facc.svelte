<script>
  import Mars from "../micro/mars.svelte";
  import data from "../data/facc.json";
  import Containr from "../shared/gradCont.svelte";

  import { sheet, csvtojson, base } from "../code/functions";

  let //
    i = 0,
    x,
    lec = base;

  fetch(sheet)
    .then((r) => r.text())
    .then((r2) => {
      const jsons = JSON.parse(csvtojson(r2)).filter((e) => e.featured);
      lec = jsons[i];
      jsons.forEach((e) => {
        let img = new Image();
        img.src = e.url;
      });
      x = setInterval(() => {
        i = (i + 1) % jsons.length;
        lec = base;
        console.log(lec);
        lec = jsons[i];
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
    .watch {
      position: absolute;
      top: 0;
      padding: 1%;
      right: 0;
      margin: 1%;
      background: transparent;
      cursor: pointer;
      color: #f00;
      border-radius: 20px;
      border: 1px solid #f00;
      transition: all 0.2s ease;
      &:hover {
        background: #f00;
        color: #fff;
      }
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
</style>

<celestia-page>
  <section class="adaptive">
    <Containr title="Open Lectures" icon="lec" bg="e66-c26">
      <div class="lecture w-100" slot="body">
        <div style="position:relative;">
          <div style="position:absolute;top:50%;left:-10px;">&lt;</div>
          <div style="position:absolute;top:50%;right:-10px;">&gt;</div>
        </div>
        <a class="watch" href={lec.url}> Watch Here </a>
        <!-- <img
          class="w-100"
          src="https://drive.google.com/uc?export=view&id={lec.image
            ?.split('/d/')[1]
            ?.split('/')[0]}"
          alt="" /> -->
        <div class="p-10px">
          <div
            class="flex"
            style="justify-content:space-between;text-align: justify;padding:10px 0;">
            <span class="f-wt7">{lec.prof}: {lec.title.slice(0, 20)}</span>
            <span>{lec.date}, {lec.time}</span>
          </div>
          <div>{lec.text}</div>
        </div>
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
