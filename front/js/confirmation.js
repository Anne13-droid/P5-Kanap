const command = JSON.stringify("command");

if (command === null) {
  alert = "votre panier est vide";
} else {
  let response = fetch("http://127.0.0.1:3000/api/products/order");
  // location.search = command;
}
