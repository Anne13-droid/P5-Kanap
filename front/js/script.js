/*  1- récupérer les articles avec fetch
    2- créer la partie html
    3- insérer les éléments dans la page d'accueil
*/
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
} catch (err) {
  post = "inconnu";
  console.log(err);
}
