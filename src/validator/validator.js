export function validateEmail(email) {
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  // return !re.test(email);
  if (!re.test(email)) {
    return "Nieprawidłowy format email";
  }
  return null;
}

export function validatePassword(password) {
  const valid = password.length > 2 && password.length < 16;
  if (!valid) {
    return "Nieprawidłowe hasło";
  }
  return null;
}

export function validateName(name) {
  if (name.length === 0 || !name) {
    return "Pole wymagane";
  }
  if (name.length < 1) {
    return "Minimalna ilość znaków 2";
  }
  if (name.length > 31) {
    return "Maksymalna ilość znaków 30";
  }
  return null;
}

export function validateRegisterPassword(password) {
  if (password.length === 0 || !password) {
    return "Pole wymagane";
  }
  if (password.length < 5) {
    return "Minimalna ilość znaków 6";
  }
  if (password.length > 31) {
    return "Maksymalna ilość znaków 30";
  }
  if (!password.match(/[0-9]/)) {
    return "Hasło musi zawierać 1 cyfrę";
  }
  if (!password.match(/[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/)) {
    return "Hasło musi zawierać znak specjalny";
  }

  return null;
}

export function validateConfirmPassword(password, confirm_password) {
  if (confirm_password.length === 0 || !confirm_password) {
    return "Pole wymagane";
  }
  if (password !== confirm_password) {
    return "Hasła różnią się od siebie";
  }
  return null;
}

///////////////////walidator formularza////////////////////////////////

export function ValidateBrand(field) {
  if (field.length === 0 || !field) {
    return "Pole wymagane";
  }
  if (field.length < 1) {
    return "Minimalna ilość znaków 2";
  }
  if (field.length > 31) {
    return "Maksymalna ilość znaków 30";
  }
  return null;
}

export function ValidateMainCategory(field) {
  if (field.length === 0 || !field) {
    return "Wybór wymagany";
  }
  return null;
}
export function ValidateSecondaryCategory(field) {
  if (field.length === 0 || !field) {
    return "Wybór wymagane";
  }
  return null;
}

export function ValidateProductShortName(field) {
  if (field.length === 0 || !field) {
    return "Pole wymagane";
  }
  if (field.length < 1) {
    return "Minimalna ilość znaków 2";
  }
  if (field.length > 41) {
    return "Maksymalna ilość znaków 40";
  }
  return null;
}

export function ValidateProductDescription(field) {
  if (!field) {
    return null;
  }
  if (field.length > 501) {
    return "Maksymalna ilość znaków 500";
  }
  return null;
}

export function ValidateProductCapacity(field) {
  if (!field) {
    return null;
  }
  if (!field.match(/^[1-9]/)) {
    return "Pojemność może być wyrażona tylko w liczbach dodatnich.";
  }
  if (field.length > 7) {
    return "Zbyt duża wartość";
  }
  return null;
}

export function ValidateProductPrice(field) {
  if (!field) {
    return null;
  }
  if (!field?.match(/^[1-9]\d{0,6}\.\d{2}$/)) {
    //dł.ciągu 6, wartosc po przecinku 2.
    return "Cena musi być wartością dodatnią z dokładnością do 2 miejsc po przecinku.";
  }
  return null;
}

export function ValidatePeriodAfterOpening(field) {
  if (!field) {
    return null;
  }
  if (!field.match(/^[1-9]/)) {
    return "PAO może być wyrażone tylko w liczbach dodatnich.";
  }
  if (field.length >= 3) {
    return "Maksymalna ilość znaków 2";
  }
  return null;
}
