<script>
  export let changePage, pages;
</script>

<style>
  .footer {
    background: linear-gradient(to bottom, #84f, #42f);
    justify-content: space-evenly;
  }
  @media (max-width: 600px) {
    .footer {
      display: block;
      justify-content: center;
    }
  }
</style>

<celestia-footer class="footer flex p-20px">
  <div>
    <h5>Sitemap</h5>
    {#each pages as page}
      <div on:click={() => changePage(page.page)}>{page.page}</div>
    {/each}
  </div>
  <div class="flex">
    <hr />
  </div>
  <div>
    <h5>Our Accounts</h5>
    <a target="_blank" href={links.social.ig}>Instagram</a>
    <br />
    <a target="_blank" href={links.social.fb}>Facebook</a>
    <br />
    <a target="_blank" href={links.social.git}>Github</a>
    <br />
    <a target="_blank" href={links.social.lin}>LinkedIn</a>
  </div>
  <div class="flex">
    <hr />
  </div>
  <div>
    <h5>Our Content</h5>
    <a target="_blank" href={links.content.yt}>Youtube</a>
    <br />
    <a target="_blank" href={links.content.blog}>Blog</a>
    <br />
    <a target="_blank" href={links.content.spotify}>Spotify</a>
    <br />
    <a target="_blank" href={links.content.radiopub}>Radio Public</a>
    <br />
    <a target="_blank" href={links.content.gpods}>Google Podcasts</a>
    <br />
    <a target="_blank" href={links.content.pocketcast}>Pocketcast</a>
    <br />
    <a target="_blank" href={links.content.breaker}>Breaker</a>
  </div>
  <div class="flex">
    <hr />
  </div>
  <div>
    <h5>External Links</h5>
    <a target="_blank" href={links.web.educelestia}>SEDS Celestia Edu</a>
    <br />
    <a target="_blank" href={links.web.sedsi}>SEDS India</a>
    <br />
    <a target="_blank" href={links.web.sedse}>SEDS Earth</a>
  </div>
</celestia-footer>
