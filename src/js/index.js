import {choices, createLogo, createChoicePanel, updateModalContent, createResultPanel} from './ui.js';
import {getDifficulty, getScore, setScore, animateCSS} from './utilities.js';

// Selectors & Variables
const scoreboardSel = document.querySelector('.scoreboard');
const mainSel = document.querySelector('#main');
const difficultySwitchSel = document.querySelector('.difficulty-switch');
const choicePanelSel = () => document.querySelector('#choice-panel');

// Functions
const getHouseChoice = () => {
  const difficulty = getDifficulty();
  const randomInt = Math.floor(Math.random() * choices[difficulty].length);

  return choices[difficulty][randomInt];
};

const switchDifficulty = (e) => {
  if (e.target.tagName !== 'INPUT') return;

  const difficulty = document.querySelector('.difficulty-switch-input:checked').value;
  localStorage.setItem('difficulty', difficulty);

  const score = getScore(difficulty);
  setScore(score);
  animateCSS('.score-total', 'zoomIn');

  const logo = createLogo(difficulty);
  const choicePanel = createChoicePanel(difficulty);

  updateModalContent(difficulty);
  document.querySelector('#result-panel')?.remove();
  document.querySelector('#logo').replaceWith(logo);
  choicePanelSel().replaceWith(choicePanel);
};

// Event Listeners
difficultySwitchSel.addEventListener('click', switchDifficulty);

// Init
(function init() {
  const difficulty = getDifficulty();
  const score = getScore(difficulty);
  setScore(score);
  animateCSS('.score-total', 'zoomIn');

  const logo = createLogo(difficulty);
  const choicePanel = createChoicePanel(difficulty);

  document.querySelector(`input#difficulty-${difficulty}`).checked = true;
  updateModalContent(difficulty);
  scoreboardSel.prepend(logo);
  mainSel.append(choicePanel);
})();
