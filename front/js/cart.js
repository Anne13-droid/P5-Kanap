// récupération du panier et parcourir l'array
const basket = JSON.parse(window.localStorage.getItem("basket"));

// récupération de l'API pour les éléments manquants
const addr = fetch("http://127.0.0.1:3000/api/products")
  .then((rep) => rep.json())
  .then((data) => {
    // si le panier est vide
    if (basket === null) {
      alert("votre panier est vide");
    } else {
      // afficher les produits dans le HTML
      let structurebasket = ``;

      for (i = 0; i < basket.length; i++) {
        const productFound = data.find(
          (product) => product._id === basket[i].id
        );

        structurebasket += `
        <article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="${productFound.imageUrl}" alt="${productFound.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${productFound.name}</h2>
        <p>${basket[i].color}</p>
        <p>${productFound.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket[i].quantity}">
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
        .insertAdjacentHTML("beforeend", structurebasket);
    }

    ////////////////////////////////////// total du prix et du nombre d'article////////////////////////////////////////

    // déclaration de la variable qui va contenir les prix presents dans le panier
    // let totalPriceBasket = [];

    // // aller chercher les prix dans le panier

    // for (let n = 0; n > basket.length; n++) {
    //   console.log(basket[n].price);
    // }

    //  modifier la quantité et l'enregistrer dans le localstorage

    ///////////////////////// supprimer un article////////////////////////////
    let baskets = basket;
    let deleteItems = document.querySelectorAll(".deleteItem");

    console.log(deleteItems);

    for (let k = 0; k < deleteItems.length; k++) {
      deleteItems[k].addEventListener("click", (event) => {
        event.preventDefault();
        console.log(event);

        //  sélectionner l'id du produit
        let product = basket[k].id && basket[k].color;
        console.log("article supprimé");
        console.log(product);

        // suppression du produit sélectionner

        baskets = baskets.filter((el) => el.product !== product);
        console.log(baskets);

        //ajouter les valeurs sélectionnées dans le localst
        localStorage.setItem("basket", JSON.stringify(basket));
      });
    }
    // Faire le totale des articles
  });
