<script>
  export let src,
    placements = { topRight: "", bottomRight: "", topLeft: "", bottomLeft: "" };
</script>

<style>
  .topRight {
    top: 5px;
    right: 5px;
  }
  .topLeft {
    top: 5px;
    left: 5px;
  }
  .bottomLeft {
    bottom: 5px;
    left: 5px;
  }
  .bottomRight {
    bottom: 5px;
    right: 5px;
  }
</style>

<div class="lecture po-rel w-100">
  {#if placements.topRight}
    <div class="topRight po-abs rx-5 p-5 blur">{placements.topRight}</div>
  {/if}
  {#if placements.topLeft}
    <div class="topLeft po-abs rx-5 p-5 blur">{placements.topLeft}</div>
  {/if}
  {#if placements.bottomLeft}
    <div class="bottomLeft po-abs rx-5 p-5 blur">{placements.bottomLeft}</div>
  {/if}
  {#if placements.bottomRight}
    <div class="bottomRight po-abs rx-5 p-5 blur">{placements.bottomRight}</div>
  {/if}
  <img class="w-100 rx-5" {src} alt="" />
</div>
