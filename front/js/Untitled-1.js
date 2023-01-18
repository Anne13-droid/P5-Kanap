const basket = JSON.parse(window.localStorage.getItem("basket"));
async function viewBasket() {
  for (let productBasket of basket) {
    let productBasket = await fetch("http://127.0.0.1:3000/api/products/".id)
      .then((rep) => rep.json())
      .then((data) => {
        return data.basket;
      });
    // si le panier est vide
    if (basket === null) {
      alert("votre panier est vide");
    } else {
      // afficher les produits dans le HTML
      let structurebasket = ` `;
      structurebasket += `
  <article class="cart__item" data-id="${productBasket._id}" data-color="${basket.color}">
<div class="cart__item__img">
<img src="${productBasket.imageUrl}" alt="${productBasket.altTxt}">
</div>
<div class="cart__item__content">
<div class="cart__item__content__description">
  <h2>${productBasket.name}</h2>
  <p>${basket.color}</p>
  <p>${productBasket.price} €</p>
</div>
<div class="cart__item__content__settings">
  <div class="cart__item__content__settings__quantity">
    <p>Qté : </p>
    <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${basket.quantity}">
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
}
