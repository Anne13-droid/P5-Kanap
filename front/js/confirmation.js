if (product === null) {
  alert = "votre panier est vide";
} else {
  const command = getItem.JSON.stringify({ products, contact });

  let response = fetch("http://127.0.0.1:3000/api/products/order", {});
}
