<script>
</script>

<style type="text/scss">
    section {
        height: 100%;
        padding: 5% 30%;
        article {
            margin: 0 auto;
        }
    }
    .lecture {
        width: 100%;
        position: relative;
        img {
            width: 100%;
            object-fit: cover;
        }
        p {
            padding: 10px;
            padding-top: 0;
            line-height: 1.5em;
            &::first-line {
                text-transform: uppercase;
            }
        }
        .watch {
            position: absolute;
            top: 0;
            padding: 1%;
            right: 0;
            background: #444;
            opacity: 0.5;
        }
        .telesc {
            position: absolute;
            top: 0;
            right: 0;
            font-size: 5em;
            padding: 1%;
            color: #fff;
        }
        background: #444;
    }
</style>

<section>
    <article>
        <h1 class="l1">Open Lectures</h1>
        <p>We offer Open Lectures</p>
        <h2 class="l2">Coming Next</h2>
        <div class="lecture">
            <div class="watch">WATCH</div>
            <img
                src="https://www.biography.com/.image/c_fill%2Ccs_srgb%2Cfl_progressive%2Ch_400%2Cq_auto:good%2Cw_620/MTE5NDg0MDU1MTUzMTE2Njg3/alan-turing-9512017-1-402.jpg"
                alt="" />
            <p>
                SIR ALAN TURING
                <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Similique voluptatibus recusandae, provident fuga error
                doloribus.
            </p>
        </div>
    </article>
    <article>
        <h1 class="l1">Telescopes</h1>
        <p>We have Telescopes</p>
        <h2 class="l2">Dobsonian</h2>
        <div class="lecture">
            <div class="telesc">f/5</div>
            <img
                src="https://i.ytimg.com/vi/UiW7rRSApBA/maxresdefault.jpg"
                alt="" />
            <p>
                DOBSONIAN BOI
                <br />
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Similique voluptatibus recusandae, provident fuga error
                doloribus.
            </p>
        </div>
    </article>
    <article>
        <h1 class="l1">Open Source Projects</h1>
        <p>We have Projects</p>
    </article>
    <br />
    <br />
    <br />
    <br />
    <br />
</section>
