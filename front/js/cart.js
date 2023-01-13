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
      let structurePanier = ``;

      for (i = 0; i < basketCustomer.length; i++) {
        const productFound = data.find(
          (product) => product._id === basketCustomer[i].id
        );

        structurePanier += `
        <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${productFound.imageUrl}" alt="${productFound.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productFound.name}</h2>
        <p>${basketCustomer[i].color}</p>
        <p>${productFound.price} €</p>
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
    }
  });

//  modifier la quantité et l'enregistrer dans le localstorage

const itemQuantity = document.querySelector(".itemQuantity");
localStorage.getItem(quantity);
addEventListener("change", (event) => {
  let quantityFound = basketCustomer.find((quantity) => quantity <= 1);
  if (quantityFound<= 1) {
    quantityFound.quantity ++ || --
  }
});

// supprimer un article
// const deletItem = document.querySelectorAll(".deletItem");
// console.log(deletItem);
