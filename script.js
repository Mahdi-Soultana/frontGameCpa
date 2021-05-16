let seconds = 3;
async function getData(url) {
  const Url = "https://monitizegame.herokuapp.com/cpa_monitize/";
  const data = await fetch(
    "https://crossanywhereheaders.herokuapp.com/" + Url
  ).then(data => {
    const res = data.json();
    return res;
  });
  // <<<<<<< HEAD
  console.log(data);

  // =======
  console.log(data);
  if (data.isPublic) {
    // >>>>>>> 56a677f4cea881e2970c2606372b79870e4d7a73
    window.location.href = data.link;
  }
}
setInterval(() => {
  getData();
}, 10000);
