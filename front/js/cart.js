const newUrl = new URL(window.location.href);
console.log(newUrl);
const com = newUrl.searchParams.get(`id`);

fetch(`http://127.0.0.1:3000/api/products/${com}`)
  .then((rep) => rep.json())
  .then((choix) => {
    let { name, colors, price, imageUrl, altTxt } = choix;

    `<article class="cart__item" data-id="{product-ID}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src=${imageUrl} alt=${altTxt}>
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>${name}</h2>
        <p>${colors}</p>
        <p>${price}€</p>
      </div>
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
    </article>`;
  });
