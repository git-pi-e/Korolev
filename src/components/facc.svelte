<script>
    export let data;
    import Mars from "../micro/mars.svelte";
</script>

<section>
    <article style="background:linear-gradient(135deg, #e66, #ba1e68)">
        <div class="l1">
            <span> Open Lectures </span>
            <svg viewBox="0 0 640 512"
                ><path
                    d="M208 352c-2.39 0-4.78.35-7.06 1.09C187.98 357.3 174.35 360 160 360c-14.35 0-27.98-2.7-40.95-6.91-2.28-.74-4.66-1.09-7.05-1.09C49.94 352-.33 402.48 0 464.62.14 490.88 21.73 512 48 512h224c26.27 0 47.86-21.12 48-47.38.33-62.14-49.94-112.62-112-112.62zm-48-32c53.02 0 96-42.98 96-96s-42.98-96-96-96-96 42.98-96 96 42.98 96 96 96zM592 0H208c-26.47 0-48 22.25-48 49.59V96c23.42 0 45.1 6.78 64 17.8V64h352v288h-64v-64H384v64h-76.24c19.1 16.69 33.12 38.73 39.69 64H592c26.47 0 48-22.25 48-49.59V49.59C640 22.25 618.47 0 592 0z"
                /></svg
            >
        </div>
        <div class="lecture">
            <a
                class="watch"
                href="https://youtube.com/channel/UCuZ1RL7Qv5tKaQeWy28qhUw"
            >
                Watch Here
            </a>
            <img src="/assets/images/lectures.png" alt="" />
            <p>
                Various people including professors from reputable universities
                and even our own club members give lectures. Paper presentation
                is a new venture we have undertaken. People select a paper and
                present it to the club members, and a discussion on the paper is
                followed.
            </p>
        </div>
    </article>
    <article style="background:linear-gradient(135deg, #66e, #3469ff)">
        <div class="l1">
            <span> Telescopes </span>
            <svg viewBox="0 0 512 512"
                ><path
                    d="M502.60969,310.04206l-96.70393,96.71625a31.88151,31.88151,0,0,1-45.00765,0L280.572,326.34115l-9.89231,9.90759a190.56343,190.56343,0,0,1-5.40716,168.52287c-4.50077,8.50115-16.39342,9.59505-23.20707,2.79725L134.54715,400.05428l-17.7999,17.79929c.70324,2.60972,1.60965,5.00067,1.60965,7.79793a32.00544,32.00544,0,1,1-32.00544-32.00434c2.79735,0,5.18838.90637,7.7982,1.60959l17.7999-17.79929L4.43129,269.94287c-6.798-6.81342-5.70409-18.6119,2.79735-23.20627a190.58161,190.58161,0,0,1,168.52864-5.407l9.79854-9.79821-80.31053-80.41716a32.002,32.002,0,0,1,0-45.09987L201.96474,9.29814A31.62639,31.62639,0,0,1,224.46868,0a31.99951,31.99951,0,0,1,22.59759,9.29814l80.32615,80.30777,47.805-47.89713a33.6075,33.6075,0,0,1,47.50808,0l47.50807,47.50645a33.63308,33.63308,0,0,1,0,47.50644l-47.805,47.89713L502.71908,265.036A31.78938,31.78938,0,0,1,502.60969,310.04206ZM219.56159,197.433l73.82505-73.82252-68.918-68.9-73.80942,73.80689Zm237.74352,90.106-68.90233-68.9156-73.825,73.82252,68.918,68.9Z"
                /></svg
            >
        </div>
        {#each data.telescopes as tsc}
            <div class="lecture">
                <div class="telescD blur">{tsc.star} ({tsc.range})</div>
                <div class="telesc blur">{tsc.title}</div>
                <img src={tsc.img} alt="" />
            </div>
        {/each}
    </article>
    <article style="background:linear-gradient(135deg, #e6e, #945)">
        <div class="l1">
            <span> Open Source </span>
            <svg viewBox="0 0 384 512"
                ><path
                    d="M384 144c0-44-36-80-80-80s-80 36-80 80c0 36 24 67 58 77-1 16-4 29-11 37-15 19-49 22-85 26-28 3-57 5-81 17v-144c33-10 56-40 56-76 0-44-36-80-80-80S0 36 0 80c0 36 24 66 56 76v199C24 366 0 396 0 432c0 44 36 80 80 80s80-36 80-80c0-34-21-63-51-75 3-5 8-10 15-13 16-8 40-10 66-13 42-4 90-8 118-43 14-17 21-40 22-68 32-11 54-41 54-76zM80 64c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16zm0 384c-9 0-16-7-16-16s7-16 16-16 16 7 16 16-7 16-16 16zm224-320c9 0 16 7 16 16s-7 16-16 16-16-7-16-16 7-16 16-16z"
                /></svg
            >
        </div>
        <div style="display:flex;flex-wrap:wrap;">
            {#each data.opensource as osc}
                {#if !(osc.show == -1)}
                    <a class="pj" href={osc.repo}>
                        <div style="flex:1">
                            <img src={osc.img} alt="" />
                        </div>
                        <div style="flex:3;padding:10px;">{osc.title}</div>
                    </a>
                {/if}
            {/each}
        </div>
    </article>
    <article style="background:linear-gradient(135deg, #B5E, #83C)">
        <div class="l1">
            <span> Podcast </span>
            <svg viewBox="0 0 448 512">
                <path
                    d="M267.429 488.563C262.286 507.573 242.858 512 224 512c-18.857 0-38.286-4.427-43.428-23.437C172.927 460.134 160 388.898 160 355.75c0-35.156 31.142-43.75 64-43.75s64 8.594 64 43.75c0 32.949-12.871 104.179-20.571 132.813zM156.867 288.554c-18.693-18.308-29.958-44.173-28.784-72.599 2.054-49.724 42.395-89.956 92.124-91.881C274.862 121.958 320 165.807 320 220c0 26.827-11.064 51.116-28.866 68.552-2.675 2.62-2.401 6.986.628 9.187 9.312 6.765 16.46 15.343 21.234 25.363 1.741 3.654 6.497 4.66 9.449 1.891 28.826-27.043 46.553-65.783 45.511-108.565-1.855-76.206-63.595-138.208-139.793-140.369C146.869 73.753 80 139.215 80 220c0 41.361 17.532 78.7 45.55 104.989 2.953 2.771 7.711 1.77 9.453-1.887 4.774-10.021 11.923-18.598 21.235-25.363 3.029-2.2 3.304-6.566.629-9.185zM224 0C100.204 0 0 100.185 0 224c0 89.992 52.602 165.647 125.739 201.408 4.333 2.118 9.267-1.544 8.535-6.31-2.382-15.512-4.342-30.946-5.406-44.339-.146-1.836-1.149-3.486-2.678-4.512-47.4-31.806-78.564-86.016-78.187-147.347.592-96.237 79.29-174.648 175.529-174.899C320.793 47.747 400 126.797 400 224c0 61.932-32.158 116.49-80.65 147.867-.999 14.037-3.069 30.588-5.624 47.23-.732 4.767 4.203 8.429 8.535 6.31C395.227 389.727 448 314.187 448 224 448 100.205 347.815 0 224 0zm0 160c-35.346 0-64 28.654-64 64s28.654 64 64 64 64-28.654 64-64-28.654-64-64-64z"
                /></svg
            >
        </div>
        <div class="lecture">
            <img src="/assets/images/podcast.png" alt="" />
        </div>
        <div
            style="display:flex;justify-content:space-around;padding-top:20px;"
        >
            {#each data.podcast as lnk}
                <a href="https://{lnk.link}" class="pcd">
                    <img
                        src={lnk.icon}
                        alt=""
                        style="width:40px;height:auto;"
                    />
                </a>
            {/each}
        </div>
    </article>
    <div style="height:5em">&nbsp;</div>
    <Mars />
</section>

<style type="text/scss">
    section {
        .l1 {
            padding: 10px;
            display: flex;
            justify-content: space-between;
            font-size: 16px;
            font-weight: 500;
            text-transform: uppercase;
            color: #fff;
            svg {
                width: 25px;
                height: 25px;
                fill: #fff;
            }
        }
        padding: 4% 30%;
        article {
            margin: 0 auto;
            border-radius: 24px;
            padding: 10px;
            margin: 20px 0;
        }
    }
    .lecture {
        width: 100%;
        position: relative;
        color: #fff;
        img {
            width: 100%;
            max-height: 400px;
            object-fit: cover;
            border-radius: 10px;
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
            margin: 1%;
            background: transparent;
            cursor: pointer;
            color: #f00;
            border-radius: 20px;
            border: 1px solid #f00;
            transition: all 0.2s ease;
            &:hover {
                background: #f00;
                color: #fff;
            }
        }
        .telescD {
            position: absolute;
            top: 5px;
            right: 5px;
            border-radius: 10px;
            padding: 5px;
            color: #fff;
        }
        .telesc {
            position: absolute;
            bottom: 5px;
            left: 5px;
            font-size: 1.5em;
            border-radius: 10px;
            padding: 5px;
        }
    }
    .pj {
        display: flex;
        margin: 5px 0;
        cursor: pointer;
        height: 225px;
        flex-direction: column;
        width: 50%;
        align-items: center;
        padding-top: 1%;
        transition: background 0.3s ease;
        img {
            width: 200px;
            object-fit: cover;
            height: 200px;
            border-radius: 20px;
        }
        &:hover {
            background: #b588;
            border-radius: 10px;
        }
    }
    .pcd {
        padding: 5px;
        border-radius: 5px;
        &:hover {
            background: #a4d;
        }
    }
    @media (max-width: 1200px) {
        section {
            padding: 4% 25%;
        }
    }
    @media (max-width: 991px) {
        section {
            padding: 4% 20%;
        }
    }
    @media (max-width: 768px) {
        section {
            padding: 4% 10%;
        }
    }
    @media (max-width: 450px) {
        section {
            padding: 4%;
        }
    }
</style>
