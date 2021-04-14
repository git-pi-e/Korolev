<script>
  import { onMount } from "svelte";
  export let //
    width = "100%",
    height = "400px",
    speed = 2,
    images = [];

  let container;

  images.forEach((img) => (new Image().src = img));

  function backgroundSequence() {
    window.clearTimeout();
    let k = 0;
    for (let i = 0; i < images.length; i++) {
      setTimeout(() => {
        container.style.background = `url(${images[k]}) no-repeat`;
        container.style.backgroundSize = "cover";
        k + 1 === images.length
          ? setTimeout(backgroundSequence, speed * 1e3)
          : k++;
      }, speed * 1e3 * i);
    }
  }

  onMount(backgroundSequence);
</script>

<style>
  .container {
    position: relative;
    background-blend-mode: darken;
    transition: 3s ease;
  }
</style>

<div
  class="container"
  style={`height:${height};width:${width};background:url(${images[0]}) no-repeat`}
  bind:this={container}>
  <div class="content w-100" style="z-index: 1;height: 100%;">
    <slot name="internal" />
  </div>
</div>
