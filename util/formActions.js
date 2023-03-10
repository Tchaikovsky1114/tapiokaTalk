import { validateEmail, validateLength, validatePassword, validatePasswordConfirm, validateString } from "./validationConstraints";

let pw = 'qweqweqwe';
export const validateInput = (name, value) => {
  
  if (name === 'username') {
    return validateString(name, value);
  } else if (name === 'email') {
    return validateEmail(value);
  } else if (name === 'password') {
    pw = value;
    return validatePassword(name, value);
  } else if (name === 'passwordConfirm') {
    return validatePasswordConfirm(pw, value);
  } else if (name === 'me') {
    
    return validateLength(name, value, 0, 150, true)
  }
}