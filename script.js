let audio = null;
let fullscreenActivated = false;

/* Djur + ljud */
const animals = {
  cow:   ["sounds/cow1.mp3",   "sounds/cow2.mp3",   "sounds/cow3.mp3"],
  horse:["sounds/horse1.mp3","sounds/horse2.mp3","sounds/horse3.mp3"],
  cat:  ["sounds/cat1.mp3",   "sounds/cat2.mp3",   "sounds/cat3.mp3"],
  dog:  ["sounds/dog1.mp3",   "sounds/dog2.mp3",   "sounds/dog3.mp3"],
  duck: ["sounds/duck1.mp3",  "sounds/duck2.mp3",  "sounds/duck3.mp3"]
};

/* Fullscreen (första trycket) */
function requestFullscreen() {
  if (fullscreenActivated) return;

  const el = document.documentElement;
  if (el.requestFullscreen) el.requestFullscreen();
  else if (el.webkitRequestFullscreen) el.webkitRequestFullscreen();

  fullscreenActivated = true;
}

/* Vibration */
function vibrate(ms = 70) {
  if (navigator.vibrate) navigator.vibrate(ms);
}

/* Spela slumpat ljud */
function playRandomSound(animalKey) {
  const sounds = animals[animalKey];
  if (!sounds) return;

  const randomIndex = Math.floor(Math.random() * sounds.length);
  const sound = sounds[randomIndex];

  if (audio) {
    audio.pause();
    audio.currentTime = 0;
  }

  audio = new Audio(sound);
  audio.play();
}

/* Klick på djur */
document.querySelectorAll(".animal-grid img").forEach(img => {
  img.addEventListener("click", () => {
    requestFullscreen();
    vibrate();
    playRandomSound(img.dataset.animal);
  });
});