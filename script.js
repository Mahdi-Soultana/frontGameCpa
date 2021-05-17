let seconds = 3;
const cards = document.querySelectorAll(".card");
let Globlelink = "";
let isPublick = false;
let byClicking = false;
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
}, 10000);
setTimeout(() => {
  checkDataAds();
}, 100);

function checkDataAds() {
  getData();
}

// **********
function LogicAds(data) {
  seconds = data.timePushAds;
  Globlelink = data.link;
  isPublick = data.isPublic;
  byClicking = data.byClicking;
  //user not clicked and by clicking is disabled
  if (!data.byClicking) {
    console.log("remaining time Automaticly " + seconds);
    setTimeout(() => {
      if (data.isPublic) {
        navigate(Globlelink);
      }
    }, seconds * 1000);
    // by clicking is active && user not clicked and
  } else {
    console.log("remaining time Automaticly and by clicking is True" + seconds);
    setTimeout(() => {
      if (data.isPublic) {
        navigate(Globlelink);
      }
    }, seconds * 1000);
    // by clicking is active && user  clicked
  }
}
function navigate(link) {
  if (isPublick && byClicking) {
    window.location.href = link;
  }
}
cards.forEach(card => {
  card.addEventListener("click", HandelClickCard);
});
function HandelClickCard() {
  navigate(Globlelink);
}
