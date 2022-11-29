const getDifficulty = () => {
  const difficulty = localStorage.getItem('difficulty');

  return difficulty || 'easy';
};

const getScore = (difficulty = 'easy') => {
  const score = localStorage.getItem(`score-${difficulty}`);

  return Number(score);
};

const setScore = (score = 0) => {
  document.querySelector('.score-total').textContent = score;
};

const animateCSS = (element, animation, prefix = 'animate__') =>
  new Promise((resolve) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);

    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });

export {getDifficulty, getScore, setScore, animateCSS};
