<script>
  import BH from "../micro/bh.svelte";
  import Comet from "../nano/comet.svelte";
  import data from "../data/projects.json";

  let filter = "";
</script>

<style type="text/scss">
  section {
    padding: 20px 10%;
  }
  input::placeholder {
    color: #fff8;
  }
  .pastCard {
    img {
      padding: 5px 5px 5px 7px;
      background: #000;
    }
  }
  .boxy {
    height: 300px;
    width: calc(33% - 40px);
    .title {
      background: linear-gradient(to bottom, transparent, #000);
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

<celestia-page>
  <h1 class="w-100 tx-c">Projects</h1>
  <Comet />
  <section class="flex tx-c" style="flex-wrap: wrap;">
    {#each data.going as pj}
      <div class="boxy po-rel tx-l m-20 blur">
        <img src={pj.icon} class="w-100 z-0" height="300px" alt={pj.name} />
        <div class="title po-abs p-20">
          <span class="f-wt7">{pj.name}</span>
          <hr />
          <details>
            <summary>{pj.under}</summary>
            <p>
              {pj.desc}
              {#if pj.more}
                <button class="btn-std" style="margin-top: 10px;">
                  <a href={pj.moreLink}>{pj.more}</a>
                </button>
              {/if}
            </p>
          </details>
        </div>
      </div>
    {/each}
  </section>
  <section class="tx-l" style="overflow-x:scroll;">
    <details class="bg-66e-37f p-10">
      <summary style="font-size:20px">
        Past Projects <i>(Click to Open)</i>
      </summary>
      <main>
        <input
          type="text"
          class="p-10 m-10 bg-nil"
          placeholder="Search"
          bind:value={filter}
          style="height:33px;width:calc(100% - 20px);font-size:1.25em;" />
        {#each data.past.filter((e) => e.name.includes(filter) || e.desc.includes(filter)) as pj, i}
          <element class="flex pastCard m-10 p-10">
            <img class="rx-50" size="ic-md" src={pj.img} alt="" />
            <div class="m-5 f-wt3">
              <div class="f-wt7 p-10">{pj.name} ({pj.year || 'Unknown'})</div>
              <div style="padding:0 10px;">{pj.desc}</div>
            </div>
          </element>
        {/each}
      </main>
    </details>
  </section>
  <BH />
</celestia-page>
