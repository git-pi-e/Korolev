<script>
  import BH from "../micro/bh.svelte";
  import Comet from "../nano/comet.svelte";
  import data from "../data/projects.json";

  import Containr from "../shared/Containr.svelte";
  import Image from "../shared/image.svelte";
  let filter = "";
</script>

<celestia-page>
  <Comet />
  <h1 class="tx-c po-stx p-10 z-4 w-50 m-h-auto" style="top:0;" bg="000-nil">
    Projects
  </h1>
  <section class="macrodaptive tx-c f-wrap jtx-ev">
    {#each data.going as pj}
      <div class="po-rel tx-l m-20 blur" size="lg">
        <img src={pj.icon} class="w-100 z-0" size="lg" alt={pj.name} />
        <div loc="bla" class="p-20 w-gen" style="--offset:40px;" bg="nil-000">
          <span class="f-wt7">{pj.name}</span>
          <hr />
          <details>
            <summary>{pj.under}</summary>
            <p>
              {pj.desc}
              {#if pj.more}
                <button class="btn-std">
                  <a href={pj.moreLink}>{pj.more}</a>
                </button>
              {/if}
            </p>
          </details>
        </div>
      </div>
    {/each}
  </section>
  <section class="adaptive">
    <Containr title="Past Projects" icon="tasks" bg="66e-37f">
      <details class="p-10 tx-l" bg="66e-37f" slot="body">
        <summary style="font-size:20px"><i>(Click to Open)</i></summary>
        <main>
          <input
            type="text"
            bg="nil"
            class="p-10 m-10"
            placeholder="Search"
            bind:value={filter}
            ht="30px" />
          {#each data.past.filter((e) => e.name.includes(filter) || e.desc.includes(filter)) as pj, i}
            <element class="flex m-10 p-10">
              <img
                class="rx-50 p-5"
                bg="000"
                size="ic-md"
                src={pj.img}
                alt="" />
              <div class="m-5 f-wt3">
                <div class="f-wt7 p-5">{pj.name} ({pj.year || 'Unknown'})</div>
                <div class="p-5">{pj.desc}</div>
              </div>
            </element>
          {/each}
        </main>
      </details>
    </Containr>
    <Containr title="Notable Spinoffs" icon="dish" bg="e66-c26">
      <div slot="body">
        <Image
          src="./assets/projects/kratos.png"
          placements={{ topRight: 'Now Independent', bottomLeft: 'Project Kratos' }} />
        <Image
          src="./assets/projects/rt.jpg"
          placements={{ topRight: 'Now Independent', bottomLeft: 'Project RT' }} />
        <Image
          src="./assets/projects/apeiro.jpg"
          placements={{ topRight: 'Ended', bottomLeft: 'Project Apeiro' }} />
      </div>
    </Containr>
  </section>
  <BH />
</celestia-page>
