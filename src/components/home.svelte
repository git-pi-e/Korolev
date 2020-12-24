<script>
</script>

<style type="text/scss">
    section {
        padding: 4% 20%;
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
    <div><img src="./assets/logo.svg" alt="" /></div>
    <div>
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
    </div>
</section>
