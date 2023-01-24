// récupération du panier et parcourir l'array

const basket = JSON.parse(localStorage.getItem("basket"));
// si le panier est vide
if (basket === null) {
  alert("votre panier est vide");
} else {
  basket.forEach((product) => {
    fetch("http://127.0.0.1:3000/api/products/" + product.id)
      .then((rep) => rep.json())
      .then((data) => {
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
            // faire les totaux quantités et prix
            totalPrice += productPrice * parseInt(product.quantity);
            totalQuantity += parseInt(product.quantity);
          }
          document.querySelector("#totalPrice").textContent = totalPrice;
          document.querySelector("#totalQuantity").textContent = totalQuantity;
        }

        setTotalPriceQuantity();

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
                product.quantity = parseInt(input.value);
              }
            }

            localStorage.setItem("basket", JSON.stringify(basket));
            // je rappelle ma fonction pour que le chagement s'opère
            setTotalPriceQuantity();
          });
        }
      });
  });
}
//////////////////////////////////////////FORMULAIRE////////////////////////////////////////////////////////
// appel du btn commander et ajout des variables
const order = document.querySelector("#order");
const form = document.querySelector(".cart__order__form");
const champs = document.querySelector(".cart__order__form__question");

// variables pour le reg exp
let prenom = document.querySelector("#firstName").value;
let nom = document.querySelector("#lastName").value;
let adresse = document.querySelector("#address").value;
let ville = document.querySelector("#city").value;
let mail = document.querySelector("#email").value;

// création de l'objet contact
let contact = {
  firstName: document.querySelector("#firstName").value,
  lastName: document.querySelector("#lastName").value,
  address: document.querySelector("#address").value,
  city: document.querySelector("#city").value,
  email: document.querySelector("#email").value,
};

// creation de la reg exp pour valider les champs
let firstName = /^[a-zA-Z\-]+$/g;
let lastName = /^[a-zA-Z\-]+$/g;
let address = /^[a-zA-Z0-9\s,'-]*$/g;
let city = /^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/g;
let email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

//-----------------Je récupère mes produits id------------//

basket.forEach((product) => {
  //  création d'un tableau product
  let products = [];

  // transformation de l'objet en format json
  let command = JSON.stringify({ products, contact });

  //ajout de l'objet contact et des identifiant des produits  au tableau
  for (let product of products) {
    product = push(products._id);
  }
  console.log(command);
  console.log(product);

  async function send(order) {
    //  appel de l'API avec fetch et envoie avec la methode post
    let response = await fetch("http://127.0.0.1:3000/api/products/order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: command,
    });
    if (response.ok) {
      // réponse du serveur
      const result = await response.json(order);
      localStorage.removeItem(basket);
      window.location.href = `http://127.0.0.1:5500/front/html/confirmation.html?orderId=${result.orderId}`;

      console.log(result);
    }
    console.log(response);
  }

  send();
});

// ecouter l'évenement  du btn commander
form.addEventListener("submit", (event) => {
  event.preventDefault();
  // test de l'expression régulière
  if (!form || form === "") {
    alert = "Veuillez remplir tous les champs du formulaire";
  } else if (prenom && nom && adresse && ville && mail) {
    let testFirstName = firstName.test(prenom);
    let messError1 = document.querySelector("#firstNameErrorMsg");
    if (!firstName || (firstName === "" && !testFirstName)) {
      messError1.textContent = "Veuillez renseigner un prénom valide";
    } else {
      messError1.textContent = "Prénom valide";
    }
    let testLastName = lastName.test(nom);
    let messError2 = document.querySelector("#lastNameErrorMsg");
    if (!lastName || (lastName === "" && !testLastName)) {
      messError2.textContent = "Veuillez renseigner un nom valide";
    } else {
      messError2.textContent = "Nom valide";
    }
    let testAddress = address.test(adresse);
    let messError3 = document.querySelector("#addressErrorMsg");
    if (!address || (address === "" && !testAddress)) {
      messError3.textContent = "Veuillez renseigner une adresse valide";
    } else {
      messError3.textContent = "Adresse valide";
    }
    let testCity = city.test(ville);
    let messError4 = document.querySelector("#cityErrorMsg");
    if (!city || (city === "" && !testCity)) {
      messError4.textContent = "Veuillez renseigner une ville valide";
    } else {
      messError4.textContent = "Ville valide";
    }
    let testEmail = email.test(mail);
    let messError = document.querySelector("#emailErrorMsg");
    if (!email || (email === "" && !testEmail)) {
      messError.textContent = "Veuillez renseigner un email valide";
    } else {
      messError.textContent = "Email valide";
    }
    console.log(testEmail);
  }
});
