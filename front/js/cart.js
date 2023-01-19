// récupération du panier et parcourir l'array

const basket = JSON.parse(localStorage.getItem("basket"));

basket.forEach((product) => {
  fetch("http://127.0.0.1:3000/api/products/" + product.id)
    .then((rep) => rep.json())
    .then((data) => {
      // si le panier est vide
      if (basket === null) {
        alert("votre panier est vide");
      } else {
        // afficher les produits dans le HTML
        let structurebasket = ``;

        structurebasket += `
        <article class="cart__item" data-id="${data._id}" data-color="${product.color}">
    <div class="cart__item__img">
      <img src="${data.imageUrl}" alt="${data.altTxt}">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${data.name}</h2>
        <p>${product.color}</p>
        <p>${data.price} €</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${product.quantity}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>
    `;

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
          let productPrice = await fetch(
            "http://127.0.0.1:3000/api/products/" + product.id
          )
            .then((rep) => rep.json())
            .then((productData) => {
              return productData.price;
            });
          totalPrice += productPrice * parseInt(product.quantity);
          totalQuantity += parseInt(product.quantity);
        }
        document.querySelector("#totalPrice").textContent = totalPrice;
        document.querySelector("#totalQuantity").textContent = totalQuantity;
      }

      setTotalPriceQuantity();
      console.log(typeof totalQuantity);
      ///////////////////////// supprimer un article////////////////////////////

      let deleteItems = document.querySelectorAll(".deleteItem");

      for (let move of deleteItems) {
        // j'écoute au click l'evenement supprimer
        move.addEventListener("click", (event) => {
          // je recherche le parent le plus proche
          let closest = move.closest(".cart__item");

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
        console.log(typeof product.quantity);
      }
    });
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

//  création d'un tableau product vide
let products = [];

// appel du btn commander
const order = document.querySelector("#order");

// ecouter l'évenement  du btn commander
order.addEventListener("submit", (event) => {
  event.preventDefault();

  /*contact: {
   *   firstName: string,
   *   lastName: string,
   *   address: string,
   *   city: string,
   *   email: string
   * },
   * products: ['hjkhjkhjkhjkhjk', 'jkljkljkljkljkl'] <-- array of product _id */
  // créer une commande  (objet)
  // dans l'objet : contact, products

  //ajout de l'objet contact et des identifiant des produits  au tableau
  for (let product of products) {
    product = push(products._id);

    // transformation de l'objet en format json
    let command = JSON.stringify({ products, contact });

    async function send() {
      //  appel de l'API avec fetch et envoie avec la methode post
      let response = fetch("http://127.0.0.1:3000/api/products/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: command,
      });
      // réponse du serveur
      let result = await response.json;
      alert(result.message);
    }
    send();
  }

  function validationEmail() {
    let regex =
      /^(([^<()[\]\\.,;:\s@\]+(\.[^<()[\]\\.,;:\s@\]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    document.querySelector("#email").innerHTML = regex;
    if (regex.test(document.querySelector("#email").value)) {
      document.querySelector("#email").innerHTML = "L'addresse mail est valide";
    } else {
      document.querySelector("#email").innerHTML =
        "L'addresse mail n'est pas valide";
    }
  }
  validationEmail();
});
