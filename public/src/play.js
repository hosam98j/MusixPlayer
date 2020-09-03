import { song, icons, playButton } from "./index";

function playOrPause() {
  console.log("run");
  // get the current sing to play
  if (song.paused) {
    song.play();
    playButton.children[0].setAttribute("src", icons.pause);
  } else {
    song.pause();
    playButton.children[0].setAttribute("src", icons.play);
  }
}

export default playOrPause;
