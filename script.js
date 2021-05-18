let timeShowingPopUp = 1;
let seconds = 1;
const ads = document.querySelector(".our-ads");
const imgHolder = document.querySelector(".ads-imgHolder");
const img = document.querySelector(".ads-imgHolder img");

let Globlelink = "";
let isPublick = false;
let byClicking = false;

let showPopUp = false;
async function getData(url) {
  const Url = "https://monitizegame.herokuapp.com/cpa_monitize/";
  const data = await fetch(
    "https://crossanywhereheaders.herokuapp.com/" + Url
  ).then(data => {
    const res = data.json();
    return res;
  });
  LogicAds(data);
}
setInterval(() => {
  checkDataAds();
}, 4000);
setTimeout(() => {
  checkDataAds();
}, 100);

function checkDataAds() {
  getData();
}

// **********
function LogicAds(data) {
  seconds = data.timePushAds;
  timeShowingPopUp = data.timeShowingPopUp;
  Globlelink = data.link;
  isPublick = data.isPublic;
  byClicking = data.byClicking;
  showPopUp = data.showPopUp;
  img.src = "https://monitizegame.herokuapp.com/cpa_monitize/img_ads";
  showPopUpFn();
  console.log(data);
  //user not clicked and by clicking is disabled
  if (!data.byClicking) {
    setTimeout(() => {
      if (data.isPublic) {
        window.location.href = data.link;
      }
    }, seconds * 1000);
    // by clicking is active && user not clicked and
  }
}
function navigate(link) {
  if (isPublick && byClicking) {
    window.location.href = link;
  }
}

ads.addEventListener("click", popUpFn);

function popUpFn(e) {
  if (e.target.classList.contains("img-ads")) {
    navigate(Globlelink);
    return;
  }

  ads.children[0].classList.add("hidden");
  ads.removeEventListener("click", popUpFn);
}
function showPopUpFn() {
  if (showPopUp) {
    setTimeout(() => {
      imgHolder.classList.remove("hidden");
    }, timeShowingPopUp * 1000);
  }
}
