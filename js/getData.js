import {
  closeMenu,
  startLoading,
  endLoading,
  appendAllMeals,
  searchMealsContainer,
  removeSearchInputs,
} from "./helper.js";
import {
  showMealPage,
  showMainIngredientsPage,
  showCategoriesPage,
  showAreasPage,
  showErrorPage,
} from "./showPages.js";

const limit = 20;

export async function getMealsBySearchName(value) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
  );

  let myData = [];
  if (data) {
    if (data?.meals?.length > limit) {
      myData = data.meals.slice(0, limit);
    } else {
      myData = data.meals;
    }

    let container = searchMealsContainer();
    appendAllMeals(myData, container);
  }
}

export async function getMeal(id) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (data) {
    showMealPage(data.meals[0]);
  }
}

export async function getCategoryMeals(category) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
  );

  let myData = [];
  if (data) {
    if (data?.meals?.length > limit) {
      myData = data.meals.slice(0, limit);
    } else {
      myData = data.meals;
    }
    let element = document.querySelector("#home .row");
    appendAllMeals(myData, element);
  }
}

export async function getCategories() {
  removeSearchInputs();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  if (data) {
    showCategoriesPage(data.categories);
  }
}

export async function getMainIngredients() {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  if (data) {
    showMainIngredientsPage(data.meals);
  }
}

export async function getIngredientMeals(ingredient) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
  );

  let myData = [];
  if (data) {
    if (data?.meals?.length > limit) {
      myData = data.meals.slice(0, limit);
    } else {
      myData = data.meals;
    }
    let element = document.querySelector("#home .row");
    appendAllMeals(myData, element);
  }
}

export async function getAllAreas() {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  if (data) {
    showAreasPage(data.meals);
  }
}

export async function getAreaMeals(area) {
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`
  );

  let myData = [];
  if (data) {
    if (data?.meals?.length > limit) {
      myData = data.meals.slice(0, limit);
    } else {
      myData = data.meals;
    }
    let element = document.querySelector("#home .row");
    appendAllMeals(myData, element);
  }
}

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
      if (data?.meals?.length > limit) {
        myData = data.meals.slice(0, limit);
      } else {
        myData = data.meals;
      }

      let container = searchMealsContainer();
      appendAllMeals(myData, container);
    }
  }
}

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
