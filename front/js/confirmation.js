// récupération de l'url avec window.location.href qui permet de récupérer l'url de la page courante

const newLocal = new URL(window.location.href);

//création d'une variable id pour récupérer les articles

const addr = newLocal.searchParams.get(`orderid`);

// const command = JSON.stringify("command");
const command = JSON.parse(localStorage.getItem("command"));
try {
  let response = fetch("http://127.0.0.1:3000/api/products/order" + addr)
    .then((rep) => rep.json())
    .then((data) => {});
} catch {}
console.log(newLocal);
