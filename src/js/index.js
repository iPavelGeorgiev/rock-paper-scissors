import {createLogoImg} from './ui.js';
import {getDifficulty, getScore, setScore, animateCSS} from './utilities.js';

// Selectors & Variables
const scoreboard = document.querySelector('.scoreboard');

// Init
(function init() {
  const difficulty = getDifficulty();
  const score = getScore(difficulty);
  setScore(score);
  animateCSS('.score-total', 'zoomIn');

  const logoImg = createLogoImg(difficulty);

  scoreboard.prepend(logoImg);
})();
