<script>
    export let data;
</script>

<style type="text/scss">
    section {
        .l1 {
            font-size: 16px;
            text-transform: uppercase;
            color: #fff;
        }
        padding: 2% 30%;
        article {
            margin: 0 auto;
            border-radius: 24px;
            padding: 10px;
            margin: 20px 0;
        }
    }
    .lecture {
        width: 100%;
        position: relative;
        img {
            width: 100%;
            object-fit: cover;
            border-radius: 10px;
        }
        p {
            padding: 10px;
            padding-top: 0;
            line-height: 1.5em;
            &::first-line {
                text-transform: uppercase;
            }
        }
        .watch {
            position: absolute;
            top: 0;
            padding: 1%;
            right: 0;
            margin: 1%;
            color: #f00;
            border-radius: 20px;
            border: 1px solid #f00;
        }
        .telesc {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 2em;
            padding: 1%;
            color: #fff;
        }
    }
    @media (max-width: 1200px) {
        section {
            padding: 2% 25%;
        }
    }
    @media (max-width: 991px) {
        section {
            padding: 2% 20%;
        }
    }
    @media (max-width: 768px) {
        section {
            padding: 2% 10%;
        }
    }
    @media (max-width: 450px) {
        section {
            padding: 2%;
        }
    }
</style>

<section>
    <article style="background:linear-gradient(135deg, #900, #ba1e68)">
        <h1 class="l1">Open Lectures</h1>
        <div class="lecture">
            <div class="watch">Coming Next</div>
            <img src={data.upcoming.img} alt="" />
            <p>{data.upcoming.title} <br /> {data.upcoming.details}</p>
        </div>
    </article>
    <article style="background:linear-gradient(135deg, #009, #3469ff)">
        <h1 class="l1">Telescopes</h1>
        {#each data.telescopes as tsc}
            <div class="lecture">
                <div class="telesc">{tsc.title}</div>
                <img src={tsc.img} alt="" />
            </div>
        {/each}
    </article>
    <article style="background:linear-gradient(135deg, #909, #983756)">
        <h1 class="l1">Open Source Projects</h1>
        <p>We have Projects</p>
        {#each data.opensource as osc}
            <div style="display:flex;margin: 20px 0;height:150px">
                <div style="flex:1">
                    <img
                        style="width:150px;object-fit:cover;height:100%;border-radius:125px;"
                        src={osc.img}
                        alt="" />
                </div>
                <div style="flex:3;padding:10px;">{osc.title}</div>
            </div>
        {/each}
    </article>
    <div style="height:5em">&nbsp;</div>
</section>
