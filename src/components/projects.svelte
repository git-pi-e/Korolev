<script>
    export let data;
    import BH from "../micro/bh.svelte";

    const backgrounder = (i) => {
        const opts = [
            "-20deg, #bb7413, #e7d25c",
            "-20deg, #bb7413, #e7d25c",
            "0deg, #3f5efb, #fc466b",
            "0deg, #3f5efb, #fc466b",
        ];
        const bg =
            "linear-gradient(" +
            opts[Math.round(Math.random() * opts.length)] +
            ")";
        return bg;
    };
</script>

<style type="text/scss">
    section {
        padding: 4% 10%;
        text-align: center;
    }
    .hero {
        display: inline-block;
        position: relative;
        width: 400px;
        min-width: 400px;
        height: 400px;
        border-radius: 30px;
        overflow: hidden;
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.3);
        margin: 30px;
        &-profile-img {
            height: 70%;
        }
    }
    .hero-description-bk {
        border-radius: 30px;
        position: absolute;
        top: 55%;
        left: -5px;
        height: 65%;
        width: 108%;
        transform: skew(19deg, -9deg);
    }
    .hero-logo {
        height: 80px;
        width: 80px;
        border-radius: 20px;
        background-color: #fff;
        position: absolute;
        bottom: 30%;
        left: 30px;
        overflow: hidden;
        box-shadow: 5px 5px 30px rgba(0, 0, 0, 0.7);
        img {
            object-fit: cover;
            height: 100%;
        }
    }
    .hero-description {
        position: absolute;
        color: #fff;
        font-weight: 900;
        left: 150px;
        bottom: 26%;
    }
    .hero-btn {
        position: absolute;
        color: #fff;
        right: 30px;
        bottom: 10%;
        padding: 10px 20px;
        border: 1px solid #fff;
        a {
            color: #fff;
        }
    }
    .hero-date {
        position: absolute;
        color: #fff;
        left: 30px;
        bottom: 10%;
    }

    @media (max-width: 991px) {
        section {
            padding: 4% 10%;
        }
    }
    @media (max-width: 768px) {
        section {
            padding: 4%;
        }
    }
</style>

<section>
    {#each data as pj, i}
        <div class="hero">
            <img class="hero-profile-img" src={pj.main} alt="main" />
            <div
                class="hero-description-bk"
                style="background:{backgrounder(i)}" />
            <div class="hero-logo"><img src={pj.icon} alt="icon" /></div>
            <div class="hero-description">
                <p>{pj.desc}</p>
            </div>
            <div class="hero-date">
                <p>{pj.name}</p>
            </div>
            <div class="hero-btn"><a href={pj.moreLink}>{pj.more}</a></div>
        </div>
    {/each}
</section>
<BH />
