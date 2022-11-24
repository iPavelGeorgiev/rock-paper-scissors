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

// Exports
export {createLogo};
