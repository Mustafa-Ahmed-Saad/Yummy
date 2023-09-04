import { getMeal } from "./getData.js";
import { isAllInputValid } from "./validation.js";

export function startLoading() {
  let loading = document.querySelector("#loading");

  if (loading.classList.contains("opacity-0")) {
    loading.classList.remove("opacity-0");
  }

  if (!loading.classList.contains("opacity-100")) {
    loading.classList.add("opacity-100");
  }

  setTimeout(() => {
    loading.classList.remove("d-none");
  }, 500);
}

export function endLoading() {
  let loading = document.querySelector("#loading");

  if (loading.classList.contains("opacity-100")) {
    loading.classList.remove("opacity-100");
  }
  if (!loading.classList.contains("opacity-0")) {
    loading.classList.add("opacity-0");
  }

  setTimeout(() => {
    loading.classList.add("d-none");
  }, 500);
}

export function closeMenu() {
  let mainNav = document.querySelector("nav");
  let asideNav = document.querySelector("#aside-nav");
  let menuIcon = document.querySelector("#menu-icon-nav .fa-solid");
  let navLinks = mainNav.querySelectorAll("nav li.position-relative");

  mainNav.style.cssText = `left: -${mainNav.offsetWidth}px !important`;
  asideNav.style.cssText = `left: 0px`;

  // add fa-x class
  if (!menuIcon.classList.contains("fa-align-justify")) {
    menuIcon.classList.add("fa-align-justify");
  }

  // remove fa-align-justify class
  if (menuIcon.classList.contains("fa-x")) {
    menuIcon.classList.remove("fa-x");
  }

  // remove top-0 class from all navLinks
  if (navLinks[0].classList.contains("top-0")) {
    navLinks.forEach((el) => {
      el.classList.remove("top-0");
    });
  }
}

export function openMenu() {
  let mainNav = document.querySelector("nav");
  let asideNav = document.querySelector("#aside-nav");
  let navLinks = mainNav.querySelectorAll("li.position-relative");
  let menuIcon = document.querySelector("#menu-icon-nav .fa-solid");

  mainNav.style.cssText = `left: 0px !important`;
  asideNav.style.cssText = `left: ${mainNav.offsetWidth}px`;

  // add fa-x class
  if (!menuIcon.classList.contains("fa-x")) {
    menuIcon.classList.add("fa-x");
  }

  // remove fa-align-justify class
  if (menuIcon.classList.contains("fa-align-justify")) {
    menuIcon.classList.remove("fa-align-justify");
  }

  // add top-0 class from all navLinks
  if (!navLinks[0].classList.contains("top-0")) {
    navLinks.forEach((el, index) => {
      setTimeout(() => {
        el.classList.add("top-0");
      }, `${index}00`);
    });
  }
}

export function createEl(elementName, attributes, eventsListener, children) {
  // tagName, AttributesObject, eventsObject, textOr`<></>`
  let myElement = document.createElement(elementName);

  if (attributes && Object.entries(attributes).length > 0) {
    Object.entries(attributes).forEach((attrbute) => {
      myElement.setAttribute(attrbute[0], attrbute[1]);
    });
  }

  if (eventsListener && Object.entries(eventsListener).length > 0) {
    Object.entries(eventsListener).forEach((event) => {
      myElement.addEventListener(event[0], event[1]);
    });
  }

  if (children) {
    myElement.innerHTML = children;
  }

  return myElement;
}

export function appendAllMeals(meals, element) {
  if (!meals) {
    return;
  }
  element.innerHTML = "";
  let mealEls = meals.map((meal) => {
    return createEl(
      "div",
      { class: "col-12 col-md-3 c-pointer" },
      {
        click: () => {
          getMeal(meal.idMeal);
        },
      },
      `<div
        class="div-img rounded-3 position-relative overflow-hidden"
        >
          <img class="w-100" src="${
            meal.strMealThumb || "./imgs/logo.png"
          }" alt="food" />
          <div
            class="layout transition-07 position-absolute w-100 h-100 bg-white opacity-75 rounded-3 ps-3 fw-medium fs-4"
          >
            <span class="top-50 translate-middle-y position-absolute text-black"
              >${meal.strMeal}</span
            >
          </div>
       </div>`
    );
  });
  element.append(...mealEls);
}

export function handelSubmit() {
  if (isAllInputValid()) {
    console.log("Done");
  }
}

export function searchMealsContainer() {
  let searchMealsContainerElement = document.querySelector(
    "#search-meals .container .row"
  );
  if (!searchMealsContainerElement) {
    searchMealsContainerElement = document.querySelector("#home .row");
  }

  return searchMealsContainerElement;
}

export function removeSearchInputs() {
  let input = document.querySelector("#search-name");
  if (input) {
    document.querySelector("#search-name").remove();
    document.querySelector("#search-letter").remove();
  }
}

export function initHomeRowElement() {
  removeSearchInputs();
  let element = document.querySelector("#home .row");
  element.innerHTML = "";

  return element;
}
