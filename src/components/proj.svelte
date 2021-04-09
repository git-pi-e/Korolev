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
            <summary>Venugopalan Iyengar</summary>
            <p>
              {pj.desc}
              <button class="btn-std">
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
      <summary style="font-size:20px">
        Past Projects <i>(Click to Open)</i>
      </summary>
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
            <input type="text" placeholder="Search" bind:value={filter} />
          </td>
        </tr>
        {#each data.past.filter((e) => e.name.includes(filter) || e.desc.includes(filter)) as pj, i}
          <tr>
            <td class="p-0"><img src={pj.img} alt="" /></td>
            <td class="p-0">
              <div class="comet m-5px">
                <div class="p-5px">
                  <div class="f-wt5" style="font-size:1.2em;">
                    {pj.name} ({pj.year || 'Unknown'})
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
