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

// récupération du bouton
let ajout = document.querySelector("#addToCart");
// écouter au click "ajouter au panier"
ajout.addEventListener("click", () => {
  console.log(ajout);
});
// récupérer les propirétés de l'article en objet
let propriétés = {
  id: `${addr}`,
  quantités: 0,
  couleur: `${colors}`,
};
console.log(propriétés);
// mettre les objets dans un tableau
let tab = [propriétés, {}, {}];
// mettre le tableau dans le local storage

// au click, récuperer les tableau dans le local storage et le pusher
