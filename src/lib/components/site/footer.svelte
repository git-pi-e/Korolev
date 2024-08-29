<script>
    import links from "$lib/data/routes.json";
</script>

<celestia-footer class="footer jtx-ct flex p-20">
    <div>
        <h5>Sitemap</h5>
        {#each Object.entries(links.internal) as pg}
            <a class="caps" href={pg[1]}>{pg[0]}</a>
            <br />
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
        <br />
        <a target="_blank" href={links.social.tw}>Twitter</a>
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
        <!-- <a target="_blank" href="/Galileo">Old Website</a>
        <br /> -->
        <a target="_blank" href={links.web.educelestia}>SEDS Celestia Edu</a>
        <br />
        <a target="_blank" href={links.web.sedsi}>SEDS India</a>
        <br />
        <a target="_blank" href={links.web.sedse}>SEDS Earth</a>
    </div>
</celestia-footer>

<style>
    .caps {
        text-transform: capitalize;
    }
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
