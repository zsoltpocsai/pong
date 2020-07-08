const Sound = (function() {
  const bounce1 = new Audio("./sounds/beeep.ogg");
  const bounce2 = new Audio("./sounds/plop.wav");
  const score = new Audio("./sounds/peeeeeep.ogg");
  const maxScore = new Audio("./sounds/max_score.wav");
  return {
    playBounce1: function() {
      bounce1.play();
    },
    playBounce2: function() {
      bounce2.play();
    },
    playScore: function() {
      score.play();
    },
    playLaunch: function() {
      bounce2.play();
    },
    playMaximumScore: function() {
      maxScore.play();
    }
  }
})();

export default Sound;