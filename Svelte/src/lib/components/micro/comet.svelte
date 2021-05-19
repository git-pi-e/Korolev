<style type="text/scss">
  .space__comet {
    font-size: 100px;
    width: 1.8em;
    height: 0.6em;
    border-top-right-radius: 0.3em;
    border-bottom-right-radius: 0.3em;
    background-image: radial-gradient(
        circle at 0.06em 50%,
        #fc4 0,
        #fc4 0.06em,
        transparent 0.06em
      ),
      linear-gradient(#fc4 0, #fc4),
      radial-gradient(
        circle at 0 50%,
        transparent 0,
        transparent 0.05em,
        #fc4 0.05em
      ),
      radial-gradient(
        circle at 0.06em 50%,
        #fc4 0,
        #fc4 0.06em,
        transparent 0.06em
      ),
      linear-gradient(#fc4 0, #fc4),
      radial-gradient(
        circle at 0 50%,
        transparent 0,
        transparent 0.05em,
        #fc4 0.05em
      ),
      radial-gradient(
        circle at 0.06em 50%,
        #fc4 0,
        #fc4 0.06em,
        transparent 0.06em
      ),
      linear-gradient(#fc4 0, #fc4);
    background-size: 100% 0.12em, 1.82em 0.12em, 1.61em 0.12em, 100% 0.12em,
      1.7em 0.12em, 1.5em 0.12em, 100% 0.12em, 1.87em 0.12em;
    background-position: 0.06em 0, 0.11em 0, 0.32em 0.11em, 0.18em 0.23em,
      0.24em 0.23em, 0.44em 0.35em, 0 0.47em, 0.06em 0.47em;
    background-repeat: no-repeat;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    animation: flyby 10s linear infinite;

    &:before {
      content: " ";
      display: block;
      background: rgba(255, 255, 255, 0.5);
      width: 0.45em;
      height: 0.45em;
      border-radius: 50%;
      margin-right: 0.07em;
    }
  }

  @keyframes flyby {
    0% {
      transform: scale(1) rotate(45deg) translate(-100px, -100px);
      opacity: 1;
    }
    50% {
      transform: scale(0.85) rotate(45deg) translate(70vw, 25vh);
      opacity: 0;
    }
    100% {
      opacity: 0;
    }
  }
</style>

<div class="space__comet-container" style="position:fixed;">
  <div class="space__comet" />
</div>
