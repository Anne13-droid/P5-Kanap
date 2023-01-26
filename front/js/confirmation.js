// Récupération de l'id de la commande grace au serveur pour l'afficher dans le HTML

const newLocal = new URL(window.location.href);
const orderId = newLocal.searchParams.get(`orderId`);

// Structure HTML de la page confirmation
const confirm = (document.querySelector("#orderId").textContent = orderId);

// Je supprime le panier du localstorage
function moveLocalStorage(key) {
    localStorage.removeItem(key);
}

moveLocalStorage("basket");
