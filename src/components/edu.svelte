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
        display: flex;
        flex-direction: column;
        margin-right: 20px;
        img {
            object-fit: contain;
            height: 250px;
            box-shadow: 5px -5px 2px 2px #0008;
        }
    }
    .channels {
        display: flex;
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
    <!-- <div style="display:flex;flex-direction:column;width:96px;">
        <svg height="96" width="96" viewbox="0 0 512 512">
            <defs>
                <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stop-color="#ff0" />
                    <stop offset="100%" stop-color="#f00" />
                </linearGradient>
            </defs>
            <rect rx="64" width="512" height="512" fill="#fff" />
            <text fill="url(#grad1)" x="25" y="365">
                <tspan
                    font-size="320"
                    font-family="Helvetica Neue"
                    font-weight="100">
                    2.0
                </tspan>
            </text>
        </svg>
        <div style="text-align:center;">Korolev</div>
    </div> -->
    <article>
        <div style="font-weight:600">BOOKS WE RECOMMEND</div>
        <hr />
        <div style="display:flex;overflow-x: scroll;padding:10px 0;">
            {#each data.books as bk}
                <div class="books">
                    <img src="https://{bk.image}" alt={bk.name} />
                </div>
            {/each}
        </div>
    </article>
    <br />
    <article>
        <div style="font-weight:600">CHANNELS WE RECOMMEND</div>
        <hr />
        <div
            style="display:flex;overflow-x: scroll;padding:10px 0;text-align:center;">
            {#each data.yt as y}
                <div class="channels">
                    <img src="https://{y.image}" alt={y.name} />
                    {y.name}
                </div>
            {/each}
        </div>
    </article>
    <br />
    <article>
        <div style="font-weight:600">MISTAKES IN SCI-FI MOVIES</div>
        <hr />
        <input type="text" />
        <table>Movies</table>
    </article>
</section>
