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
  button {
    font-size: 16px;
    margin-top: 10px;
  }
  input::placeholder {
    color: #fff8;
  }
  .pastCard {
    img {
      padding: 5px 5px 5px 7px;
      background: #000;
      border-radius: 50px;
    }
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
  <Comet />
  <h1 class="w-100 tx-c">
    Projects
    <hr />
  </h1>
  <section class="flex tx-c" style="flex-wrap: wrap;">
    {#each data.going as pj}
      <div class="boxy tx-l m-20px blur">
        <img src={pj.icon} class="w-100" alt={pj.name} />
        <div class="title p-20px">
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
  <section class="tx-l" style="overflow-x:scroll;">
    <details class="bg-66e-37f p-10px">
      <summary style="font-size:20px">
        Past Projects <i>(Click to Open)</i>
      </summary>
      <main>
        <input
          type="text"
          class="p-10px m-10px"
          placeholder="Search"
          bind:value={filter}
          style="height:33px;width:calc(100% - 20px);font-size:1.25em;background: transparent;" />
        {#each data.past.filter((e) => e.name.includes(filter) || e.desc.includes(filter)) as pj, i}
          <element class="flex pastCard m-10px p-10px">
            <img src={pj.img} width="66px" height="66px" alt="" />
            <div class="m-5px f-wt3">
              <div class="f-wt7 p-10px">{pj.name} ({pj.year || 'Unknown'})</div>
              <div style="padding:0 10px;">{pj.desc}</div>
            </div>
          </element>
        {/each}
      </main>
    </details>
  </section>
  <BH />
</celestia-page>
