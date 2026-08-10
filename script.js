const videos = [
  {
    id:7,
    title:"pasrah aja di ewe gurunya",
    src:"https://mixdrop.top/e/z1pj89erinzlqq",
    thumb:"https://ik.imagekit.io/7cynulshf/20260801_142030.jpg"
  },
  {
    id:6,
    title:"main bertiga emang paling enak",
    src:"https://tv1.indoav.app/e/bqDoEXoFUgSx",
    thumb:"https://ik.imagekit.io/7cynulshf/20260802_110017.jpg"
  },
  {
    id:5,
    title:"bocil chindo polos tpi hyper",
    src:"https://mxdrop.sx/e/1nvow49vs1le91",
    thumb:"https://ik.imagekit.io/7cynulshf/20260802_122530.jpg"
  },
  {
    id:4,
    title:"dua bocil imut nyoba ngewe",
    src:"https://mxdrop.sx/e/03vzkjvgtko1l9e",
    thumb:"https://ik.imagekit.io/7cynulshf/20260802_125408.jpg"
  },
  {
    id:3,
    title:"abg perawan di unboxing",
    src:"https://mxdrop.sx/e/dkqrndpwa83r09",
    thumb:"https://ik.imagekit.io/7cynulshf/20260802_130421.jpg?updatedAt=1785647164962"
  },
  {
    id:2,
    title:"part 2 bocil imut dua lawan satu ",
    src:"https://mxdrop.sx/e/dkqrnd43hvz0v0",
    thumb:"https://ik.imagekit.io/7cynulshf/20260802_225050.jpg"
  },
  {
    id:1,
    title:"bocil memek pink",
    src:"https://www.youtube.com/embed/tgbNymZ7vqY",
    thumb:"https://ik.imagekit.io/7cynulshf/IMG_20260413_205831.jpg?updatedAt=1776085358245"
  },
];

let page = 1;
let perPage = 6;
let filteredVideos = [...videos];

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
  if(filteredVideos.length === 0){
    list.innerHTML = `
      <p style="
        text-align:center;
        color:white;
        font-size:18px;
        margin-top:40px;
      ">
        Video tidak ditemukan
      </p>
    `;
    return; // 🔥 hentikan render
  }

  let start=(page-1)*perPage;
  let end=start+perPage;
  let start=(page-1)*perPage;
  let end=start+perPage;

  filteredVideos.slice(start,end).forEach(v=>{
    list.innerHTML+=`
      <div class="card" onclick="location.href='watch.html?id=${v.id}'">
        <img src="${v.thumb}">
        <div class="title">${v.title}</div>
        <div class="views" id="views${v.id}">
          ${formatViews(getViews(v.id))}
        </div>
      </div>
    `;
    increaseViews(v.id);
  });

  renderPagination(); // ✅ WAJIB
}

/* PAGINATION FIX */
function nextPage(){
  let totalPage = Math.ceil(filteredVideos.length / perPage);
  if(page < totalPage){
    page++;
    render();
  }
}

function prevPage(){
  if(page > 1){
    page--;
    render();
  }
}

function goPage(p){
  page = p;
  render();
}

function renderPagination(){
  let totalPage = Math.ceil(filteredVideos.length / perPage);
  let pag = document.getElementById("pagination");

  if(!pag) return;

  pag.innerHTML = "";

  // PREV
  pag.innerHTML += `
    <button onclick="prevPage()" ${page === 1 ? "disabled" : ""}>
      Prev
    </button>
  `;

  // NOMOR
  for(let i=1; i<=totalPage; i++){
    pag.innerHTML += `
      <button onclick="goPage(${i})"
        style="
          margin:5px;
          padding:8px 12px;
          background:${i===page ? 'red' : '#222'};
          color:white;
          border:none;
          border-radius:6px;
          cursor:pointer;
        ">
        ${i}
      </button>
    `;
  }

  // NEXT
  pag.innerHTML += `
    <button onclick="nextPage()" ${page === totalPage ? "disabled" : ""}>
      Next
    </button>
  `;
}

/* SEARCH */
let search=document.getElementById("search");
if(search){
  search.addEventListener("input", ()=>{
    let val=search.value.toLowerCase();
    search.addEventListener("input", ()=>{
  let val = search.value.toLowerCase();

  filteredVideos = videos.filter(v =>
    v.title.toLowerCase().includes(val)
  );

  page = 1; // 🔥 reset ke halaman 1
  render();
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

/* INIT */
render();
