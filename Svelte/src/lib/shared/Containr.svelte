<script>
  export let title,
    icon,
    bg,
    classes = "";

  import { base } from "$app/paths";
</script>

<article class="p-10 m-h-auto {classes}" {bg}>
  <div class="l1 p-10 flex f-wt5">
    <span> {title} </span>
    {#if icon !== "null"}
      <img
        size="ic"
        style="object-fit: contain;"
        src="{base}/assets/icons/{icon}.svg"
        alt=""
      />
    {/if}
  </div>
  <slot name="body" />
</article>
