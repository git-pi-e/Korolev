<script>
    export let changePage;

    import links from "../data/links.json";
</script>

<celestia-footer class="footer flex p-20px">
    <div>
        <h5>Sitemap</h5>
        <div on:click={() => changePage("Home")}>Home</div>
        <div on:click={() => changePage("Team")}>Team</div>
        <div on:click={() => changePage("Facilities")}>Facilities</div>
        <div on:click={() => changePage("Observations")}>Observations</div>
        <div on:click={() => changePage("Projects")}>Projects</div>
    </div>
    <div class="flex">
        <hr />
    </div>
    <div>
        <h5>Our Accounts</h5>
        <a href={links.social.ig}>Instagram</a> <br />
        <a href={links.social.fb}>Facebook</a> <br />
        <a href={links.social.git}>Github</a> <br />
        <a href={links.social.lin}>LinkedIn</a>
    </div>
    <div class="flex">
        <hr />
    </div>
    <div>
        <h5>Our Content</h5>
        <a href={links.content.yt}>Youtube</a> <br />
        <a href={links.content.blog}>Blog</a> <br />
        <a href={links.content.spotify}>Spotify</a> <br />
        <a href={links.content.radiopub}>Radio Public</a> <br />
        <a href={links.content.gpods}>Google Podcasts</a> <br />
        <a href={links.content.pocketcast}>Pocketcast</a> <br />
        <a href={links.content.breaker}>Breaker</a>
    </div>
    <div class="flex">
        <hr />
    </div>
    <div>
        <h5>External Links</h5>
        <a href={links.web.educelestia}>SEDS Celestia Edu</a> <br />
        <a href={links.web.sedsi}>SEDS India</a> <br />
        <a href={links.web.sedse}>SEDS Earth</a>
    </div>
</celestia-footer>

<style>
    .footer {
        background: #888;
        justify-content: space-evenly;
    }
    @media (max-width: 600px) {
        .footer {
            display: block;
            justify-content: center;
        }
    }
</style>
