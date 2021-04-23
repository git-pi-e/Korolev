<script>
</script>

<style type="text/scss">
  $stand_size: 80px;
  $flame-height: 80px;
  $orange: #ffd480;
  $orange-yellow: #ff9224;

  #container {
    position: relative;
    width: 500px;
    height: 500px;
    top: 50%;
    margin: auto;
    background: transparent;

    .rocket_c {
      position: absolute;
      margin: auto;
      bottom: 75px;
      left: 0;
      right: 0;
      width: 36px;
      height: 300px;
      background: linear-gradient(to right, #bbb, white, #f1f1f1);
      box-shadow: 0 -5px 0 #444, inset 0 -30px 35px -5px rgba(0, 0, 0, 0.6);
      border-bottom: 10px solid #444;
      transform: translate(-100px, -200%) rotateZ(-25deg) scale(0.5);
      animation: land 4s cubic-bezier(0.28, 0.8, 0.65, 0.87) forwards;
      will-change: transform;

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
        top: 7%;
        height: 4px;

        &_1 {
          width: 16px;
          margin: auto;
          left: 0;
          right: 0;
          border-bottom-left-radius: 150%;
          border-bottom-right-radius: 150%;
          background: #999;
          box-shadow: 1px 3px 10px -1px rgba(0, 0, 0, 0.9);
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
        position: absolute;
        width: 100%;
        height: 85px;
        top: 16%;
        text-align: center;
        .us {
          width: 38%;
          margin: 18px auto;
        }
        .spacex {
          width: 90%;
          margin: auto;
          transform: rotate(90deg);
        }
      }

      .leg {
        position: absolute;
        background: #333;
        bottom: $stand_size/1.7;
        height: 28px;
        border-radius: 50%;
        transform-origin: bottom;
        transition: transform 1s cubic-bezier(0.52, 0.22, 0.89, 0.73),
          height 1s linear;
        will-change: transform, height;

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
          width: 26px;
          border-radius: 200% 200% 0 0;
          border-top-left-radius: 80% 90%;
          border-top-right-radius: 80% 90%;
          border: 10px solid #555;
          animation: stand_1 2s linear forwards 1s;
          will-change: transform;
        }
        &_2 {
          width: 8px;
          left: -5px;
          border-top-left-radius: 80% 90%;
          border-bottom-left-radius: 80% 90%;
          background: #555;
          animation: stand_2 2s linear forwards 1s;
          will-change: transform;
          &:after {
            content: "";
            display: block;
            position: absolute;
            width: 8px;
            height: 8px;
            background: #353535;
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
          background: #555;
          animation: stand_3 2s linear forwards 1s;
          will-change: transform;
          &:after {
            content: "";
            display: block;
            position: absolute;
            width: 8px;
            height: 8px;
            background: #353535;
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
        top: 103%;
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
      width: 40%;
      height: 20px;
      margin: auto;
      left: 0;
      right: 0;
      background: #444;
      animation: plat_burning 2s linear forwards 1.5s;
      will-change: box-shadow;
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
    top: 104%;
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
        //top
        0 0px 150px 15px #ffd9b3,
        //global
        0 -10px 2px 4px white,
        0 -5px 3px 3px white;
      animation: flame-up 1s infinite;
    }
    .shadows {
      position: absolute;
      left: 45%;
      top: -5%;
      width: 0px;
      height: 50px;
      border-radius: 50%;
      box-shadow: 0 5px 20px 15px white, 0 0px 150px 30px #ffd9b3;
    }
  }

  @keyframes flame-up {
    50% {
      box-shadow: 0 0px 0px 3px white, 0 -38px 1px 2px white,
        0 -41px 2px 3px #ffd9b3, 0 -50px 5px 4px #ffd9b3,
        //orange top
        0 0px 150px 10px $orange,
        //orange global
        0 -10px 2px 4px white,
        0 -5px 3px 3px white;
    }
  }
  @keyframes move {
    0% {
      transform: skewX(2deg) skewY(5deg);
    }
    50% {
      transform: skewX(-2deg) skewY(-0deg);
    }
    100% {
      transform: skewX(2deg) skewY(5deg);
    }
  }
  @keyframes move-left {
    50% {
      transform: skewX(3deg);
    }
  }
  @keyframes stand_1 {
    100% {
      transform: rotateX(-125deg);
    }
  }
  @keyframes stand_2 {
    100% {
      transform: rotateZ(-125deg);
    }
  }
  @keyframes stand_3 {
    100% {
      transform: rotateZ(125deg);
    }
  }
  @keyframes leg_1 {
    100% {
      transform: rotateZ(-146deg);
    }
  }
  @keyframes leg_2 {
    100% {
      transform: rotateZ(146deg);
    }
  }
  @keyframes leg_3 {
    100% {
      transform: rotateX(-146deg);
      z-index: 10;
    }
  }
  @keyframes leg_m {
    100% {
      height: 105px;
    }
  }
  @keyframes fix_flame {
    100% {
      transform: rotateZ(180deg) translatex(0px);
    }
  }
  @keyframes scaledown {
    100% {
      transform: scale(0.35);
      height: 40px;
    }
  }
  @keyframes plat_burning {
    30% {
      box-shadow: 0px -20px 60px -5px rgba(255, 255, 255, 0.7);
    }
    60% {
      box-shadow: 0px -30px 70px 5px white;
    }
    100% {
      box-shadow: 0px -10px 80px -10px rgba(255, 255, 255, 0.5);
    }
  }
  @keyframes sec_prop {
    20% {
      box-shadow: -17px 0 10px 4px rgba(255, 255, 255, 0.3),
        -14px 5px 10px 6px rgba(255, 255, 255, 0.4),
        -5px 0px 10px 3px rgba(255, 255, 255, 0.6);
    }
    50% {
      box-shadow: -17px 0 12px 5px rgba(255, 255, 255, 0.3),
        -14px 5px 13px 7px rgba(255, 255, 255, 0.3),
        -5px 0px 10px 3px rgba(255, 255, 255, 0.8);
    }
    60% {
      box-shadow: -17px 0 15px 4px rgba(255, 255, 255, 0.3),
        -14px 5px 10px 6px rgba(255, 255, 255, 0.4),
        -5px 0px 10px 3px rgba(255, 255, 255, 0.6);
    }
    100% {
      box-shadow: 0 0 0 rgba(0, 0, 0, 0);
    }
  }
  @keyframes dondo {
    0% {
      transform: rotateZ(0deg);
    }
    50% {
      transform: rotateZ(2deg);
    }
    100% {
      transform: rotateZ(-1deg);
    }
  }
</style>

<section>
  <div id="container">
    <div class="rocket_c">
      <div class="ganch ganch_1" />
      <div class="ganch ganch_2" />
      <div class="ganch ganch_3" />

      <div class="sec_pop" />

      <div class="text">
        <img
          class="us"
          src="https://media-exp1.licdn.com/dms/image/C4E0BAQFL_s1G8qamDw/company-logo_200_200/0?e=2159024400&v=beta&t=Q1UIwA1oqa9mptu-oMM7lAZIuzddFud9M2t8Guy66RI" />
        <p class="spacex">Celestia</p>
      </div>
      <div class="prop" />

      <div class="boost">
        <div class="flame">
          <div class="top" />
          <div class="shadows" />
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
</section>
