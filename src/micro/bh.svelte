<style type="text/scss">
    $trees: #4d7;
    $earth-outline-blue: #111133;
    $earth-aura: #111;
    %centerElement {
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .wrapper {
        padding: 100px 0 0 100px;
        position: relative;
        margin: 0 auto;
        width: 100%;
        height: 500px;
        overflow: hidden;
    }
    .earth {
        position: relative;
        width: 300px;
        height: 300px;
        @extend %centerElement;
        background: #000;
        border-radius: 50%;
        animation: bhround 10s infinite linear;
        box-shadow: 0 0 70px #ff0, 10px 10px 20px #ff0, -15px -15px 30px #fff,
            40px -40px 120px #f80;
        z-index: 0;
        overflow: hidden;

        &__shadow-container {
            position: absolute;
            left: 50%;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
    }
    @keyframes bhround {
        0% {
            transform: translate(-250px, -250px) rotate(0);
        }
        100% {
            transform: translate(-250px, -250px) rotate(360deg);
        }
    }
</style>

<div class="wrapper">
    <div class="earth">
        <div class="earth__shadow-container" />
    </div>
</div>
