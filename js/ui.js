import sounds from './sounds.js';

// Selectors & Variables
const rulesModalSel = document.querySelector('.rules-modal');
const rulesModalContentSel = document.querySelector('.rules-modal-content');
const btnCloseModalSel = document.querySelector('.btn-close-modal');
const btnShowModalSel = document.querySelector('.btn-show-modal');

const choices = {
  easy: ['paper', 'scissors', 'rock'],
  hard: ['spock', 'scissors', 'paper', 'rock', 'lizard'],
};

// Functions
const createLogo = (difficulty) => {
  const h1 = document.createElement('h1');
  h1.classList.add('animate__animated', 'animate__zoomIn');
  h1.setAttribute('id', 'logo');

  const img = document.createElement('img');
  img.classList.add(`logo-img-${difficulty}`);
  img.setAttribute('src', `img/logo-${difficulty}.svg`);

  if (difficulty === 'hard') {
    img.setAttribute('alt', `rock paper scissors lizard spock`);
  } else {
    img.setAttribute('alt', `rock paper scissors`);
  }

  h1.append(img);
  return h1;
};

const createChoicePanel = (difficulty) => {
  const section = document.createElement('section');
  section.classList.add(`choice-panel-${difficulty}`, 'animate__animated', 'animate__zoomIn');
  section.setAttribute('id', 'choice-panel');

  const h2 = document.createElement('h2');
  h2.textContent = 'Choose one hand sign';
  h2.classList.add('visually-hidden');

  choices[difficulty].forEach((choice) => {
    const btn = document.createElement('button');
    btn.classList.add('btn-choice', choice);
    btn.setAttribute('aria-label', `choose ${choice}`);
    btn.setAttribute('data-choice', choice);
    section.append(btn);
  });

  section.prepend(h2);
  return section;
};

const createResultPanel = (player, house, winner) => {
  const section = document.createElement('section');
  section.classList.add('result-panel', 'animate__animated', 'animate__zoomIn');
  section.setAttribute('id', 'result-panel');

  const divPlayerPickContainer = document.createElement('div');
  divPlayerPickContainer.classList.add('player-pick-container');

  const h3Player = document.createElement('h3');
  h3Player.textContent = 'YOU PICKED';
  h3Player.classList.add('player-pick-title');

  const divPlayerPick = document.createElement('div');
  divPlayerPick.classList.add('player-pick', player);
  divPlayerPick.setAttribute('aria-label', `player picked ${player}`);

  const divWinner = document.createElement('div');
  divWinner.classList.add('result-panel-winner');

  const h2Winner = document.createElement('h2');
  h2Winner.classList.add('result-panel-winner-title');

  const btnPlayAgain = document.createElement('button');
  btnPlayAgain.textContent = 'PLAY AGAIN';
  btnPlayAgain.classList.add('btn-play-again');

  const divHousePickContainer = document.createElement('div');
  divHousePickContainer.classList.add('house-pick-container');

  const h3House = document.createElement('h3');
  h3House.textContent = 'HOUSE PICKED';
  h3House.classList.add('house-pick-title');

  const divHousePick = document.createElement('div');
  divHousePick.classList.add('house-pick', 'placeholder');

  // Show House Pick
  setTimeout(() => {
    divHousePick.classList.remove('placeholder');
    divHousePick.classList.add(house);
    divHousePick.setAttribute('aria-label', `house picked ${house}`);
  }, 1500);

  // Reveal Winner
  setTimeout(() => {
    section.classList.add('reveal');

    if (winner === player) {
      sounds.win.play();
      h2Winner.textContent = 'YOU WIN';
      divPlayerPick.classList.add('winner');
    } else if (winner === house) {
      sounds.lose.play();
      h2Winner.textContent = 'YOU LOSE';
      divHousePick.classList.add('winner');
    } else {
      sounds.draw.play();
      h2Winner.textContent = 'DRAW';
    }
  }, 2000);

  divPlayerPickContainer.append(h3Player, divPlayerPick);
  divHousePickContainer.append(h3House, divHousePick);
  divWinner.append(h2Winner, btnPlayAgain);
  section.append(divPlayerPickContainer, divHousePickContainer, divWinner);

  return section;
};

const toggleModal = () => {
  sounds.click.play();
  rulesModalSel.classList.toggle('hidden');
};

const closeModalKeydown = (e) => {
  if (e.key === 'Escape' && !rulesModalSel.classList.contains('hidden')) {
    rulesModalSel.classList.add('hidden');
  }
};

const closeModalOverlay = (e) => {
  if (!e.target.classList.contains('rules-modal')) return;

  rulesModalSel.classList.add('hidden');
};

const updateModalContent = (difficulty) => {
  rulesModalContentSel.classList.remove('easy', 'hard');
  rulesModalContentSel.classList.add(difficulty);
};

// Event Listeners
btnShowModalSel.addEventListener('click', toggleModal);
btnCloseModalSel.addEventListener('click', toggleModal);
rulesModalSel.addEventListener('click', closeModalOverlay);
document.addEventListener('keydown', closeModalKeydown);

// Exports
export {choices, createLogo, createChoicePanel, updateModalContent, createResultPanel};
