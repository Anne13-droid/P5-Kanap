// Récupération de l'id de la commande (provenant du serveur)
const responsId = localStorage.getItem("responsId");

console.log(`responsId:${responsId}`);

// Structure HTML de la page confirmation
const confirm = (document.querySelector("#orderId").textContent = responsId);

function moveLocalStorage(key) {
  localStorage.removeItem(key);
}

moveLocalStorage("responsId");
moveLocalStorage("basket");
