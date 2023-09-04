export function inputsValidation(input) {
  switch (input.id) {
    case "nameInput":
      isValidCaraterOnly(input);
      break;

    case "emailInput":
      isValidEmail(input);
      break;

    case "passwordInput":
      isValidPassword(input);
      break;

    case "repasswordInput":
      isValidRepassword(input);
      break;

    case "phoneInput":
      isValidPhoneNumber(input);
      break;

    case "ageInput":
      isValidAge(input);
      break;

    default:
      break;
  }

  let submitBtn = document.querySelector("#submitBtn");
  if (isAllInputValid()) {
    if (submitBtn.hasAttribute("disabled")) {
      submitBtn.removeAttribute("disabled");
    }
  } else {
    if (!submitBtn.hasAttribute("disabled")) {
      submitBtn.setAttribute("disabled", true);
    }
  }
}
export function isAllInputValid() {
  if (
    isValidCaraterOnly(undefined, true) &&
    isValidEmail(undefined, true) &&
    isValidPhoneNumber(undefined, true) &&
    isValidAge(undefined, true) &&
    isValidPassword(undefined, true) &&
    isValidRepassword(undefined, true)
  ) {
    return true;
  } else {
    return false;
  }
}

function isValidCaraterOnly(input, dontShowAlert) {
  // nameInput => accept character only
  // /^[A-Za-z]+$/

  if (input === undefined) {
    input = document.querySelector("#nameInput");
  }

  let regex = /^[A-Za-z]+$/;
  let nameAlertEl = document.querySelector("#nameAlert");

  return isValid(regex, input, nameAlertEl, dontShowAlert);
}

function isValidEmail(input, dontShowAlert) {
  // emailInput => accept emails only
  // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  if (input === undefined) {
    input = document.querySelector("#emailInput");
  }

  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  let emailAlertEl = document.querySelector("#emailAlert");

  return isValid(regex, input, emailAlertEl, dontShowAlert);
}

function isValidPhoneNumber(input, dontShowAlert) {
  // phoneInput => accept phone only
  // /^(02)?(010|011|012|015)\d{8}$/

  if (input === undefined) {
    input = document.querySelector("#phoneInput");
  }

  let regex = /^(02)?(010|011|012|015)\d{8}$/;

  let phoneAlertEl = document.querySelector("#phoneAlert");

  return isValid(regex, input, phoneAlertEl, dontShowAlert);
}

function isValidAge(input, dontShowAlert) {
  // ageInput => accept number only from 5 to 100
  // /^([5-9]|[1-9][0-9]|100)$/

  if (input === undefined) {
    input = document.querySelector("#ageInput");
  }

  let regex = /^([5-9]|[1-9][0-9]|100)$/;
  let ageAlertEl = document.querySelector("#ageAlert");

  return isValid(regex, input, ageAlertEl, dontShowAlert);
}

function isValidPassword(input, dontShowAlert) {
  // passwordInput => accept 7 number or more and atlest 1 caracter or more
  // /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,30})$/

  if (input === undefined) {
    input = document.querySelector("#passwordInput");
  }

  let regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,30})$/;
  let passwordAlertEl = document.querySelector("#passwordAlert");

  isValidRepassword();

  return isValid(regex, input, passwordAlertEl, dontShowAlert);
}

function isValidRepassword(input, dontShowAlert) {
  // repasswordInput
  // repasswordInput.value === passwordInput.value

  if (input === undefined) {
    input = document.querySelector("#repasswordInput");
  }

  let rePasswordAlertEl = document.querySelector("#rePasswordAlert");
  let inputPasswordValue = document.querySelector("#passwordInput").value;

  let regex = new RegExp("^(" + inputPasswordValue + ")$");

  return isValid(regex, input, rePasswordAlertEl, dontShowAlert);
}

function isValid(regex, input, messageEl, dontShowAlert) {
  if (dontShowAlert === undefined) {
    let valid = false;

    if (regex.test(input.value)) {
      valid = true;
      if (!messageEl.classList.contains("d-none")) {
        messageEl.classList.add("d-none");
      }
    } else {
      if (messageEl.classList.contains("d-none")) {
        messageEl.classList.remove("d-none");
      }
    }
    return valid;
  } else {
    return regex.test(input.value);
  }
}
