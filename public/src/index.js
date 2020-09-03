export const song = new Audio();
const prevButton = document.getElementById("prev");
export const playButton = document.getElementById("play");
const nextButton = document.getElementById("next");
const indecatorFill = document.querySelector(".fill");
const timerCurrent = document.querySelector(".current");
const timerDuration = document.querySelector(".duration");
export const songTitle = document.querySelector(".song-title");
const volumeIndecator = document.querySelector(".volume");
export const content = document.querySelector(".content");
import playOrPause from "./play";

// songs array
export const songs = [];

export const icons = {
  play: "/icons/002-play-button.svg",
  pause: "/icons/003-music-player.svg",
};

// describe witch song will be play
export let songIndex = null;

// get the songs from the server
async function main() {
  // fetch data
  const res = await fetch("/music");

  // convert it to json
  const data = await res.json();

  // assing the songs array with new data
  data.songs.map((song) => songs.push(`/music/${song}`));

  songIndex = counter % songs.length;

  song.src = songs[songIndex];

  songs.map((song) => {
    content.children[1].innerHTML += `<div>${song}</div>`;
  });

  for (let i = 1; i <= songs.length; i++) {
    content.children[0].innerHTML += `<div>${i}</div>`;
  }

  for (let i = 0; i < content.children[1].children.length; i++) {
    content.children[1].children[i].onclick = () => {
      song.src = songs[i];
      song.play();
      songTitle.textContent = gitName(song.src);
    };
  }
}

main();

export let counter = 0;

prevButton.onclick = () => changeSong(false);
playButton.onclick = playOrPause;
nextButton.onclick = () => changeSong(true);

// to play next song or preveious
function changeSong(method) {
  method ? counter++ : counter--;
  songIndex = counter % songs.length;
  song.src = songs[songIndex];
  if (counter < 0) {
    counter = songs.length - 1;
  }
  song.play();
}

function songIndecator() {
  const songDuration = song.duration;
  const songCurrentTime = song.currentTime;
  const indecatorWidth = `${(songCurrentTime / songDuration) * 100}%`;
  indecatorFill.style.width = indecatorWidth;
}

function format(unit) {
  if (unit <= 9) {
    return `0${unit}`;
  } else {
    return unit;
  }
}

function setSongDuration() {
  if (song.duration) {
    const songDuration = Math.ceil(song.duration);
    const m = String(songDuration / 60).split(".")[0];
    const s = songDuration % 60;
    const time = `${format(m)}:${format(s)}`;
    timerDuration.innerHTML = time;
  }
}

song.addEventListener("timeupdate", () => {
  setSongDuration();
  setSongTimer();
  songIndecator();
  songTitle.textContent = gitName(song.src);
});

function setSongTimer() {
  const songCurrentTime = Math.floor(song.currentTime);
  const m = Math.floor(songCurrentTime / 60);
  const s = songCurrentTime % 60;
  const time = `${format(m)}:${format(s)}`;
  timerCurrent.innerHTML = time;
}

export function gitName(url) {
  const name = songs[songIndex];
  const finalName = url.substr(url.lastIndexOf("/") + 1);
  return finalName;
}

window.onkeydown = (e) => {
  const right = "ArrowRight";
  const left = "ArrowLeft";
  const space = "Space";
  if (e.key == right) {
    changeSong(true);
  }
  if (e.key == left) {
    changeSong(false);
  }
  if (e.code == space) {
    playOrPause();
  }
  if (e.key == "ArrowUp") {
    volumeUp();
    changeVolumeIndecator();
    showVolumeIndecator();
  }
  if (e.key == "ArrowDown") {
    volumeDown();
    changeVolumeIndecator();
    showVolumeIndecator();
  }
};

function volumeDown() {
  const songVolume = song.volume;
  if (songVolume > 0) {
    song.volume += -0.25;
  } else {
    console.log("volume min");
  }
}

function volumeUp() {
  if (song.volume < 1) {
    song.volume += 0.25;
  } else {
    console.log("volume max");
  }
}

function changeVolumeIndecator() {
  const volumeRatio = (song.volume / 1) * 100;
  volumeIndecator.children[0].style.width = `${volumeRatio}%`;
}

changeVolumeIndecator();

function showVolumeIndecator() {
  console.log("show");
  volumeIndecator.classList.add("show");
  setTimeout(hideVolumeIndecator, 2000);
}

function hideVolumeIndecator() {
  console.log("hide");
  volumeIndecator.classList.remove("show");
}
