import { closeMenu, openMenu } from "./helper.js";
import {
  getAllAreas,
  getCategories,
  getMainIngredients,
  getMealsBySearchName,
} from "./getData.js";

import { showContactUsPage, showSearchPage } from "./showPages.js";

let searchLi = document.getElementById("searchLi");
let categoriesLi = document.getElementById("categoriesLi");
let areasLi = document.getElementById("areasLi");
let ingredientsLi = document.getElementById("ingredientsLi");
let contactUsLi = document.getElementById("contactUsLi");

let containerMenuIcon = document.getElementById("menu-icon-nav");

let mainNav = document.querySelector("nav");
let asideNav = document.getElementById("aside-nav");

// handel style of aside and nav
asideNav.style.cssText = `left: ${mainNav.offsetWidth}px`;

// li addEventListener
searchLi.addEventListener("click", showSearchPage);
categoriesLi.addEventListener("click", getCategories);
areasLi.addEventListener("click", getAllAreas);
ingredientsLi.addEventListener("click", getMainIngredients);
contactUsLi.addEventListener("click", showContactUsPage);

// other addEventListener
containerMenuIcon.addEventListener("click", function () {
  if (asideNav.style.left > "0px") {
    closeMenu();
  } else {
    openMenu();
  }
});

// start app
closeMenu("noToggleMenuIcon");
getMealsBySearchName("");

// ------------------------------------------------------------------------
