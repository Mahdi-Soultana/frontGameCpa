let timeShowingPopUp = 1;
let seconds = 1;
let timeOut;
const ads = document.querySelector(".our-ads");
const imgHolder = document.querySelector(".ads-imgHolder");
const img = document.querySelector(".ads-imgHolder img");
let count = 0;
let countAds = 0;
let Globlelink = "";
let isPublick = false;
let byClicking = false;
const crossHeader = "https://crossanywhereheaders.herokuapp.com/";
let showPopUp = false;

/*Style********/
// function css(obj) {
//   return obj.style;
// }
// imgHolder.style.backgroudColor = "#fefefe";

/*Style********/
console.log("data");
function getData() {
  const Url = "https://monitizegame.herokuapp.com/cpa_monitize/";
  const data = fetch(crossHeader + Url)
    .then(data => {
      const res = data.json();
      return res;
    })
    .then(data => {
      LogicAds(data);
    });
}
setInterval(() => {
  checkDataAds();
}, 1000);

checkDataAds();

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
  countAds = data.countAds;
  console.log(data);
  img.src = "https://monitizegame.herokuapp.com/cpa_monitize/img_ads/1";
  if (count < data.imgAds.length) {
    showPopUpFn();
  }

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

imgHolder.addEventListener("click", popUpFn);

function popUpFn(e) {
  console.log(e.target);
  if (e.target.classList.contains("img-ads")) {
    navigate(Globlelink);
    return;
  }

  ads.children[0].classList.add("hidden");
  ads.removeEventListener("click", popUpFn);
  count++;
  clearTimeout(timeOut);
}
function showPopUpFn() {
  console.log(count);
  if (showPopUp) {
    timeOut = setTimeout(() => {
      imgHolder.classList.remove("hidden");
    }, timeShowingPopUp * 1000);
  }
}
