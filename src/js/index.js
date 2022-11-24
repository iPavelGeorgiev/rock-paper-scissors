import {createLogo, createChoicePanel} from './ui.js';
import {getDifficulty, getScore, setScore, animateCSS} from './utilities.js';

// Selectors & Variables
const scoreboardSel = document.querySelector('.scoreboard');
const mainSel = document.querySelector('#main');

// Init
(function init() {
  const difficulty = getDifficulty();
  const score = getScore(difficulty);
  setScore(score);
  animateCSS('.score-total', 'zoomIn');

  const logo = createLogo(difficulty);
   const choicePanel = createChoicePanel(difficulty);

  scoreboardSel.prepend(logo);
  mainSel.append(choicePanel);
})();
