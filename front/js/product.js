// récupération de l'url avec window.location.href qui permet de récupérer l'url de la page courante

const newLocal = new URL(window.location.href);

//création d'une variable id pour récupérer les articles

const addr = newLocal.searchParams.get(`id`);

// récupération des différents articles
try {
  fetch(`http://127.0.0.1:3000/api/products/${addr}`)
    .then((rep) => rep.json())
    .then((article) => {
      // récupération des informations des produits

      document.querySelector(
        ".item__img"
      ).innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;
      document.querySelector("#title").innerHTML = article.name;
      document.querySelector("#price").innerHTML = article.price;
      document.querySelector("#description").innerHTML = article.description;

      // récupération des couleurs des produits avec une boucle (car plusieurs couleurs) colors = id colors du html

      for (let couleur of article.colors) {
        // création d'une constante color et récupération de la balise html <option>

        const color = `<option value="${couleur}">${couleur}</option>`;

        // insertion des différentes couleurs

        document
          .querySelector("#colors")
          .insertAdjacentHTML("beforeend", color);
      }
    });
} catch (err) {
  console.log(err);
}

//  Selection du choix
const quantite = document.querySelector("#quantity");
const idcolor = document.querySelector("#color");
const choixClient = quantite + idcolor;

//  Selection bouton
const envoyerPanier = document.querySelector("#addToCart");

// écouter au click "ajouter au panier"
envoyerPanier.addEventListener("click", (event) => {
  event.preventDefault();
  // récupérer les propirétés de l'article en objet et mettre les objets dans un tableau
  let panier = {
    id: `${addr}`,
    quantités: 0,
    couleur: `${colors}`,
  };

  let tab = [panier];

  console.log(tab);

  let produitEnregistre = JSON.parse(localStorage.getItem("panierLinea"));

  if (produitEnregistre) {
  } else {
    produitEnregistre = [];
    produitEnregistre.push(panier);

    console.log(produitEnregistre);
  }
});
/*



let tab = [panier];
console.log(panier);
console.log(tab);
let panierLinea = JSON.stringify(tab);
console.log(panierLinea);

// mettre le tableau dans le local storage
localStorage.setItem("obj", panierLinea);
panierLinea = localStorage.getItem("obj");
tab = JSON.parse(panierLinea);


// au click, récuperer les tableau dans le local storage et le pusher
for (let i = 0; i < localStorage.length; i++) {
  localStorage.key(i);
}

// ------------------------------------------------------------------------------------------------

let produitEnregistre = JSON.parse(localStorage.getItem("panierLinea"));

console.log(produitEnregistre);

if (produitEnregistre) {
} else {
  produitEnregistre = [];
  produitEnregistre.push(panier);
  console.log(produitEnregistre);
}*/
