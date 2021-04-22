<script>
  export let title, icon, bg;
</script>

<article class="p-10 m-h-auto bg-{bg}">
  <div class="l1 p-10 flex f-wt5">
    <span> {title} </span>
    {#if icon !== 'null'}
      <img class="boxicon" src="./assets/icons/{icon}.svg" alt="" />
    {/if}
  </div>
  <slot name="body" />
</article>
