<script>
  export let title, icon, bg;
</script>

<article class="p-10px m-h-auto bg-{bg}">
  <div class="l1 p-10px flex f-wt5">
    <span> {title} </span>
    <img class="boxicon" src="./assets/icons/{icon}.svg" alt="" />
  </div>
  <slot name="body" />
</article>
