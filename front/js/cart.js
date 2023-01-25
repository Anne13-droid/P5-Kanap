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

if (!form || form === null) {
  alert = "veuillez remplir tous les champs du formulaire";
} else {
  // ecouter l'évenement  du btn commander
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    // variables pour le reg exp
    let prenom = document.querySelector("#firstName").value;
    let nom = document.querySelector("#lastName").value;
    let adresse = document.querySelector("#address").value;
    let ville = document.querySelector("#city").value;
    let mail = document.querySelector("#email").value;

    // creation de la reg exp pour valider les champs
    let firstName =
      /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    let lastName =
      /^[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    let address =
      /^[a-zA-Z0-9àèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇßØøÅåÆæœ\s,'-]*$/;
    let city =
      /^([0-9]{5}).[a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+([-'\s][a-zA-ZéèîïÉÈÎÏ][a-zéèêàçîï]+)?$/;
    let email = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;

    // création de l'objet contact
    let contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };
    // test de l'expression régulière
    let testFirstName = firstName.test(prenom);
    let messError1 = document.querySelector("#firstNameErrorMsg");
    if (testFirstName) {
      messError1.innerHTML = "Prénom valide";
    } else {
      messError1.innerHTML = "Veuillez renseigner un prénom valide";
    }
    let testLastName = lastName.test(nom);
    let messError2 = document.querySelector("#lastNameErrorMsg");
    if (testLastName) {
      messError2.innerHTML = "Nom valide";
    } else {
      messError2.innerHTML = "Veuillez renseigner un nom valide";
    }
    let testAddress = address.test(adresse);
    let messError3 = document.querySelector("#addressErrorMsg");
    if (testAddress) {
      messError3.innerHTML = "Adresse valide";
    } else {
      messError3.innerHTML = "Veuillez renseigner une adresse valide";
    }
    let testCity = city.test(ville);
    let messError4 = document.querySelector("#cityErrorMsg");
    if (testCity) {
      messError4.innerHTML = "Ville valide";
    } else {
      messError4.innerHTML = "Veuillez renseigner une ville valide";
    }
    let testEmail = email.test(mail);
    let messError = document.querySelector("#emailErrorMsg");
    if (testEmail) {
      messError.innerHTML = "Email valide";
    } else {
      messError.innerHTML = "Veuillez renseigner un email valide";
    }
    console.log(testEmail);

    //-----------------Je récupère mes produits id------------//

    //  création d'un tableau products qui contient les id des produits commandés
    let products = [];

    //je fais une boucle pour pousser mes id dans mon tableau products
    for (let product of basket) {
      products.push(product.id);
    }

    console.log(contact);

    // transformation de l'objet en format json

    let command = JSON.stringify({ contact, products });
    console.log(command);

    async function send() {
      //  appel de l'API avec fetch et envoie avec la methode post
      let response = await fetch("http://127.0.0.1:3000/api/products/order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: command,
      });
      if (response.ok) {
        // réponse du serveur
        const result = await response.json();

        window.location.href = `http://127.0.0.1:5500/front/html/confirmation.html?orderId=${result.orderId}`;
        // Récupératon de l'order id
        console.log(result);
        console.log(result.orderId);
        localStorage.setItem("responsId", result.orderId);
        localStorage.setItem("formulaire", command);
      }
      console.log(response);
    }

    send();
  });
}
