<script>
  import { onMount } from "svelte";
  export let image, height, width;

  let canvas;

  onMount(() => {
    let img = new Image();
    img.addEventListener("load", () => {
      let ctx = canvas.getContext("2d");
      let [w, h] = [width, height];
      [canvas.height, canvas.width] = [h, w];
      ctx.drawImage(img, 0, 0, h, w);
      ctx.globalCompositeOperation = "destination-in";
      ctx.beginPath();
      ctx.arc(w / 2, h / 2, w / 2, 0, Math.PI * 2);
      ctx.closePath();
      ctx.fill();
    });
    img.setAttribute("src", image);
  });
</script>

<canvas class="rx-max" bind:this={canvas} bg="0008" />
