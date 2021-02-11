<script>
    const images = [
        "1464802686167-b939a6910659?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1033&q=80",
        "1419242902214-272b3f66ee7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1087&q=80",
        "1543722530-d2c3201371e7?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=1053&q=80",
        "1444703686981-a3abbc4d4fe3?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
        "1419242902214-272b3f66ee7a?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1087&q=80",
    ];
</script>

<section>
    <div><img src="./assets/logo.svg" alt="" /></div>
    <!-- <div>
        <svg viewbox="0 -56 512 600" height="512" width="512">
            <defs>
                <clipPath id="2009">
                    <rect y="-16" width="512" height="140" />
                </clipPath>
                <clipPath id="2020">
                    <rect y="350" width="512" height="120" />
                </clipPath>

                <filter id="glow">
                    <feGaussianBlur stdDeviation="5" result="coloredBlur" />
                    <feMerge>
                        <feMergeNode in="coloredBlur" />
                        <feMergeNode in="SourceGraphic" />
                    </feMerge>
                </filter>

                <mask id="red-gradient">
                    <linearGradient id="red" x1="0" x2="0" y1="0" y2="1">
                        <stop offset="0%" stop-color="#349" />
                        <stop offset="100%" stop-color="#35d" />
                    </linearGradient>
                </mask>
            </defs>

            <text font-size="100" fill="url(#red)" filter="url(#glow)">
                <tspan x="0" font-size="185" y="160" clip-path="url(#2009)">
                    2009
                </tspan>
                <tspan x="0" font-size="105" y="220">12 YEARS</tspan>
                <tspan x="0" font-size="100" dy="100">CELESTIA</tspan>
                <tspan x="0" font-size="185" dy="120" clip-path="url(#2020)">
                    2020
                </tspan>
            </text>
        </svg>
    </div> -->
    <div class="image-container">
        {#each images as img}
            <img src="https://images.unsplash.com/photo-{img}" alt="" />
        {/each}
    </div>
</section>

<style type="text/scss">
    section {
        padding: 0;
        margin: 0;
        .image-container {
            position: relative;
            margin: 0;
            padding: 0;
            width: 100%;

            img {
                margin: 0;
                height: 50vh;
                opacity: 1;
                width: 100%;
                transition: opacity 0.1s ease;
                object-fit: cover;

                position: absolute;
                animation-name: multiple-image-crossfade;
                animation-timing-function: ease-in-out;
                animation-iteration-count: infinite;
                animation-duration: 8s;
                &:nth-of-type(1) {
                    animation-delay: 6s;
                }
                &:nth-of-type(2) {
                    animation-delay: 4s;
                }
                &:nth-of-type(3) {
                    animation-delay: 2s;
                }
                &:nth-of-type(4) {
                    animation-delay: 0;
                }
            }
        }

        @keyframes multiple-image-crossfade {
            0% {
                opacity: 1;
            }
            17% {
                opacity: 1;
            }
            25% {
                opacity: 0;
            }
            92% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }
    }
</style>
