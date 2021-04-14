<script>
  import Mars from "../micro/mars.svelte";
  import data from "../data/facc.json";
  import Containr from "../shared/gradCont.svelte";
</script>

<style type="text/scss">
  .lecture {
    position: relative;
    img {
      max-height: 400px;
      border-radius: 5px;
    }
    p {
      padding-top: 0;
      line-height: 1.5em;
      &::first-line {
        text-transform: uppercase;
      }
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
        <a class="watch" href={links.content.yt}> Watch Here </a>
        <img class="w-100" src="./assets/images/lectures.png" alt="" />
        <p class="p-10px">
          Various people including professors from reputable universities and
          even our own club members give lectures. Paper presentation is a new
          venture we have undertaken. People select a paper and present it to
          the club members, and a discussion on the paper is followed.
        </p>
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
        <p>
          SEDS Celestia conducts regular on campus observation sessions, which
          we are all unfortunately missing out on. Although we cannot share the
          magical feeling of viewing the wonders of the cosmos through
          telescopes ourselves, this new year, we bring you Celestia's Guide to
          the Universe! It is our own virtual guided tour through some of the
          most spectacular sights in the universe, with the help of Space
          Engine, a simulation software allowing us to view the universe in
          close to it's true glory.
        </p>
      </div>
    </Containr>

    <div style="height:5em">&nbsp;</div>
    <Mars />
  </section>
</celestia-page>
