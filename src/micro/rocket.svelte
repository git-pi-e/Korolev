<style type="text/scss">
  $stand_size: 80px;
  $flame-height: 80px;
  $orange-yellow: #ff9224;
  @keyframes legacy {
    to {
      opacity: 1;
    }
  }
  .legacy {
    opacity: 0;
    // z-index: 1;
    animation: legacy 1.5s ease-in forwards 3.5s;
  }
  #container {
    // z-index: 0;
    --orange: #ffd480;
    top: 50%;
    margin: auto;

    .rocket_c {
      position: absolute;
      margin: auto;
      bottom: 75px;
      left: 0;
      right: 0;
      width: 36px;
      height: 300px;
      background: linear-gradient(to right, #bbb, white, #f1f1f1);
      border-top: 5px solid #000;
      border-bottom: 5px solid #000;
      border-top-left-radius: 2px;
      border-top-right-radius: 2px;
      transform: translate(-100px, -200%) rotateZ(-25deg) scale(0.5);
      animation: land 4s cubic-bezier(0.28, 0.8, 0.65, 0.87) forwards;

      .sec_pop {
        position: absolute;
        top: 10.5%;
        height: 4px;
        width: 4px;
        left: 0;
        border-radius: 30px;
        animation: sec_prop 3s linear 0.5s forwards;
      }

      .ganch {
        position: absolute;
        top: 0.5%;
        height: 4px;

        &_1 {
          width: 16px;
          margin: auto;
          left: 0;
          right: 0;
          border-bottom-left-radius: 100px;
          border-bottom-right-radius: 100px;
          background: #999;
          transform: rotateZ(-45deg);
          animation: ganch 4s linear forwards;
        }

        &_2 {
          width: 16px;
          left: -16px;
          border-bottom-left-radius: 150%;
          transform: rotateZ(6deg);
          background: #aaa;
          border-bottom: 1px solid #555;
        }
        &_3 {
          width: 16px;
          right: -16px;
          border-bottom-right-radius: 150%;
          transform: rotateZ(-6deg);
          background: #aaa;
          border-bottom: 1px solid #555;
        }
      }
      .text {
        height: 85px;
        top: 45%;
        .us {
          padding: 2px;
          width: 66%;
          margin: 18px auto;
        }
        .spacex {
          color: #058;
          width: 45%;
          font-size: 0.8em;
          margin: auto;
          writing-mode: vertical-rl;
          text-orientation: upright;
        }
      }

      .leg {
        position: absolute;
        background: #222;
        bottom: $stand_size/1.7;
        height: 28px;
        border-radius: 20px;
        transform-origin: bottom;
        transition: transform 1s cubic-bezier(0.52, 0.22, 0.89, 0.73),
          height 1s linear;
        &_1 {
          width: 5px;
          left: -3px;
          animation: leg_m 2s linear forwards 1s,
            leg_1 2s cubic-bezier(0.27, 0.59, 0.78, 0.93) forwards 1s;
        }
        &_2 {
          width: 5px;
          right: -3px;
          animation: leg_m 2s linear forwards 1s,
            leg_2 2s cubic-bezier(0.27, 0.59, 0.78, 0.93) forwards 1s;
        }
        &_3 {
          width: 6px;
          margin: auto;
          left: 0;
          right: 0;
          animation: leg_m 2s linear forwards 1s,
            leg_3 2s cubic-bezier(0.27, 0.59, 0.78, 0.93) forwards 1s;
        }
      }
      .stand {
        position: absolute;
        bottom: 0;
        transform-origin: bottom;
        height: $stand_size;

        &_1 {
          margin: auto;
          left: 0;
          right: 0;
          width: 8px;
          border-radius: 200% 200% 0 0;
          border-top-left-radius: 100% 100%;
          border-top-right-radius: 100% 100%;
          border: 10px solid #fff;
          background: #fff;
          animation: stand_1 2s linear forwards 1s,
            backgrounder 2s linear forwards 1s;
        }
        &_2 {
          width: 8px;
          left: -5px;
          border-top-left-radius: 100%;
          border-bottom-left-radius: 80% 90%;
          background: #fff;
          animation: stand_2 2s linear forwards 1s,
            backgrounder 2s linear forwards 1s;
          &:after {
            content: "";
            display: block;
            position: absolute;
            width: 8px;
            height: 8px;
            background: #000;
            bottom: -5px;
            border-radius: 50%;
            left: 0;
            right: 0;
            margin: auto;
          }
        }
        &_3 {
          width: 8px;
          right: -5px;
          border-top-right-radius: 80% 90%;
          border-bottom-right-radius: 80% 90%;
          background: #fff;
          animation: stand_3 2s linear forwards 1s,
            backgrounder 2s linear forwards 1s;

          &:after {
            content: "";
            display: block;
            position: absolute;
            width: 8px;
            height: 8px;
            background: #000;
            bottom: -5px;
            border-radius: 50%;
            left: 0;
            right: 0;
            margin: auto;
          }
        }
      }
      .prop {
        position: relative;
        top: 90%;
        width: 12px;
        height: 20px;
        background: linear-gradient(to right, #222, #333, #222);
        border-radius: 70% 70% 0 0;
        &:after {
          content: "";
          display: inline-block;
          position: absolute;
          margin-left: 24px;
          width: 12px;
          height: 20px;
          background: linear-gradient(to right, #222, #333, #222);
          border-radius: 70% 70% 0 0;
        }
        &:before {
          content: "";
          display: inline-block;
          position: absolute;
          margin-left: 12px;
          width: 12px;
          height: 20px;
          background: linear-gradient(to right, #191919, #222, #191919);
          border-radius: 70% 70% 0 0;
        }
      }
    }
    .platform {
      position: absolute;
      display: block;
      bottom: 20px;
      width: 60%;
      height: 20px;
      margin: auto;
      left: 0;
      right: 0;
      background: #444;
      animation: plat_burning 2s linear forwards 1.5s;
    }
  }
  @keyframes land {
    100% {
      transform: translateY(0%);
    }
  }
  .boost {
    position: relative;
    width: 100%;
    transform: rotateZ(170deg) translateX(-10px);
    top: 90.5%;
    animation: fix_flame 2s ease-out forwards 1s;
  }
  .flame {
    width: 18px;
    height: $flame-height;
    margin: 0px auto;
    position: relative;
    animation: move 0.5s, move-left 3s, scaledown 2s ease forwards 2s;
    transform-origin: 50% 90%;
    .top {
      width: 16px;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      background: white;
      border-top-left-radius: 500%;
      border-bottom-left-radius: 100px;
      border-top-right-radius: 500%;
      border-bottom-right-radius: 20px;
      transform: skewY(-10deg);
      box-shadow: 0 0px 0px 3px white, 0 -20px 1px 4px white,
        0 -25px 2px 3px #ffd9b3, 0 -30px 5px 4px #ffd9b3,
        0 0px 150px 15px #ffd9b3, 0 -10px 2px 4px white, 0 -5px 3px 3px white;
      animation: flame-up 1s infinite;
    }
  }
  @media (max-width: 400px) {
    #container {
      transform: scale(0.8) translateX(-5%);
    }
  }
</style>

<div id="container" size="max" class="po-rel" bg="0000" style="display:none;">
  <img
    src="./assets/legacy.svg"
    class="po-abs legacy"
    size="max"
    alt="Legacy" />
  <div class="rocket_c">
    <img
      class="us rx-50 m-7"
      src="./assets/logo-sq.png"
      size="min"
      bg="000"
      alt="Mini Logo" />
    <div class="ganch ganch_1" />
    <div class="ganch ganch_2" />
    <div class="ganch ganch_3" />
    <div class="sec_pop" />
    <div class="text po-abs tx-c w-100">
      <p class="spacex">CELESTIA</p>
    </div>
    <div class="prop" />

    <div class="boost">
      <div class="flame">
        <div class="top" />
      </div>
    </div>

    <div class="leg leg_1" />
    <div class="leg leg_2" />
    <div class="leg leg_3" />

    <div class="stand stand_1" />
    <div class="stand stand_2" />
    <div class="stand stand_3" />
  </div>
  <div class="smoke" />
  <div class="platform" />
</div>
