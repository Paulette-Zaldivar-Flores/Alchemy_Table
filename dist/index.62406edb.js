// import 'core/js-stable';
// import 'regenerator-runtime/runtime';
document.addEventListener("DOMContentLoaded", ()=>{
    const recipeContainer = document.querySelector(".recipe");
    const timeout = function(s) {
        return new Promise(function(_, reject) {
            setTimeout(function() {
                reject(new Error(`Request took too long! Timeout after ${s} second`));
            }, s * 1000);
        });
    };
    // https://forkify-api.herokuapp.com/v2
    ///////////////////////////////////////
    const renderSpinner = function(parentEl) {
        const markUp = `
    <!-- <div class="spinner">
    <span class="material-symbols-outlined">
      rotate_right
    </span>
  </div> -->
    `;
        parentEl.innerHTML = "";
        parentEl.insertAdjacentHTML("afterbegin", markUp);
    };
    const showRecipe1 = async function() {
        try {
            const id = window.location.hash.slice(1);
            console.log(id);
            if (!id) return;
            renderSpinner(recipeContainer);
            const res = await fetch("https://forkify-api.herokuapp.com/api/v2/recipes/${id}");
            const data = await res.json();
            if (!res.ok) throw new Error(`${data.message} (${res.status})`);
            let { recipe } = data.data;
            recipe = {
                id: recipe.id,
                title: recipe.title,
                publisher: recipe.publisher,
                sourceUrl: recipe.source_url,
                image: recipe.image_url,
                servings: recipe.servings,
                cookingTime: recipe.cooking_time,
                ingredients: recipe.ingredients
            };
            console.log(recipe);
            const markUp = `
      <figure class="recipe__fig">
      <img src="${recipe.image}" alt="${recipe.title}" class="recipe__img" />
      <h1 class="recipe__title">
        <span>${recipe.title}</span>
      </h1>
    </figure>

    <div class="recipe__details">
      <div class="recipe__info">
        <span class="material-symbols-outlined" class="recipe__info-icon" >
        timer</span>
        <span class="recipe__info-data recipe__info-data--minutes">${recipe.cookingTime}</span>
        <span class="recipe__info-text">minutes</span>
      </div>
      <div class="recipe__info">
      <span class="material-symbols-outlined" class="recipe__info-icon" >
      groups
      </span>
        <span class="recipe__info-data recipe__info-data--people">${recipe.servings}</span>
        <span class="recipe__info-text">servings</span>

        <div class="recipe__info-buttons">
          <button class="btn--tiny btn--increase-servings">
          <span class="material-symbols-outlined">
          shadow_minus
          </span>
          </button>
          <button class="btn--tiny btn--increase-servings">
          <span class="material-symbols-outlined">
          library_add
          </span>
          </button>
        </div>
      </div>

      <div class="recipe__user-generated">
      <span class="material-symbols-outlined" id = "person">
      person
      </span>
      </div>
      <button class="btn--round">
      <span class="material-symbols-outlined" id = "bookmark">
      bookmark_add
      </span>
      </button>
    </div>

    <div class="recipe__ingredients">
      <h2 class="heading--2">Recipe ingredients</h2>
      <ul class="recipe__ingredient-list">
      ${recipe.ingredients.map((ing)=>{
                return `
          <li class="recipe__ingredient">
            <span class="material-symbols-outlined" class = "recipe__icon">
            done
            </span>
            <div class="recipe__quantity">${ing.quantity}</div>
            <div class="recipe__description">
              <span class="recipe__unit">${ing.unit}</span>
              ${ing.description}
            </div>
          </li>
          `;
            }).join("")}
    </div>

    <div class="recipe__directions">
      <h2 class="heading--2">How to cook it</h2>
      <p class="recipe__directions-text">
        This recipe was developed and tested by the wonderful
        <span class="recipe__publisher">${recipe.publisher}</span>. Feel free to visit their site.
      </p>
      <a
        class="btn--small recipe__btn"
        href="${recipe.sourceUrl}"
        target="_blank"
      >
        <span>Directions</span>
      </a>
    </div>`;
            recipeContainer.innerHTML = "";
            recipeContainer.insertAdjacentHTML("afterbegin", markUp);
        } catch (err) {
            alert(err);
        }
    };
});
[
    "hashchange",
    "load"
].forEach((ev)=>window.addEventListener(ev, showRecipe));

//# sourceMappingURL=index.62406edb.js.map
