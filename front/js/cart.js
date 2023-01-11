// récupération du panier et parcourir l'array
const basketCustomer = JSON.parse(window.localStorage.getItem("panier"));

// récupération de l'API pour les éléments manquants
const addr2 = fetch("http://127.0.0.1:3000/api/products")
  .then((rep) => rep.json())
  .then((data) => {
    // si le panier est vide
    if (basketCustomer === null) {
      alert("votre panier est vide");
    } else {
      // afficher les produits dans le HTML
      let structurePanier = [];

      for (i = 0; i < basketCustomer.length; i++) {
        structurePanier += `
    <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${data[i].imageUrl}" alt="${data[i].altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data[i].name}</h2>
        <p>${basketCustomer[i].idColor}</p>
        <p>${data[i].price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basketCustomer[i].quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;
      }
      document
        .querySelector("#cart__items")
        .insertAdjacentHTML("beforeend", structurePanier);
      console.log(basketCustomer);
    }
  });

// modifier la quantité et l'enregistrer dans le localstorage

const itemQuantity = document.querySelector("itemQuantity");

addEventListener("change", (event) => {});
console.log(itemQuantity);
