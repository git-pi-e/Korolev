<script>
    let space = [];
    fetch("https://www.spaceflightnewsapi.net/api/v2/articles")
        .then((res) => res.json())
        .then((r) => (space = r));
</script>

<style type="text/scss">
    section {
        padding: 4% 20%;
        article {
            width: 100%;
        }
    }
    .news {
        width: calc(50% - 20px);
        position: relative;
        margin: 5px;
        color: #000;
        background: linear-gradient(45deg, #fff, #aaa);
        border-radius: 10px;
        padding: 5px;
    }
</style>

<section>
    <article style="display:flex;flex-wrap:wrap;">
        {#each space as el}
            <div class="news">
                <a href={el.url}>
                    <img
                        src={el.imageUrl}
                        alt={el.title}
                        style="object-fit: cover;width:100%;border-radius:5px;" />
                    <div style="font-weight:600;padding:2px 0;color:#88f">
                        {el.title}
                        -&gt;
                    </div>
                    <p>{el.summary}</p>
                    <div
                        style="display: flex;width:97.5%;color:#888;justify-content:space-between;position:absolute;bottom:5px;">
                        <span>{el.newsSite}</span>
                        <span>{new Date(el.publishedAt).toLocaleDateString(
                                'en-GB',
                                {
                                    timeZone: 'UTC',
                                    timeZoneName: 'short',
                                }
                            )}</span>
                    </div>
                </a>
            </div>
        {/each}
    </article>
</section>
