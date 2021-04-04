<script>
    export let changePage;

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

    setInterval(() => (img = images[~~(Math.random() * 5)]), 3e3);
</script>

<section class="p-0 m-0">
    <div
        class="image-container p-0 m-0 w-100"
        style="position:relative;height:500px;"
    >
        <div class="logo">
            <Logo />
        </div>
        <img
            class="m-0 w-100"
            src="https://images.unsplash.com/photo-{img}"
            alt=""
            style="position:absolute;z-index:-1;"
        />
    </div>
    <article class="flex blur" style="justify-content:space-around;">
        <button class="p-5px m-10px" on:click={() => changePage("Projects")}
            >Projects</button
        >
        <button class="p-5px m-10px">
            <a href="http://blog.sedscelestia.org">Blog</a>
        </button>
    </article>
    <div class="m-h-auto" style="width:512px;">
        <Legacy />
    </div>
    <article
        class="p-10px m-h-auto flex"
        style="background:linear-gradient(135deg, #e6e, #945)"
    >
        <div>
            <svg />
            Insta
        </div>
        <div>
            <svg />
            FB
        </div>
        <div>
            <svg />
            IG
        </div>
    </article>
    <footer class="flex p-10px">
        <div>Our Links</div>
        <hr />
        <div>Links2</div>
    </footer>
</section>

<style type="text/scss">
    section {
        article {
            margin: 20px auto;
            width: 60%;
            button {
                border: 3px solid #a8f;
                color: #a8f;
                background: transparent;
                width: 200px;
                height: 2em;
                font-size: 24px;
                text-transform: uppercase;
                &:hover {
                    background: #a8f;
                    color: #fff;
                }
            }
        }
        .logo {
            width: calc(100% - 2 * (50% - 64px));
            padding: 10px calc(50% - 64px);
            position: absolute;
            z-index: 0;
        }
        .image-container {
            img {
                height: 500px;
                opacity: 1;
                transition: opacity 0.1s ease;
            }
        }
    }
    @media (max-width: 991px) {
        .image-container {
            img {
                height: 400px;
            }
        }
    }

    @media (max-width: 450px) {
        .image-container {
            img {
                height: 300px;
            }
        }
    }
</style>
