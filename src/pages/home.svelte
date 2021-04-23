<script>
  export let changePage;

  import data from "../data/home";
  import Logo from "../nano/logo.svelte";
  import Containr from "../shared/gradCont.svelte";
  import Rocket from "../micro/rocket.svelte";
</script>

<style type="text/scss">
  article {
    margin: 20px auto;
  }
  .milestones {
    font-size: 24px;
    height: 400px;
    overflow-y: scroll;
  }
  .image-container {
    img {
      height: 500px;
      opacity: 1;
      transition: opacity 0.1s ease;
    }
  }
  @media (max-width: 991px) {
    .image-container {
      img {
        height: 400px;
      }
    }
  }
  @media (max-width: 450px) {
    .image-container {
      img {
        height: 300px;
      }
    }
  }
</style>

<celestia-page class="p-0 m-0">
  <div class="section">
    <div class="image-container p-0 m-0 w-100 po-rel" style="height:500px;">
      <div
        class="z-0 po-abs w-gen"
        style="--offset: calc(2 * (50% - 100px));padding: 10px calc(50% - 100px);">
        <Logo wd="200" />
      </div>
      <img
        class="m-0 w-100"
        src="https://images.unsplash.com/photo-1543722530-d2c3201371e7"
        alt="" />
    </div>
  </div>
  <section class="adaptive">
    <article class="flex jtx-ar">
      <button
        class="btn-std"
        on:click={() => changePage('Projects')}>Projects</button>
      <button class="btn-std">
        <a href="http://blog.sedscelestia.org">Blog</a>
      </button>
    </article>
    <Rocket />
    <Containr title="" icon="null" bg="0000" classes="flex jtx-ct">
      <img src="./assets/legacy.svg" slot="body" size="max" alt="" />
    </Containr>
    <Containr title="Through the Telescope" icon="clock" bg="e66-c26">
      <article class="flex-col p-10 milestones rx-5" slot="body">
        {#each data.miles.reverse() as event}
          <div class="tx-c m-10 p-10" style="white-space: nowrap;">
            <div class="p-10">{event.event}</div>
            <div class="po-rel">
              <li
                class="p-0 m-0 po-abs"
                style="top:-0.66em;left:calc(50% - 5px);font-size:48px;" />
              <hr />
            </div>
            <div class="p-10">{event.year}</div>
          </div>
        {/each}
      </article>
    </Containr>
    <Containr title="Connect With Us" icon="heart" bg="66e-37f">
      <article class="p-10 flex jtx-ev" slot="body">
        <a target="_blank" href={links.content.yt}>
          <img size="ic-lg" src="./assets/icons/youtube.svg" alt="" />
        </a>
        <a target="_blank" href={links.social.fb}>
          <img size="ic-lg" src="./assets/icons/facebook.svg" alt="" />
        </a>
        <a target="_blank" href={links.social.ig}>
          <img size="ic-lg" src="./assets/icons/insta.svg" alt="" />
        </a>
      </article>
    </Containr>
  </section>
</celestia-page>
