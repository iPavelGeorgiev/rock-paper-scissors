// Selectors & Variables
const btnMusicToggle = document.querySelector('.btn-music-toggle');
const btnVolumeToggle = document.querySelector('.btn-volume-toggle');

let isMusicActive = false;
let isVolumeActive = true;

// Functions
const sounds = (() => {
  const music = new Audio('../sounds/music.mp3');
  music.loop = true;
  music.volume = 0.3;

  const choice = new Audio('../sounds/choice.mp3');
  const click = new Audio('../sounds/click.mp3');
  const toggle = new Audio('../sounds/toggle.mp3');
  const win = new Audio('../sounds/win.mp3');
  const lose = new Audio('../sounds/lose.mp3');
  const draw = new Audio('../sounds/draw.mp3');

  return {
    music,
    choice,
    click,
    toggle,
    win,
    lose,
    draw,
  };
})();

const toggleMusic = () => {
  btnMusicToggle.classList.toggle('sound-active');
  sounds.toggle.play();

  if (isMusicActive) {
    sounds.music.pause();
  } else {
    sounds.music.play();
  }

  isMusicActive = !isMusicActive;
};

const toggleVolume = () => {
  btnVolumeToggle.classList.toggle('sound-active');
  const volumeImg = document.querySelector('.btn-volume-toggle img');

  if (isVolumeActive) {
    Object.entries(sounds).forEach(([key, value]) => {
      if (key === 'music') return;

      const sound = value;
      sound.muted = true;
      volumeImg.src = '/img/volume-xmark-solid.svg';
    });
  } else {
    sounds.toggle.play();

    Object.entries(sounds).forEach(([key, value]) => {
      if (key === 'music') return;

      const sound = value;
      sound.muted = false;
      volumeImg.src = '/img/volume-high-solid.svg';
    });
  }
  isVolumeActive = !isVolumeActive;
};

toggleVolume();

// Event Listeners
btnMusicToggle.addEventListener('click', toggleMusic);
btnVolumeToggle.addEventListener('click', toggleVolume);

// Exports
export default sounds;
