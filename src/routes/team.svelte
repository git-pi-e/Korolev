<script>
    import Earth from "$lib/components/macro/earth.svelte";
    import data from "$lib/data/team";
    import Containr from "$lib/shared/Containr.svelte";

    import { base } from "$app/paths";

    // let filter = "";
</script>
<title>Team | SEDS Celestia</title>
<celestia-page>
    <h1 class="tx-c po-stx p-10 m-0 z-4" style="top: 0;" bg="000-nil">Team</h1>
    <section class="adaptive">
        <Containr title="SEDS CELESTIA" icon="null" bg="b5e-83c">
            <div slot="body">
                <p class="tx-j">
                    SEDS Celestia is a chapter that is a part of SEDS India,
                    headquartered in VIT Vellore. The international headquarters
                    of SEDS lies in MIT, Boston, USA.
                </p>
                <p class="tx-j">
                    People think that we Celestials just observe the “stars and
                    the planets” in the night sky. That’s partially correct. We
                    do much more than star gazing. We organise lectures by
                    various eminent professors, undertake many projects,
                    exhibitions during quark, bonhomie with seniors and
                    Starparty!
                </p>
                <p class="tx-j">We are the Celestials! ❤️</p>
                <img
                    class="w-100"
                    src="{base}/assets/images/team.jpg"
                    alt=""
                    style="height:200px;"
                />
            </div>
        </Containr>
        <Containr title="Management" icon="empire" bg="66e-37f">
            <div class="teamrow m-10 f-wrap" slot="body">
                {#each data.mgmt as p}
                    <div class="imgCont mgmt tx-c m-5 f-wt3">
                        <img size="md-lg" class="rx-2" src={p.img} alt="" />
                        <br /><span class="f-wt7"> {p.name} </span>
                        <br /><span style="color:#fffc">{p.post}</span>
                    </div>
                {/each}
            </div>
        </Containr>

        <Containr title="Leads" icon="jedi" bg="e66-c26">
            <div class="teamrow f-wrap" slot="body">
                {#each data.leads as p}
                    <div class="imgCont ldes tx-c m-5 f-wt3">
                        <img size="md" class="rx-2" src={p.img} alt="" />
                        <br /><span class="f-wt7"> {p.pos} </span>
                        <br /><span style="color:#fffc">{p.name}</span>
                    </div>
                {/each}
            </div>
        </Containr>

        <details class="p-10" bg="66e-37f">
            <summary style="font-size:20px">
                Past Leadership <i>(Click to Open)</i>
            </summary>
            <main>
                <!-- <input
            type="text"
            bg="nil"
            class="p-10 m-10 w-gen"
            placeholder="Search"
            bind:value={filter}
            style="height:33px;--offset:20px;font-size:1.25em;" /> -->
                {#each data.past as pj, i}
                    <!-- .filter((e) => JSON.stringify(e).includes(filter))  -->
                    <element class="pastCard m-5 p-5">
                        <h4>{2020 - i}</h4>
                        {#each pj as person}
                            <div class="f-wt3 w-100 flex">
                                <span class="f-wt7" style="flex:1"
                                    >{person.post}</span
                                >
                                <span style="flex:1"> {person.name} </span>
                            </div>
                        {/each}
                    </element>
                {/each}
            </main>
        </details>
        <Earth />
    </section>
</celestia-page>

<style type="text/scss">
    p {
        line-height: 1.5em;
    }
    .mgmt {
        width: calc(50% - 10px);
    }
    .ldes {
        width: calc(33% - 10px);
    }
    @media (max-width: 768px) {
        .mgmt {
            width: calc(100% - 10px);
        }
        .ldes {
            width: calc(50% - 10px);
        }
    }
    .ldes img,
    .mgmt img {
        -webkit-filter: grayscale(100%);
        filter: grayscale(100%);
    }
</style>
