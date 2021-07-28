<link
    href="https://fonts.googleapis.com/css?family=Play:400,700"
    rel="stylesheet"
    type="text/css"
/>
<canvas id="game-canvas" width="640" height="640" />

<svelte:head>
    <script src="/js/celestial-invaders.js"></script>
</svelte:head>

<style>
    canvas {
        display: block;
        margin: auto;
        position: relative;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        image-rendering: optimizeSpeed;
        image-rendering: -moz-crisp-edges;
        image-rendering: -webkit-optimize-contrast;
        image-rendering: optimize-contrast;
    }
    @media (max-width: 640px) {
        canvas {
            display: none;
        }
    }
</style>
