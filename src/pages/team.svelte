<script>
  import Earth from "../micro/earth.svelte";
  import data from "../data/team.json";
  import Containr from "../shared/gradCont.svelte";
</script>

<style type="text/scss">

  p {
    line-height: 1.5em;
  }
  .mgmt {
    text-align: center;
    width: calc(50% - 10px);
  }
  .ldes {
    text-align: center;
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
  @media (max-width: 400px) {
    .mgmt,
    .ldes {
      width: calc(100% - 10px);
    }
  }
  .ldes img,
  .mgmt img {
    border-radius: 2px;
    filter: grayscale(100%);
    width: 150px;
    height: 150px;
  }
</style>

<celestia-page>
  <section class="adaptive">
    <Containr title="SEDS CELESTIA" icon="null" bg="b5e-83c">
      <div slot="body">
        <p class="tx-j">
          SEDS Celestia is a chapter that is a part of SEDS India, headquartered
          in VIT Vellore. The international headquarters of SEDS lies in MIT,
          Boston, USA.
        </p>
        <p class="tx-j">
          People think that we Celestials just observe the “stars and the
          planets” in the night sky. That’s partially correct. We do much more
          than star gazing. We organise lectures by various eminent professors,
          undertake many projects, exhibitions during quark, bonhomie with
          seniors and Starparty!
        </p>
        <p class="tx-j">We are the Celestials!</p>
        <img
          class="w-100"
          src="./assets/images/team.jpg"
          alt=""
          style="height:200px;" />
      </div>
    </Containr>
    <Containr title="Management" icon="empire" bg="66e-37f">
      <div class="teamrow m-10px f-wrap flex" slot="body">
        {#each data.mgmt as p}
          <div class="imgCont mgmt m-5px f-wt3">
            <img src={p.img} alt="" />
            <br /><span class="f-wt7"> {p.name} </span>
            <br /><span style="color:#fffc">{p.pos}</span>
          </div>
        {/each}
      </div>
    </Containr>

    <Containr title="Leads" icon="jedi" bg="e66-c26">
      <div class="teamrow f-wrap flex" slot="body">
        {#each data.leads as p}
          <div class="imgCont ldes m-5px f-wt3">
            <img src={p.img} alt="" />
            <br /><span class="f-wt7"> {p.pos} </span>
            <br /><span style="color:#fffc">{p.name}</span>
          </div>
        {/each}
      </div>
    </Containr>
    <Earth />
  </section>
</celestia-page>
