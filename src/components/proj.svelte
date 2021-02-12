<script>
    export let data;
    import BH from "../micro/bh.svelte";

    const backgrounder = (i) => {
        const opts = [
            "-20deg,#b71,#fd6",
            "-20deg,#1a9,#4f8",
            "0deg,#028,#07e",
            "0deg,#444,#000",
            "0deg,#46f,#f47",
        ];
        const bg =
            "linear-gradient(" +
            opts[Math.round(Math.random() * (opts.length - 1))] +
            ")";
        return bg;
    };
</script>

<div class="space__comet-container" style="position:fixed;">
    <div class="space__comet" />
</div>
<section>
    {#each data.going as pj, i}
        <div class="hero">
            <img class="hero-profile-img" src={pj.main} alt="main" />
            <div
                class="hero-description-bk"
                style="background:{backgrounder(i)}"
            />
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
Past Projects
<section style="display:flex;flex-wrap:wrap;justify-content:space-around;">
    {#each data.past as pj, i}
        <div class="comet">
            <img src={pj.img} alt="" />
            <div class="name">{pj.name}</div>
        </div>
    {/each}
</section>
<BH />

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
    .hero-description {
        position: absolute;
        color: #fff;
        font-weight: 900;
        left: 150px;
        bottom: 26%;

        &-bk {
            border-radius: 30px;
            position: absolute;
            top: 55%;
            left: -5px;
            height: 65%;
            width: 108%;
            transform: skew(19deg, -9deg);
        }
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

    .space__comet {
        font-size: 100px;
        width: 1.8em;
        height: 0.6em;
        border-top-right-radius: 0.3em;
        border-bottom-right-radius: 0.3em;
        background-image: radial-gradient(
                circle at 0.06em 50%,
                #fc4 0,
                #fc4 0.06em,
                transparent 0.06em
            ),
            linear-gradient(#fc4 0, #fc4),
            radial-gradient(
                circle at 0 50%,
                transparent 0,
                transparent 0.05em,
                #fc4 0.05em
            ),
            radial-gradient(
                circle at 0.06em 50%,
                #fc4 0,
                #fc4 0.06em,
                transparent 0.06em
            ),
            linear-gradient(#fc4 0, #fc4),
            radial-gradient(
                circle at 0 50%,
                transparent 0,
                transparent 0.05em,
                #fc4 0.05em
            ),
            radial-gradient(
                circle at 0.06em 50%,
                #fc4 0,
                #fc4 0.06em,
                transparent 0.06em
            ),
            linear-gradient(#fc4 0, #fc4);
        background-size: 100% 0.12em, 1.82em 0.12em, 1.61em 0.12em, 100% 0.12em,
            1.7em 0.12em, 1.5em 0.12em, 100% 0.12em, 1.87em 0.12em;
        background-position: 0.06em 0, 0.11em 0, 0.32em 0.11em, 0.18em 0.23em,
            0.24em 0.23em, 0.44em 0.35em, 0 0.47em, 0.06em 0.47em;
        background-repeat: no-repeat;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        animation: flyby 10s linear infinite;

        &:before {
            content: " ";
            display: block;
            background: rgba(255, 255, 255, 0.5);
            width: 0.45em;
            height: 0.45em;
            border-radius: 50%;
            margin-right: 0.07em;
        }
    }

    @keyframes flyby {
        0% {
            transform: scale(1) rotate(45deg) translate(-100px, -100px);
            opacity: 1;
        }
        50% {
            transform: scale(0.85) rotate(45deg) translate(70vw, 25vh);
            opacity: 0;
        }
        100% {
            opacity: 0;
        }
    }
    .comet {
        margin: 10px;
        img {
            width: 100px;
            height: 100px;
            border-radius: 50px;
        }
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
