<script>
</script>

<style type="text/scss">
    svg {
        fill: #fff;
        stroke: #fff;
        .rotor {
            transform-origin: 50% 22%;
            // animation: revolve 3s infinite linear;
        }
    }
    @keyframes revolve {
        0% {
            transform: rotate(0);
        }
        50% {
            transform: rotate(180deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
    section {
        padding: 4% 10%;
        display: flex;
        align-items: center;
        flex-direction: column;
        text-align: center;
        justify-content: center;
        .bigEarth {
            margin-top: 1.5em;
            position: relative;
            border-top: 10px solid #ccf;
            border-radius: 100vw;
            font-size: 5em;
            img {
                position: relative;
                top: -3.3em;
                opacity: 0.9;
                filter: grayscale(0.75) contrast(1);
            }
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
    }
</style>

<section>
    <div class="bigEarth">
        <div style="position:relative;top:-1.25em;">
            MARCH
            <br />
            <span style="font-size:1.5em;"> 2020 </span>
        </div>
        <img
            alt="earth"
            src="https://cdn.pixabay.com/photo/2016/06/14/20/38/planet-earth-1457453_1280.png" />
    </div>
</section>
