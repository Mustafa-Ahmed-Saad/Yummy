import { getMeal } from "./getData.js";
import { isAllInputValid } from "./validation.js";

export function startLoading() {
  let loading = document.getElementById("loading");

  if (loading.classList.contains("d-none")) {
    loading.classList.remove("d-none");
  }
}

export function endLoading() {
  let loading = document.getElementById("loading");
  if (!loading.classList.contains("d-none")) {
    loading.classList.add("d-none");
  }
}

export function closeMenu(doToggle) {
  let mainNav = document.querySelector("nav");
  let asideNav = document.getElementById("aside-nav");
  let navLinks = mainNav.querySelectorAll("li.position-relative");

  mainNav.style.cssText = `left: -${mainNav.offsetWidth}px !important`;
  asideNav.style.cssText = `left: 0px`;

  if (doToggle) return;

  document
    .querySelector("#menu-icon-nav .fa-solid")
    .classList.toggle("fa-align-justify");
  document.querySelector("#menu-icon-nav .fa-solid").classList.toggle("fa-x");

  navLinks.forEach((el) => {
    el.classList.toggle("top-0");
  });
}

export function openMenu() {
  let mainNav = document.querySelector("nav");
  let asideNav = document.getElementById("aside-nav");
  let navLinks = mainNav.querySelectorAll("li.position-relative");
  mainNav.style.cssText = `left: 0px !important`;
  asideNav.style.cssText = `left: ${mainNav.offsetWidth}px`;

  document
    .querySelector("#menu-icon-nav .fa-solid")
    .classList.toggle("fa-align-justify");
  document.querySelector("#menu-icon-nav .fa-solid").classList.toggle("fa-x");

  navLinks.forEach((el, index) => {
    setTimeout(() => {
      el.classList.toggle("top-0");
    }, `${index}00`);
  });
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
