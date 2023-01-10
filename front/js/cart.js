// récupération du panier et parcourir l'array
const basketCustomer = JSON.parse(window.localStorage.getItem("panier"));
console.log(basketCustomer);

// récupérer l'API pour avoir les renseignements sup
const addr2 = fetch("http://127.0.0.1:3000/api/products/")
  .then((rep) => rep.json())
  .then((data) => {
    // créer et insérer les éléments dans la page
    let post = ``;
    basketCustomer.forEach((data) => {
      post = `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
                <div class="cart__item__img">
                  <img src="${data.imageUrl} " alt="${data.altTxt}">
                </div>
                <div class="cart__item__content">
                  <div class="cart__item__content__description">
                    <h2>${data.name}</h2>
                    <p>idColor</p>
                    <p>${"data.price"} €</p>
                  </div>
                  <div class="cart__item__content__settings">
                    <div class="cart__item__content__settings__quantity">
                      <p>${basketCustomer.quantity} </p>
                      <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
                    </div>
                    <div class="cart__item__content__settings__delete">
                      <p class="deleteItem">Supprimer</p>
                    </div>
                  </div>
                </div>
              </article>`;

      document
        .querySelector("#cart__items")
        .insertAdjacentHTML("beforeend", post);
      console.log(basketCustomer);
    });
  });
