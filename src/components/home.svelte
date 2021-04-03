<script>
    import Logo from "../nano/logo.svelte";
    import Legacy from "../nano/legacy.svelte";

    const images = [
        "1464802686167-b939a6910659",
        "1419242902214-272b3f66ee7a",
        "1543722530-d2c3201371e7",
        "1444703686981-a3abbc4d4fe3",
        "1419242902214-272b3f66ee7a",
    ];
    let img = images[0];

    setInterval(() => (img = images[~~(Math.random() * 5)]), 1e3);
</script>

<section class="p-0 m-0">
    <code>
        A translucent dark grey/black type ke colour ka bar would look good on
        the top <br />
        The pre footer with our social media links and shit
    </code>
    <article class="m-h-auto">
        <Logo />
    </article>
    <div class="image-container p-0 m-0 w-100">
        <img
            class="m-0 w-100"
            src="https://images.unsplash.com/photo-{img}"
            alt=""
        />
    </div>
    <article
        class="flex blur"
        style="background:#2226;justify-content:space-around;"
    >
        <button class="p-20px m-10px">Projects</button>
        <button class="p-20px m-10px">Blog</button>
    </article>
    <div>
        <Legacy />
    </div>
    <footer class="flex p-10px">
        <div>Our Links</div>
        <hr />
        <div>Links2</div>
    </footer>
    <footer class="flex p-10px">
        <div>Sitemap</div>
        <hr />
        <div>Links2</div>
    </footer>
</section>

<style type="text/scss">
    section {
        article {
            margin: 20px auto;
            width: 60%;
        }
        .image-container {
            img {
                height: 50vh;
                opacity: 1;
                transition: opacity 0.1s ease;
                object-fit: cover;
            }
        }
    }
    footer {
        background: #888;
    }
</style>
