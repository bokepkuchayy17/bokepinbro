const videos = [
  {
    title: "main bertiga emang paling enak",
    thumb: "https://ik.imagekit.io/7cynulshf/IMG_20260413_171315.jpg?updatedAt=1776071764733",
    src: "https://tv1.indoav.app/e/bqDoEXoFUgSx"
  },
  {
    title: "ngewe bocil di kos",
    thumb: "https://ik.imagekit.io/7cynulshf/IMG_20260413_171243.jpg?updatedAt=1776071764729",
    src: "https://www.w3schools.com/html/movie.mp4"
  }
];

const list = document.getElementById("video-list");

videos.forEach(v => {
  const div = document.createElement("div");
  div.className = "card";
  div.innerHTML = `
    <img src="${v.thumb}">
    <div class="title">${v.title}</div>
  `;
  div.onclick = () => playVideo(v.src);
  list.appendChild(div);
});

function playVideo(src) {
  const modal = document.getElementById("modal");
  const player = document.getElementById("player");
  player.src = src;
  modal.style.display = "flex";
}

function closeVideo() {
  document.getElementById("modal").style.display = "none";
}
