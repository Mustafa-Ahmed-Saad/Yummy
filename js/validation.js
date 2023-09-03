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

  let submitbtn = document.getElementById("submitBtn");
  if (isAllInputValid()) {
    if (submitbtn.hasAttribute("disabled")) {
      submitbtn.removeAttribute("disabled");
    }
  } else {
    if (!submitbtn.hasAttribute("disabled")) {
      submitbtn.setAttribute("disabled", true);
    }
  }
}
export function isAllInputValid() {
  if (
    isValidCaraterOnly() &&
    isValidEmail() &&
    isValidPassword() &&
    isValidRepassword() &&
    isValidPhoneNumber() &&
    isValidAge()
  ) {
    return true;
  } else {
    return false;
  }
}

function isValidCaraterOnly(input) {
  // nameInput => accept character only
  // /^[A-Za-z]+$/

  let valid = false;

  if (input === undefined) {
    input = document.getElementById("nameInput");
  }

  let regex = /^[A-Za-z]+$/;
  if (regex.test(input.value)) {
    valid = true;
    if (!document.getElementById("nameAlert").classList.contains("d-none")) {
      document.getElementById("nameAlert").classList.add("d-none");
    }
  } else {
    if (document.getElementById("nameAlert").classList.contains("d-none")) {
      document.getElementById("nameAlert").classList.remove("d-none");
    }
  }

  return valid;
}

function isValidEmail(input) {
  // emailInput => accept emails only
  // /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/

  let valid = false;

  if (input === undefined) {
    input = document.getElementById("emailInput");
  }

  let regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (regex.test(input.value)) {
    valid = true;
    if (!document.getElementById("emailAlert").classList.contains("d-none")) {
      document.getElementById("emailAlert").classList.add("d-none");
    }
  } else {
    if (document.getElementById("emailAlert").classList.contains("d-none")) {
      document.getElementById("emailAlert").classList.remove("d-none");
    }
  }

  return valid;
}

function isValidPhoneNumber(input) {
  // phoneInput => accept phone only
  // /^(02)?(010|011|012|015)\d{8}$/

  let valid = false;

  if (input === undefined) {
    input = document.getElementById("phoneInput");
  }

  let regex = /^(02)?(010|011|012|015)\d{8}$/;
  if (regex.test(input.value)) {
    valid = true;
    if (!document.getElementById("phoneAlert").classList.contains("d-none")) {
      document.getElementById("phoneAlert").classList.add("d-none");
    }
  } else {
    if (document.getElementById("phoneAlert").classList.contains("d-none")) {
      document.getElementById("phoneAlert").classList.remove("d-none");
    }
  }
  return valid;
}

function isValidAge(input) {
  // ageInput => accept number only from 5 to 100
  // /^([5-9]|[1-9][0-9]|100)$/
  let valid = false;

  if (input === undefined) {
    input = document.getElementById("ageInput");
  }

  let regex = /^([5-9]|[1-9][0-9]|100)$/;
  if (regex.test(input.value)) {
    valid = true;
    if (!document.getElementById("ageAlert").classList.contains("d-none")) {
      document.getElementById("ageAlert").classList.add("d-none");
    }
  } else {
    if (document.getElementById("ageAlert").classList.contains("d-none")) {
      document.getElementById("ageAlert").classList.remove("d-none");
    }
  }
  return valid;
}

function isValidPassword(input) {
  // passwordInput => accept 7 number or more and atlest 1 caracter or more
  // /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,30})$/

  let valid = false;

  if (input === undefined) {
    input = document.getElementById("passwordInput");
  }

  let regex = /^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]{8,30})$/;
  if (regex.test(input.value)) {
    valid = true;
    if (
      !document.getElementById("passwordAlert").classList.contains("d-none")
    ) {
      document.getElementById("passwordAlert").classList.add("d-none");
    }
  } else {
    if (document.getElementById("passwordAlert").classList.contains("d-none")) {
      document.getElementById("passwordAlert").classList.remove("d-none");
    }
  }

  isValidRepassword();

  return valid;
}

function isValidRepassword(input) {
  // repasswordInput
  // repasswordInput.value === passwordInput.value
  let valid = false;

  if (input === undefined) {
    input = document.getElementById("repasswordInput");
  }

  let inputPasswordValue = document.getElementById("passwordInput").value;

  if (input.value === inputPasswordValue) {
    valid = true;
    if (
      !document.getElementById("repasswordAlert").classList.contains("d-none")
    ) {
      document.getElementById("repasswordAlert").classList.add("d-none");
    }
  } else {
    if (
      document.getElementById("repasswordAlert").classList.contains("d-none")
    ) {
      document.getElementById("repasswordAlert").classList.remove("d-none");
    }
  }
  return valid;
}
