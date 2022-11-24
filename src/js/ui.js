// Selectors & Variables
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

// Exports
export {createLogo, createChoicePanel};
