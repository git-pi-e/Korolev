<script>
    export let wd = 128;
</script>

<svg
    viewbox="-6 -8 1096 528"
    width="{wd}px"
    font-size="100"
    font-family="Helvetica"
    ><style>
        circle {
            stroke: #fff;
        }
    </style>
    <defs>
        <circle
            id="m"
            cx="256"
            cy="256"
            r="248"
            stroke-width="8"
            fill="#0000"
        />
        <clipPath id="eclipse">
            <use xlink:href="#m" />
        </clipPath>
    </defs>
    <!-- <circle cx="512" cy="256" r="64" fill="#0000" /> -->
    <circle cx="256" cy="256" r="248" stroke-width="32" fill="#0000" />
    <g clip-path="url(#eclipse)">
        <circle cx="420" cy="256" r="300" fill="#fff" />
        <text y="290" x="160" fill="#000">SEDS</text>
    </g>
    <circle
        cx="512"
        cy="256"
        r="64"
        fill="#fff"
        style="mix-blend-mode: difference;"
    />
    <text y="290" x="595" fill="#fff">CELESTIA</text>
</svg>
