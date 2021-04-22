<script>
  export let data;
</script>

<style type="text/scss">
  section {
    padding: 4% 20%;
    article {
      width: 100%;
    }
  }
  .books {
    flex-direction: column;
    margin-right: 20px;
    img {
      object-fit: contain;
      height: 250px;
      box-shadow: 5px -5px 2px 2px #0008;
    }
  }
  .channels {
    flex-direction: column;
    margin-right: 10px;
    img {
      border-radius: 50px;
      object-fit: cover;
      height: 100px;
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
    #lens {
      display: none;
    }
  }
</style>

<section>
  <article>
    <div class="f-wt6">BOOKS WE RECOMMEND</div>
    <hr />
    <div class="flex p-10" style="overflow-x: scroll;">
      {#each data.books as bk}
        <div class="books flex">
          <img src="https://{bk.image}" alt={bk.name} />
        </div>
      {/each}
    </div>
  </article>
  <br />
  <article>
    <div class="f-wt6">CHANNELS WE RECOMMEND</div>
    <hr />
    <div class="flex p-10" style="overflow-x: scroll;text-align:center;">
      {#each data.yt as y}
        <div class="channels flex">
          <img src="https://{y.image}" alt={y.name} />
          {y.name}
        </div>
      {/each}
    </div>
  </article>
  <br />
  <article>
    <div class="f-wt6">MISTAKES IN SCI-FI MOVIES</div>
    <hr />
    <input type="text" />
    <table>Movies</table>
  </article>
</section>
