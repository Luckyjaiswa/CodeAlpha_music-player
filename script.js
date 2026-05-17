const songs = [
  {
    title: "Song One",
    artist: "Artist One",
    src: "songs/song1.mp3"
  },
  {
    title: "Song Two",
    artist: "Artist Two",
    src: "songs/song2.mp3"
  },
  {
    title: "Song Three",
    artist: "Artist Three",
    src: "songs/song3.mp3"
  }
];

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const volume = document.getElementById("volume");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const playlistEl = document.getElementById("playlist");

let currentSong = 0;
let isPlaying = false;

/* Load Song */
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = song.src;
}

loadSong(songs[currentSong]);

/* Play Pause */
function playPause() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
  } else {
    audio.play();
    isPlaying = true;
  }
}

/* Next Song */
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(songs[currentSong]);
  audio.play();
  isPlaying = true;
}

/* Previous Song */
function prevSong() {
  currentSong =
    (currentSong - 1 + songs.length) % songs.length;
  loadSong(songs[currentSong]);
  audio.play();
  isPlaying = true;
}

/* Progress Bar */
audio.addEventListener("timeupdate", () => {
  const progressPercent =
    (audio.currentTime / audio.duration) * 100;

  progress.value = progressPercent || 0;

  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

/* Set Progress */
progress.addEventListener("input", () => {
  audio.currentTime =
    (progress.value / 100) * audio.duration;
});

/* Volume Control */
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

/* Format Time */
function formatTime(time) {
  if (isNaN(time)) return "0:00";

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

/* Autoplay Next Song */
audio.addEventListener("ended", nextSong);

/* Playlist */
songs.forEach((song, index) => {
  const li = document.createElement("li");
  li.textContent = `${song.title} - ${song.artist}`;

  li.addEventListener("click", () => {
    currentSong = index;
    loadSong(songs[currentSong]);
    audio.play();
    isPlaying = true;
  });

  playlistEl.appendChild(li);
});