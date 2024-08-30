<script>
  import BH from "$lib/components/macro/bh.svelte";
  import Comet from "$lib/components/micro/comet.svelte";
  import data from "$lib/data/projects";

  import { Canvas, Containr, Imgr } from "$lib/shared";

  import { base } from "$app/paths";

  let filter = "";

  const search = (e, filter) => {
    let [, under, name, desc, ,] = Object.values(e); //converting the object to array of values and destructuring
    return [under, name, desc].some((element) => {
      return element?.toLowerCase().includes(filter.toLowerCase());
    }); //creating an array of only needed values and running .some() method on it to return  or 1 fir condtion inside.
  };
</script>

<title>Projects | SEDS Celestia</title>
<celestia-page>
  <Comet />
  <h1 class="tx-c po-stx p-10 z-4 m-h-auto" style="top:0px;" bg="000-nil">Projects</h1>
  <section class="adaptive">
    <div id="art" size="max" class="m-h-auto">
      <Canvas
        image="{base}/assets/onthehouse/projArt.png"
        bg="0008"
        height="400"
        width="400"
      />
    </div>
  </section>
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
            ht="30px"
          />
          {#each data.past.filter((e) => search(e, filter)) as pj}
            <!-- data.past is an array of objects, thus .filter() method sends in each element which is inturn an object as (e) into the search function -->
            <element class="flex m-10 p-10">
              <img
                class="rx-50 p-5"
                bg="000"
                size="ic-md"
                src={pj.img}
                alt=""
              />
              <div class="m-5 f-wt3">
                <div class="f-wt7 p-5">{pj.name} ({pj.year || "Unknown"})</div>
                <div class="p-5">{pj.desc}</div>
              </div>
            </element>
          {/each}
        </main>
      </details>
    </Containr>
    <Containr title="Notable Spinoffs" icon="dish" bg="e66-c26">
      <div slot="body">
        <Imgr
          src="{base}/assets/projects/kratos.png"
          placements={{
            topRight: "Now Independent",
            bottomLeft: "Project Kratos",
          }}
        />
        <Imgr
          src="{base}/assets/projects/rt.jpg"
          placements={{ topRight: "Now Independent", bottomLeft: "Project RT" }}
        />
        <Imgr
          src="{base}/assets/projects/apeiro.jpg"
          placements={{ topRight: "Ended", bottomLeft: "Project Apeiro" }}
        />
      </div>
    </Containr>
  </section>
  <BH />
</celestia-page>

<style>
  @media (max-width: 400px) {
    #art {
      transform: scale(0.8) translateX(-5%);
    }
  }
</style>
