<script>
    export let data;
</script>

<style type="text/scss">
    section {
        padding: 2% 20%;
    }
    .imgCont {
        width: 400px;
        height: 400px;
        position: relative;
        .overlay {
            position: absolute;
            top: 0;
            z-index: 1;
            mix-blend-mode: multiply;
            width: 100%;
            height: 100%;
        }
        img {
            filter: grayscale(100%);
            &:hover {
                filter: grayscale(0);
                .overlay {
                    background: transparent;
                }
            }
            z-index: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }
    @media (max-width: 991px) {
        section {
            padding: 2% 10%;
        }
    }
    @media (max-width: 768px) {
        section {
            padding: 2%;
        }
    }
</style>

<section>
    <article>
        <h1 class="l1">Management</h1>
        {#each data.mgmt as p}
            <div>
                <div class="imgCont">
                    <div class="overlay" style="background:{p.color}" />
                    <img src={p.img} alt="" />
                </div>

                {p.name}-{p.pos}
                <br />
            </div>
        {/each}
    </article>
    <article>
        <h1 class="l1">Project Leads</h1>
    </article>
</section>
