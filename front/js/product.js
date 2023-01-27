// récupération de l'url de la page courante avec window.location.href
//faire le lien avec la page d'accueil et récupérer l'id du produit
const newLocal = new URL(window.location.href);
const addr = newLocal.searchParams.get(`id`);

// Cette fonction va me permettre de récupérer le produit sélectionner dans la page d'accueil (fetch),
//  d'y insérer l'image, le nom, la description, le prix, les couleurs et quantités du produit en question
//  après avoir créer la partie HTML du DOM
try {
    fetch("http://127.0.0.1:3000/api/products/" + addr)
        .then((rep) => rep.json())
        .then((article) => {
            document.querySelector(
                ".item__img"
            ).innerHTML = `<img src="${article.imageUrl}" alt="${article.altTxt}">`;
            document.querySelector("#title").innerHTML = article.name;
            document.querySelector("#price").innerHTML = article.price;
            document.querySelector("#description").innerHTML =
                article.description;

            document.querySelector("option").value = "default";
            document.title = article.name;
            // Boucle pour récupérer et d'afficher toute les couleurs du produit
            for (let couleur of article.colors) {
                const color = `<option value="${couleur}">${couleur}</option>`;

                // insertion des différentes couleurs
                document
                    .querySelector("#colors")
                    .insertAdjacentHTML("beforeend", color);
            }
        });
} catch (err) {
    console.log(err);
}

//  Selection bouton
const addToCart = document.querySelector("#addToCart");

// Au click du bouton "ajouter au panier", je dois envoyer dans le local storage les informations de l'article sélectionner
// id, couleur, quantité. Le nombre d'un même article ne peut pas excéder 100

addToCart.addEventListener("click", () => {
    const quantity = document.querySelector("#quantity").value;
    const color = colors.value;
    const id = addr._id;

    // Condition au click, les valeurs couleur et quantité doivent être renseignées pour être intégrées dans le local storage

    if (color !== "default" && quantity >= 1 && quantity <= 100) {
        let basket = JSON.parse(localStorage.getItem("basket")) || [];

        let product = {
            id: addr,
            color: color,
            quantity: parseInt(quantity),
        };
        // je cherche si  un article mm id mm couleur se trouve dans le localstorage pour le mettre sur une meme ligne
        let cartFound = basket.find(
            (p) => p.id == product.id && p.color == product.color
        );
        if (cartFound != undefined) {
            cartFound.quantity += parseInt(quantity);
        } else basket.push(product);
        // permet de rajouter les valeurs sélectionnées dans le localst
        localStorage.setItem("basket", JSON.stringify(basket));
    } else {
        alert("Veuillez sélectionnez une couleur et une quantité valide");
    }
});
