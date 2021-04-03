<script>
    export let data;

    const options = {
        weekday: "short",
        year: "numeric",
        month: "short",
        day: "numeric",
    };
    import Events from "../core/events.json";
</script>

<header style="padding:1% 20%;color:#888">
    <input type="checkbox" id="vehicle1" checked disabled />
    <label for="vehicle1">We make a main observations page</label><br />

    <input type="checkbox" id="vehicle1" checked disabled />
    <label for="vehicle1">Usme ek writeup</label><br />

    <input type="checkbox" id="vehicle1" checked disabled />
    <label for="vehicle1">Ek section me telescopes</label><br />

    <input type="checkbox" id="vehicle1" disabled />
    <label for="vehicle1">Aur doosre section me timeline</label><br />

    <input type="checkbox" id="vehicle1" disabled />
    <label for="vehicle1">3rd section me astrophotography Aur beech</label><br
    />

    <input type="checkbox" id="vehicle1" disabled />
    <label for="vehicle1">beeche star party ke images daal do</label><br />
</header>

<section>
    <article>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Deleniti
        laudantium omnis quas architecto rem ducimus nihil debitis sequi
        laboriosam tempore veritatis amet aspernatur labore iusto possimus qui
        recusandae, fugit itaque? Numquam nisi, in rem voluptatum ipsam odit
        dolorem beatae repudiandae culpa? Voluptates deleniti, sapiente sit
        temporibus esse mollitia sint! Inventore!
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
            <span> Upcoming in Space </span>
            <svg viewBox="0 0 512 512"
                ><path
                    d="M511.328,20.8027c-11.60759,38.70264-34.30724,111.70173-61.30311,187.70077,6.99893,2.09372,13.4042,4,18.60653,5.59368a16.06158,16.06158,0,0,1,9.49854,22.906c-22.106,42.29635-82.69047,152.795-142.47819,214.40356-.99984,1.09373-1.99969,2.5-2.99954,3.49995A194.83046,194.83046,0,1,1,57.085,179.41009c.99985-1,2.40588-2,3.49947-3,61.59994-59.90549,171.97367-120.40473,214.37343-142.4982a16.058,16.058,0,0,1,22.90274,9.49988c1.59351,5.09368,3.49947,11.5936,5.5929,18.59351C379.34818,35.00565,452.43074,12.30281,491.12794.70921A16.18325,16.18325,0,0,1,511.328,20.8027ZM319.951,320.00207A127.98041,127.98041,0,1,0,191.97061,448.00046,127.97573,127.97573,0,0,0,319.951,320.00207Zm-127.98041-31.9996a31.9951,31.9951,0,1,1-31.9951-31.9996A31.959,31.959,0,0,1,191.97061,288.00247Zm31.9951,79.999a15.99755,15.99755,0,1,1-15.99755-15.9998A16.04975,16.04975,0,0,1,223.96571,368.00147Z"
                /></svg
            >
        </div>
        {#each Events.filter((e) => new Date(e.date) - new Date() > 0) as event, i}
            {#if i < 2}
                <div>
                    {event.title} on {new Date(event.date).toLocaleDateString(
                        "en-UK",
                        options
                    )} - {event.time}
                    <p>
                        {event.desc} <br />
                        {event.misc}
                    </p>
                </div>
            {/if}
        {/each}
    </article>
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
</style>
