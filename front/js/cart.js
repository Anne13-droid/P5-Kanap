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
      // boucle pour récupérer les éléments manquant dans l'API
      for (i = 0; i < basket.length; i++) {
        const productFound = data.find(
          (product) => product._id === basket[i].id
        );

        structurebasket += `
        <article class="cart__item" data-id="${productFound._id}" data-color="${basket[i].color}">
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

    async function setTotalPriceQuantity() {
      // déclaration de la variable qui va contenir les prix presents dans le panier
      let totalPrice = 0;
      let totalQuantity = 0;

      //  aller chercher les prix dans le panier
      for (let product of basket) {
        totalQuantity += parseInt(product.quantity);
      }
      document.querySelector("#totalQuantity").textContent = totalQuantity;

      for (let product of basket) {
        let productPrice = await fetch(
          "http://127.0.0.1:3000/api/products/" + product.id
        )
          .then((rep) => rep.json())
          .then((productData) => {
            return productData.price;
          });
        totalPrice += productPrice * product.quantity;
      }
      document.querySelector("#totalPrice").textContent = totalPrice;
    }

    setTotalPriceQuantity();

    ///////////////////////// supprimer un article////////////////////////////

    let deleteItems = document.querySelectorAll(".deleteItem");

    for (let k = 0; k < deleteItems.length; k++) {
      // j'écoute au click l'evenement supprimer
      deleteItems[k].addEventListener("click", (event) => {
        // je recherche le parent le plus proche
        let closest = deleteItems[k].closest(".cart__item");

        // récupérer la couleur dans mon panier
        let closestColor = closest.getAttribute("data-color");

        // suppression du produit sélectionner
        let closestId = closest.getAttribute("data-id");

        // boucle avec la méthode splice pour retirer les éléments ciblés du tableau
        for (let product of basket) {
          if (product.color === closestColor && product.id === closestId) {
            basket.splice(basket.indexOf(product), 1);
          }
        }
        closest.remove();

        //changer les nouvelles valeurs  dans le localst
        localStorage.setItem("basket", JSON.stringify(basket));

        setTotalPriceQuantity();
      });
    }

    ////////////////////////////////changement quantité dans panier/////////////////////////////////////////////////////

    //  sélection de la balise HTML
    let changeItems = document.querySelectorAll(".itemQuantity");
    //  boucle sur l'input avec un eventListener change
    for (let input of changeItems) {
      input.addEventListener("change", () => {
        let closest = input.closest(".cart__item");
        let closestColor = closest.getAttribute("data-color");
        let closestId = closest.getAttribute("data-id");
        for (let product of basket) {
          if (product.color === closestColor && product.id === closestId) {
            product.quantity = input.value;
          }
        }

        localStorage.setItem("basket", JSON.stringify(basket));
        // je rappelle ma fonction pour que le chagement s'opère
        setTotalPriceQuantity();
      });
    }
  });
//////////////////////////////////////////FORMULAIRE////////////////////////////////////////////////////////

// creation d'un objet contact
let contact = {
  prenom: firstName.value,
  nom: lastName.value,
  addresse: address.value,
  ville: city.value,
  email: email.value,
};
console.log(contact);

//  création d'un tableau product vide
let products = [];
console.log(products);

// appel du btn commander
const order = document.querySelector("#order");

// ecouter l'évenement  du btn commander
order.addEventListener("submit", (event) => {
  event.preventDefault();

  //ajout de l'objet contact et des identifiant des produits  au tableau
  for (let product of products) {
    product = push(products._id);

    // transformation de l'objet en format json
    let command = JSON.stringify({ product, contact });

    async function send() {
      //  appel de l'API avec fetch et envoie avec la methode post
      let response = fetch("http://127.0.0.1:3000/api/products/order"._id, {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: command,
      });
      // réponse du serveur
      let result = await response.json;
      alert(result.message);
    }
  }
  send();
});

console.log(order);
