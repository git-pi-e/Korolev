<script>
    import BH from "../micro/bh.svelte";

    import data from "../data/projects.json";

    let filter = "";
</script>

<celestia-page>
    <div class="space__comet-container" style="position:fixed;">
        <div class="space__comet" />
    </div>
    <h1 class="w-100 tx-c">Projects</h1>
    <hr />
    <div style="height:400px;">&nbsp;</div>
    <section class="flex tx-c" style="flex-wrap: wrap;">
        {#each data.going as pj}
            <div class="boxy tx-l m-20px blur">
                <img src={pj.icon} class="w-100" alt={pj.name} />
                <div class="title p-20px">
                    <span class="f-wt7">{pj.name}</span>
                    <hr />
                    <details>
                        <summary>Venugopalan Iyengar </summary>
                        <p>
                            {pj.desc}
                            <button>
                                <a href={pj.moreLink}>{pj.more}</a>
                            </button>
                        </p>
                    </details>
                </div>
            </div>
        {/each}
    </section>
    <section class="tx-l" style="overflow-x:scroll;">
        <details>
            <summary style="font-size:20px"
                >Past Projects <i>(Click to Open)</i></summary
            >
            <table>
                <style>
                    tr {
                        width: 100%;
                        background: linear-gradient(135deg, #a8f, #8af);
                    }
                    td {
                        justify-content: center;
                        align-items: center;
                        height: 100px;
                    }
                    td img {
                        height: 100px;
                        width: 100px;
                    }
                    td input {
                        background: transparent;
                        font-size: 2em;
                        color: #fff;
                    }
                    td input::placeholder {
                        color: #fff8;
                    }
                </style>
                <tr>
                    <td colspan="2" style="padding:0 10px;height:50px;">
                        <input
                            type="text"
                            placeholder="Search"
                            bind:value={filter}
                        />
                    </td>
                </tr>
                {#each data.past.filter((e) => e.name.includes(filter) || e.desc.includes(filter)) as pj, i}
                    <tr>
                        <td class="p-0"><img src={pj.img} alt="" /></td>
                        <td class="p-0">
                            <div class="comet m-5px">
                                <div class="p-5px">
                                    <div class="f-wt5" style="font-size:1.2em;">
                                        {pj.name} ({pj.year || "Unknown"})
                                    </div>
                                    <div>{pj.desc}</div>
                                </div>
                            </div>
                        </td>
                    </tr>
                {/each}
            </table>
        </details>
    </section>
    <BH />
</celestia-page>

<style type="text/scss">
    section {
        padding: 20px 10%;
    }
    .boxy {
        position: relative;
        height: 300px;
        width: calc(33% - 40px);
        img {
            height: 300px;
            z-index: 0;
        }
        .title {
            background: linear-gradient(to bottom, transparent, #000);
            position: absolute;
            bottom: 0;
            width: calc(100% - 40px);
            left: 0;
            word-wrap: break-word;
            font-size: 1.2em;
        }
        &:hover {
            background: #3338;
        }
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
        overflow: hidden;
    }
    @media (max-width: 991px) {
        section {
            padding: 4% 10%;
            .boxy {
                width: calc(50% - 40px);
            }
        }
    }
    @media (max-width: 768px) {
        section {
            padding: 4%;
            .boxy {
                width: calc(100% - 40px);
            }
        }
    }
</style>
