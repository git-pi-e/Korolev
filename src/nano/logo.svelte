<svg
    viewbox="0 0 1088 512"
    width="128px"
    font-size="100"
    font-family="Helvetica"
>
    <style>
        circle {
            stroke: #fff;
        }
    </style>
    <defs>
        <circle id="m" cx="256" cy="256" r="248" stroke-width="8" fill="#000" />
        <clipPath id="eclipse">
            <use xlink:href="#m" />
        </clipPath>
    </defs>
    <circle cx="512" cy="256" r="64" fill="#000" />
    <circle cx="256" cy="256" r="248" stroke-width="8" fill="black" />
    <g clip-path="url(#eclipse)">
        <circle cx="340" cy="256" r="240" fill="#fff" />
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
