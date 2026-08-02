const videos = [
  {
    id:1,
    title:"pasrah aja di ewe gurunya",
    src:"https://mixdrop.top/e/z1pj89erinzlqq",
    thumb:"https://ik.imagekit.io/7cynulshf/20260801_142030.jpg"
  },
  {
    id:2,
    title:"main bertiga emang paling enak",
    src:"https://tv1.indoav.app/e/bqDoEXoFUgSx",
    thumb:"https://ik.imagekit.io/7cynulshf/20260802_110017.jpg"
  },
  {
    id:3,
    title:"bocil chindo polos tpi hyper",
    src:"https://www.youtube.com/embed/tgbNymZ7vqY",
    thumb:"https://ik.imagekit.io/7cynulshf/20260802_122530.jpg"
  },
  {
    id:4,
    title:"bocil memek pink",
    src:"https://www.youtube.com/embed/tgbNymZ7vqY",
    thumb:"https://ik.imagekit.io/7cynulshf/IMG_20260413_205831.jpg?updatedAt=1776085358245"
  },
  {
    id:5,
    title:"bocil memek pink",
    src:"https://www.youtube.com/embed/tgbNymZ7vq",
    thumb:"https://ik.imagekit.io/7cynulshf/IMG_20260413_205831.jpg?updatedAt=1776085358245"
  },
  {
    id:6,
    title:"bocil memek pink",
    src:"https://www.youtube.com/embed/tgbNymZ7vqY",
    thumb:"https://ik.imagekit.io/7cynulshf/IMG_20260413_205831.jpg?updatedAt=1776085358245"
  },
  {
    id:7,
    title:"bocil memek pink",
    src:"https://www.youtube.com/embed/tgbNymZ7vqY",
    thumb:"https://ik.imagekit.io/7cynulshf/IMG_20260413_205831.jpg?updatedAt=1776085358245"
  },
];

let page = 1;
let perPage = 6;

/* VIEW SYSTEM */
function getViews(id){
  let key="views_"+id;
  if(!localStorage.getItem(key)){
    localStorage.setItem(key, Math.floor(Math.random()*5000)+500);
  }
  return parseInt(localStorage.getItem(key));
}

function increaseViews(id){
  setInterval(()=>{
    let val = getViews(id)+Math.floor(Math.random()*3)+1;
    localStorage.setItem("views_"+id,val);

    let el=document.getElementById("views"+id);
    if(el) el.innerText=formatViews(val);
  },3000);
}

function formatViews(v){
  if(v>=1000000) return (v/1000000).toFixed(1)+"M views";
  if(v>=1000) return (v/1000).toFixed(1)+"K views";
  return v+" views";
}

/* INDEX */
function render(){
  let list=document.getElementById("videoList");
  if(!list) return;

  list.innerHTML="";
  let start=(page-1)*perPage;
  let end=start+perPage;

  videos.slice(start,end).forEach(v=>{
    list.innerHTML+=`
      <div class="card" onclick="location.href='watch.html?id=${v.id}'">
        <img src="${v.thumb}" loading="lazy">
        <div class="title">${v.title}</div>
        <div class="views" id="views${v.id}">
          ${formatViews(getViews(v.id))}
        </div>
      </div>
    `;
    increaseViews(v.id);
  });
}

function nextPage(){
  page++;
  render();
}

function prevPage(){
  if(page>1){
    page--;
    render();
  }
}

/* SEARCH */
let search=document.getElementById("search");
if(search){
  search.addEventListener("input", ()=>{
    let val=search.value.toLowerCase();
    document.querySelectorAll(".card").forEach(c=>{
      c.style.display = c.innerText.toLowerCase().includes(val) ? "block":"none";
    });
  });
}

/* WATCH */
let params=new URLSearchParams(location.search);
let id=params.get("id");

if(id){
  let vid=videos.find(v=>v.id==id);

  document.getElementById("player").src=vid.src;
  document.getElementById("title").innerText=vid.title;
  document.getElementById("views").innerText=formatViews(getViews(vid.id));

  increaseViews(vid.id);

  let sidebar=document.getElementById("relatedVideos");
  videos.forEach(v=>{
    if(v.id!=id){
      sidebar.innerHTML+=`
        <div class="video-card" onclick="location.href='watch.html?id=${v.id}'">
          <img src="${v.thumb}" loading="lazy">
          <div>
            <div>${v.title}</div>
            <div class="views">${formatViews(getViews(v.id))}</div>
          </div>
        </div>
      `;
    }
  });
}

// smooth load effect
window.addEventListener("load", ()=>{
  document.body.style.opacity = 1;
});

document.body.style.opacity = 0;
document.body.style.transition = "0.5s";

render();
