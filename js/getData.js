import {
  closeMenu,
  startLoading,
  endLoading,
  appendAllMeals,
} from "./helper.js";
import {
  showMealPage,
  showSearchMealsPage,
  showMainIngredientsPage,
  showCategoriesPage,
  showAreasPage,
} from "./showPages.js";

const limit = 20;

export async function getMealsBySearchName(value) {
  startLoading();
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
    showSearchMealsPage(myData);
  }
  endLoading();
}

export async function getMeal(id) {
  startLoading();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
  );

  if (data) {
    showMealPage(data.meals[0]);
  }
  endLoading();
}

export async function getCategoryMeals(category) {
  startLoading();
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
  endLoading();
}

export async function getCategories() {
  startLoading();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/categories.php`
  );

  if (data) {
    showCategoriesPage(data.categories);
  }

  endLoading();
}

export async function getMainIngredients() {
  closeMenu();
  let input = document.querySelector("#search-name");
  if (input) {
    document.querySelector("#search-name").remove();
    document.querySelector("#search-letter").remove();
  }

  startLoading();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/list.php?i=list`
  );

  if (data) {
    showMainIngredientsPage(data.meals);
  }

  endLoading();
}

export async function getIngredientMeals(ingredient) {
  startLoading();
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
  endLoading();
}

export async function getAllAreas() {
  startLoading();
  let data = await getData(
    `https://www.themealdb.com/api/json/v1/1/list.php?a=list`
  );

  if (data) {
    showAreasPage(data.meals);
  }
  endLoading();
}

export async function getAreaMeals(area) {
  startLoading();
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
  endLoading();
}

export async function getMealsBySearchFirstLetter(value) {
  if (value.length > 1) {
    value = value[0];
  }
  const regex = /^[A-Za-z]$/;
  if (regex.test(value)) {
    startLoading();
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
      showSearchMealsPage(myData);
    }
    endLoading();
  }
}

async function getData(url) {
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
      console.log("error in featch or handel data");
      console.error(error);
    });

  endLoading();
  return data;
}
