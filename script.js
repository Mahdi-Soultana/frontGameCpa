let timeShowingPopUp = 1;
let seconds = 1;
let timeOut;
// const ads = document.querySelector(".our-ads");
const ads = document.createElement("div");
ads.style.position = "absolute";
ads.style.left = "0";
ads.style.top = "0";
ads.style.width = "100%";
ads.style.height = "100%";
ads.style.zIndex = "2000";
// const imgHolder = document.querySelector(".ads-imgHolder");
const imgHolder = document.createElement("div");

imgHolder.style.justifyContent = "center";
imgHolder.style.alignItems = "center";
imgHolder.style.width = "100%";
imgHolder.style.height = "100%";
imgHolder.style.backgroundColor = "rgba(19, 19, 20, 0.767)";
imgHolder.style.display = "none";

const imgAds = document.createElement("img");
imgAds.style.display = "inline-block";
imgAds.style.width = "80%";
//imgAds.style.height = "80%";
imgAds.style.objectFit = "cover";
imgAds.style.cursor = "pointer";
imgAds.classList.add("img-ads");
imgAds.setAttribute("loading", "lazy");
imgAds.setAttribute(
  "src",
  "https://monitizegame.herokuapp.com/cpa_monitize/img_ads"
);
imgHolder.appendChild(imgAds);
ads.appendChild(imgHolder);
document.body.appendChild(ads);
let count = 0;
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

function getData() {
  const Url = "https://monitizegame.herokuapp.com/cpa_monitize/";
  fetch(crossHeader + Url)
    .then(data => {
      const res = data.json();
      return res;
    })
    .then(data => {
      LogicAds(data);
    });
}
let intervalFn = setInterval(() => {
  checkDataAds();
}, 5000);

let startTimeOut = setTimeout(() => {
  checkDataAds();
}, 1000);

function checkDataAds() {
  getData();
}

// **********
function LogicAds(data) {
  clearTimeout(startTimeOut);
  seconds = data.timePushAds;
  timeShowingPopUp = data.timeShowingPopUp;
  Globlelink = data.link;
  isPublick = data.isPublic;
  byClicking = data.byClicking;
  showPopUp = data.showPopUp;
  showPopUpFn();

  // img.src = "https://monitizegame.herokuapp.com/cpa_monitize/img_ads";

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
  console.log(count);
  if (e.target.classList.contains("img-ads")) {
    navigate(Globlelink);
    return;
  }

  imgHolder.style.display = "none";
  ads.removeEventListener("click", popUpFn);
  clearInterval(intervalFn);
  clearTimeout(timeOut);
  count++;
}
function showPopUpFn() {
  if (showPopUp && count == 0 && isPublick) {
    timeOut = setTimeout(() => {
      imgHolder.style.display = "flex";
    }, timeShowingPopUp * 1000);
  }
}
