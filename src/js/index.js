import {choices, createLogo, createChoicePanel, updateModalContent, createResultPanel} from './ui.js';
import {getDifficulty, getScore, setScore, animateCSS} from './utilities.js';

// Selectors & Variables
const scoreboardSel = document.querySelector('.scoreboard');
const mainSel = document.querySelector('#main');
const difficultySwitchSel = document.querySelector('.difficulty-switch');
const choicePanelSel = () => document.querySelector('#choice-panel');

const choiceBeats = {
  rock: ['scissors', 'lizard'],
  paper: ['rock', 'spock'],
  scissors: ['paper', 'lizard'],
  lizard: ['spock', 'paper'],
  spock: ['scissors', 'rock'],
};

// Functions
const getHouseChoice = () => {
  const difficulty = getDifficulty();
  const randomInt = Math.floor(Math.random() * choices[difficulty].length);

  return choices[difficulty][randomInt];
};

const playRound = (e) => {
  if (e.target.tagName !== 'BUTTON') return;

  const difficulty = getDifficulty();
  const score = getScore(difficulty);
  const playerChoice = e.target.dataset.choice;
  const houseChoice = getHouseChoice();
  let resultPanel;
  let newScore;

  if (playerChoice === houseChoice) {
    newScore = score;
    resultPanel = createResultPanel(playerChoice, houseChoice, 'none');
  } else if (choiceBeats[playerChoice].includes(houseChoice)) {
    newScore = score + 1;
    resultPanel = createResultPanel(playerChoice, houseChoice, playerChoice);
  } else {
    newScore = score > 0 ? score - 1 : score;
    resultPanel = createResultPanel(playerChoice, houseChoice, houseChoice);
  }

  choicePanelSel().classList.add('hidden');
  setTimeout(() => {
    localStorage.setItem(`score-${difficulty}`, newScore);
    setScore(newScore);
  }, 2000);

  mainSel.append(resultPanel);
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
  choicePanel.addEventListener('click', playRound);

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
  choicePanel.addEventListener('click', playRound);

  document.querySelector(`input#difficulty-${difficulty}`).checked = true;
  updateModalContent(difficulty);
  scoreboardSel.prepend(logo);
  mainSel.append(choicePanel);
})();
