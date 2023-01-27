// j'essaie(try) de récupérer tous les produit de l'API avec la méthode fetch pour les insérer dans le DOM

try {
    const addr = fetch("http://127.0.0.1:3000/api/products")
        .then((rep) => rep.json())
        .then((data) => {
            let afficher = ``;
            for (let article of data) {
                afficher += `  <a href="./product.html?id=${article._id}">
                <article>
                    <img src= "${article.imageUrl}" alt="${article.altTxt}"/>
                    <h3 class="productName">${article.name} </h3>
                    <p class="productDescription">${article.description} </p>
                </article>
            </a>  
          `;
            }
            document
                .querySelector("#items")
                .insertAdjacentHTML("beforeend", afficher);
        });

    // Si je n'arrive à  faire ce qu'il y a en amont cela me renvoie une erreur
} catch (err) {
    post = "inconnu";
    console.log(err);
}
