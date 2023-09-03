import {
  getAreaMeals,
  getCategoryMeals,
  getIngredientMeals,
  getMealsBySearchFirstLetter,
  getMealsBySearchName,
} from "./getData.js";
import {
  appendAllMeals,
  closeMenu,
  createEl,
  endLoading,
  handelSubmit,
  startLoading,
} from "./helper.js";
import { inputsValidation } from "./validation.js";

export function showAreasPage(areas) {
  closeMenu();
  let input = document.querySelector("#search-name");
  if (input) {
    document.querySelector("#search-name").remove();
    document.querySelector("#search-letter").remove();
  }

  let element = document.querySelector("#home .row");
  element.innerHTML = "";

  let areaEls = areas.map((area) => {
    return createEl(
      "div",
      { class: "col-12 col-md-3 text-center c-pointer" },
      {
        click: () => {
          getAreaMeals(area.strArea);
        },
      },
      `<div
          class="div-img rounded-3 position-relative overflow-hidden text-white"
          >
          <i class="fa-solid fa-house-laptop fa-5x"></i>
      </div>
      <p class="text-white fs-2">${area.strArea}</p>`
    );
  });
  element.append(...areaEls);
}

export function showMealPage(meal) {
  let homeContainer = document.querySelector("#home .container");
  let liRecipes = "";

  let tags = "";
  if (meal.strTags) {
    tags = meal.strTags.split(",").map((tag) => {
      if (!(tag === "")) {
        return `<li class="alert alert-danger m-2 p-1">${tag}<li/>`;
      }
    });
    tags = tags.join("");
  }

  for (let i = 1; i <= 20; i++) {
    if (!(meal["strIngredient" + i] === "")) {
      liRecipes += `<li class="alert alert-info border border-2 rounded-3 m-2 p-1">${
        meal["strIngredient" + i]
      }</li>`;
    }
  }

  homeContainer.innerHTML = `
        <div class="row text-white g-3">
        <div class="col-3">
          <img class="w-100" src="${
            meal.strMealThumb || "./imgs/logo.png"
          }" alt="meal" />
          <h3>${meal.strMeal}</h3>
        </div>
        <div class="col-9">
          <h2>instractions</h2>
          <p>
           ${meal.strInstructions}
          </p>
          <h4>Area : ${meal.strArea}</h4>
          <h4>Category : ${meal.strCategory}</h4>
          <h4>Recipes :</h4>
          <ul class="list-unstyled d-flex flex-wrap">
            ${liRecipes}
          </ul>
          <h4>Tags :</h4>
          <ul class="list-unstyled d-flex flex-wrap">
          ${tags}
          </ul>
          <a
            class="btn btn-success"
            href=${meal.strSource}
            target="_blank"
            >source</a
          >
          <a
            class="btn btn-danger"
            href=${meal.strYoutube}
            target="_blank"
            >youtube</a
          >
        </div>
      </div>`;
}

export function showSearchMealsPage(meals) {
  if (!meals) {
    return;
  }
  let searchMealsContainer = document.querySelector(
    "#search-meals .container .row"
  );
  if (!searchMealsContainer) {
    searchMealsContainer = document.querySelector("#home .container .row");
  }
  searchMealsContainer.innerHTML = "";

  appendAllMeals(meals, searchMealsContainer);
}

export function showCategoriesPage(categories) {
  closeMenu();
  let input = document.querySelector("#search-name");
  if (input) {
    document.querySelector("#search-name").remove();
    document.querySelector("#search-letter").remove();
  }
  if (document.querySelector("#submitBtn")) {
    document.querySelector("#submitBtn").remove();
  }
  document.querySelector("#home .row").innerHTML = "";

  let element = document.querySelector("#home .row");

  let categoryEls = categories.map((category) => {
    return createEl(
      "div",
      { class: "col-12 col-md-3 c-pointer" },
      {
        click: () => {
          getCategoryMeals(category.strCategory);
        },
      },
      `<div
            class="div-img rounded-3 position-relative overflow-hidden"
            >
            <img class="w-100" src="${
              category.strCategoryThumb || "./imgs/logo.png"
            }" alt="food" />
            <div
              class="layout transition-07 position-absolute w-100 h-100 bg-white opacity-75 rounded-3 ps-3 fw-medium fs-4 text-center"
            >
              <span class="text-black"
                >${category.strCategory}
              </span>
              <p class="fs-6">${category.strCategoryDescription.slice(
                0,
                120
              )}</p>
            </div>
          </div>`
    );
  });
  element.append(...categoryEls);
}

export function showMainIngredientsPage(ingredients) {
  let element = document.querySelector("#home .row");
  element.innerHTML = "";

  let description = "";

  let ingredientEls = ingredients.map((ingredient) => {
    if (!ingredient?.strDescription) {
      description = "no description";
    } else {
      description =
        ingredient?.strDescription?.length > 110
          ? ingredient?.strDescription.slice(0, 109) + "..."
          : ingredient?.strDescription;
    }

    return createEl(
      "div",
      { class: "" },
      {
        click: () => {
          getIngredientMeals(ingredient.strIngredient);
        },
      },
      `<div
          class="div-img rounded-3 position-relative overflow-hidden text-center text-white"
          >
          <i class="fa-solid fa-drumstick-bite fa-5x mb-2"></i>
          <p class="fs-4">${ingredient.strIngredient}</p>
          <p>${description}</p>
        </div>`
    );
  });

  element.append(...ingredientEls);
}

export function showContactUsPage() {
  startLoading();
  closeMenu();
  let input = document.querySelector("#search-name");
  if (input) {
    document.querySelector("#search-name").remove();
    document.querySelector("#search-letter").remove();
  }

  let element = document.querySelector("#home .row");
  // create and append ui
  let htmlElments = `
          <div class="w-75 position-absolute top-50 start-50 translate-middle" id="cc">
            <div class="row justify-content-center">
              <div class="col-md-5 mb-3" id="nameInput-container">
                        
                  <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Special characters and numbers not allowed
                  </div>
              </div>
              <div class="col-md-5 mb-3" id="emailInput-container">
                
                  <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Email not valid *exemple@yyy.zzz
                  </div>
              </div>
              <div class="col-md-5 mb-3" id="phoneInput-container">
                  
                  <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid Phone Number
                  </div>
              </div>
              <div class="col-md-5 mb-3" id="ageInput-container">
                  
                  <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid age
                  </div>
              </div>
              <div class="col-md-5 mb-3" id="passwordInput-container">
                  
                  <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid password *Minimum eight characters, at least one letter and one number:*
                  </div>
              </div>
              <div class="col-md-5 mb-3" id="repasswordInput-container">
                  
                  <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                      Enter valid repassword 
                  </div>
              </div>
            </div>
          </div>
        
  `;
  element.innerHTML = htmlElments;

  // create and append btn element
  if (!document.querySelector("#submitBtn")) {
    let container = document.querySelector("#cc");

    let btn = createEl(
      "button",
      {
        id: "submitBtn",
        class:
          "btn btn-outline-danger px-2 mt-3 ms-50 translate-middle-x c-pointer",
        disabled: "true",
      },
      {
        click: () => {
          handelSubmit();
        },
      },
      "Submit"
    );

    container.append(btn);
  }

  let formInputsInfo = [
    {
      id: "nameInput",
      keyup: inputsValidation,
      type: "text",
      class: "form-control",
      placeholder: "Enter Your Name",
    },
    {
      id: "emailInput",
      keyup: inputsValidation,
      type: "email",
      class: "form-control",
      placeholder: "Enter Your Email",
    },
    {
      id: "phoneInput",
      keyup: inputsValidation,
      type: "text",
      class: "form-control",
      placeholder: "Enter Your Phone",
    },
    {
      id: "ageInput",
      keyup: inputsValidation,
      type: "number",
      class: "form-control",
      placeholder: "Enter Your Age",
    },
    {
      id: "passwordInput",
      keyup: inputsValidation,
      type: "password",
      class: "form-control",
      placeholder: "Enter Your Password",
    },
    {
      id: "repasswordInput",
      keyup: inputsValidation,
      type: "password",
      class: "form-control",
      placeholder: "Repassword",
    },
  ];

  let inputEl = "";
  formInputsInfo.forEach((elInfo) => {
    inputEl = createEl(
      "input",
      {
        id: elInfo.id,
        class: elInfo.class,
        type: elInfo.type,
        placeholder: elInfo.placeholder,
      },
      {
        keyup: (e) => {
          elInfo.keyup(e.target);
        },
      }
    );

    document.getElementById(`${elInfo.id}-container`).prepend(inputEl);
  });

  endLoading();
}

export function showSearchPage() {
  startLoading();
  closeMenu();
  let homeContainer = document.querySelector("#home .container");

  const inputSearchByName = createEl(
    "input",
    {
      id: "search-name",
      class: "form-control bg-transparent text-white z-90 mb-3",
      type: "text",
      placeholder: "Search By Name",
    },
    {
      keyup: (e) => {
        getMealsBySearchName(e.target.value);
      },
    }
  );

  const inputSearchByFisrtLetter = createEl(
    "input",
    {
      id: "search-letter",
      class: "form-control bg-transparent text-white z-90",
      type: "text",
      placeholder: "Search By first letter",
      maxlength: "1",
    },
    {
      keyup: (e) => {
        getMealsBySearchFirstLetter(e.target.value);
      },
    }
  );

  homeContainer.innerHTML = `
      <div class="row mb-5">
        <div class="col-12 col-md-6" id="search-input-name">
        
        </div>
        <div class="col-12 col-md-6" id="search-input-f-letter">
        
        </div>
      </div>    
      <div id="search-meals">
        <div class="container">
          <div class="row g-4">
          </div>
        </div>
      </div>
`;

  document.querySelector("#search-input-name").append(inputSearchByName);
  document
    .querySelector("#search-input-f-letter")
    .append(inputSearchByFisrtLetter);

  endLoading();
}
