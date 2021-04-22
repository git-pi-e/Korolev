<script>
  export let changePage;

  import data from "../data/home";
  import Logo from "../nano/logo.svelte";
</script>

<style type="text/scss">
  .section {
    article {
      margin: 20px auto;
    }
    a img {
      transition: opacity 0.2s ease;
    }
    a:hover img {
      opacity: 0.66;
    }
    .milestones {
      width: 600px;
      font-size: 24px;
      overflow-x: scroll;
      background: linear-gradient(
        to right,
        #0004 0%,
        #0002 10%,
        #0000 50%,
        #0002 90%,
        #0004 100%
      );
    }
    .logo {
      padding: 10px calc(50% - 64px);
    }
    .image-container {
      img {
        height: 500px;
        opacity: 1;
        transition: opacity 0.1s ease;
      }
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

<celestia-page class="section p-0 m-0">
  <div class="image-container p-0 m-0 w-100 po-rel" style="height:500px;">
    <div class="logo z-0 po-abs w-gen" style="--offset: calc(2 * (50% - 64px))">
      <Logo />
    </div>
    <img
      class="m-0 w-100"
      src="https://images.unsplash.com/photo-1543722530-d2c3201371e7"
      alt="" />
  </div>
  <article class="flex w-66 jtx-ar">
    <button
      class="p-5 m-10 blur btn-std"
      on:click={() => changePage('Projects')}>Projects</button>
    <button class="p-5 m-10 blur btn-std">
      <a href="http://blog.sedscelestia.org">Blog</a>
    </button>
  </article>
  <div class="m-h-auto" style="width:400px; ">
    <img src="./assets/legacy.svg" size="max" alt="" />
  </div>
  <article class="flex p-10 milestones rx-5">
    {#each data.miles as event}
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
  <article class="p-10 m-h-auto flex w-66 jtx-ar">
    <a href={links.content.yt}><img
        size="ic-lg"
        src="./assets/icons/youtube.png"
        alt="" /></a>
    <a href={links.social.fb}><img
        size="ic-lg"
        src="./assets/icons/facebook.png"
        alt="" /></a>
    <a href={links.social.ig}><img
        size="ic-lg"
        src="./assets/icons/instagram.png"
        alt="" /></a>
  </article>
</celestia-page>
