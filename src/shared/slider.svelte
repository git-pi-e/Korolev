<script>
  import { onMount } from "svelte";
  export let //
    width = "100%",
    height = "400px",
    speed = 2,
    images = [];
  let i = 0;

  onMount(() =>
    setInterval(() => {
      i = (i + 1) % images.length;
    }, +speed * 1e3)
  );
</script>

<div
  class="slider"
  style={`height:${height};width:${width};background:url(${images[i]}) center center;background-size:cover`}>
  <slot name="internal" />
</div>
