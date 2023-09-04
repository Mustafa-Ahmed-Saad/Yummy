import { closeMenu, openMenu } from "./helper.js";
import {
  getAllAreas,
  getCategories,
  getMainIngredients,
  getMealsBySearchName,
} from "./getData.js";

import { showContactUsPage, showSearchPage } from "./showPages.js";

let searchLi = document.querySelector("#searchLi");
let categoriesLi = document.querySelector("#categoriesLi");
let areasLi = document.querySelector("#areasLi");
let ingredientsLi = document.querySelector("#ingredientsLi");
let contactUsLi = document.querySelector("#contactUsLi");

let containerMenuIcon = document.querySelector("#menu-icon-nav");

// li addEventListener
searchLi.addEventListener("click", showSearchPage);
categoriesLi.addEventListener("click", getCategories);
areasLi.addEventListener("click", getAllAreas);
ingredientsLi.addEventListener("click", getMainIngredients);
contactUsLi.addEventListener("click", showContactUsPage);

// other addEventListener
containerMenuIcon.addEventListener("click", function () {
  let asideNav = document.querySelector("#aside-nav");
  if (asideNav.style.left > "0px") {
    closeMenu();
  } else {
    openMenu();
  }
});

// start app
closeMenu();
getMealsBySearchName("");

// ------------------------------------------------------------------------
