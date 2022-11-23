// Functions
const createLogoImg = (difficulty) => {
  const img = document.createElement('img');
  img.classList.add(`logo-${difficulty}`, 'animate__animated', 'animate__zoomIn');
  img.setAttribute('id', 'logo-img');
  img.setAttribute('src', `img/logo-${difficulty}.svg`);
  img.setAttribute('alt', `${difficulty} game logo`);

  return img;
};

// Exports
export {createLogoImg};
