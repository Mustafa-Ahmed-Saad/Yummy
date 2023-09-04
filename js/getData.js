import {
  closeMenu,
  startLoading,
  endLoading,
  appendAllMeals,
  searchMealsContainer,
  removeSearchInputs,
  getMaxNumberOfMeals,
} from "./helper.js";
import {
  showMealPage,
  showMainIngredientsPage,
  showCategoriesPage,
  showAreasPage,
  showErrorPage,
} from "./showPages.js";

// get meals by name when type in search input (name)
export async function getMealsBySearchName(value) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );

  let myData = [];
  if (data) {
    myData = getMaxNumberOfMeals(data);

    let container = searchMealsContainer();
    appendAllMeals(myData, container);
  }
}

// get meal id
export async function getMeal(id) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (data) {
    showMealPage(data.meals[0]);
  }
}

// get meals by category when click on category element
export async function getCategoryMeals(category) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );

  let myData = [];
  if (data) {
    myData = getMaxNumberOfMeals(data);

    let element = document.querySelector("#home .row");
    appendAllMeals(myData, element);
  }
}

// get all categories
export async function getCategories() {
  removeSearchInputs();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  if (data) {
    showCategoriesPage(data.categories);
  }
}

// get all categories Ingredients
export async function getMainIngredients() {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  if (data) {
    showMainIngredientsPage(data.meals);
  }
}

// get meals by Ingredient when click on Ingredient element
export async function getIngredientMeals(ingredient) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );

  let myData = [];
  if (data) {
    myData = getMaxNumberOfMeals(data);

    let element = document.querySelector("#home .row");
    appendAllMeals(myData, element);
  }
}

// get all areas
export async function getAllAreas() {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  if (data) {
    showAreasPage(data.meals);
  }
}

// get meals by area when click on area element
export async function getAreaMeals(area) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  let myData = [];
  if (data) {
    myData = getMaxNumberOfMeals(data);

    let element = document.querySelector("#home .row");
    appendAllMeals(myData, element);
  }
}

// get meals by first letter search when type in search input (first letter)
export async function getMealsBySearchFirstLetter(value) {
  if (value.length > 1) {
    value = value[0];
  }
  const regex = /^[A-Za-z]$/;
  if (regex.test(value)) {
    let data = await getData(
      `https://www.themealdb.com/api/json/v1/1/search.php?f=${value}`
    );

    let myData = [];
    if (data) {
      myData = getMaxNumberOfMeals(data);

      let container = searchMealsContainer();
      appendAllMeals(myData, container);
    }
  }
}

// get any data and handle error
async function getData(url) {
  closeMenu();
  startLoading();
  let data = await fetch(url, {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Request failed with status " + response.status);
      }
      return response.json();
    })
    .then((data) => {
      // Process the data
      return data;
    })
    .catch((error) => {
      // Handle the error
      showErrorPage();
      console.log("error in featch or handel data");
      console.error(error);
    });

  endLoading();
  return data;
}
