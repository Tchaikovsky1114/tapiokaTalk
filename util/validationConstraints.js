import { validate } from "validate.js";

export const validateString = (id, value) => {

  const constraints = {
    presence: true,
    length: {
      minimum: 2,
      maximum:10,
      message: "^2글자 이상 10글자 이하로 입력해주세요.",
      fullMessage:true
    }
  }

  if(value !== "") {
    constraints.format = {
      pattern: "[a-zA-Zㄱ-ㅎ가-힣ㅏ-ㅣ]*$",
      flags: "i",
      message: '^숫자는 포함할 수 없습니다.',
      fullMessage:true
    }
  }

  const validateResult = validate({ [id]: value }, { [id]: constraints });

  return validateResult && validateResult[id];
}

export const validateEmail = (value) => {
  const constraints = {
    from: {
      email: {
        message: '^올바른 이메일 형식이 아닙니다.'
      },
      length: {
        minimum: 10,
        maximum: 25,
        message: '^이메일은 10자 이상 25자 이하여야 합니다.'
      }
    },
    
  }
  const validateResult = validate({from: value}, constraints);
  
  return validateResult && validateResult.from
}

export const validatePassword = (id,value) => {
  const constraints = {
    presence: true,
    length: {
      minimum: 8,
      maximum:20,
      message: "^8글자 이상 20글자 이하로 입력해주세요.",
      fullMessage:true
    }
  }

  if(value !== "") {
    constraints.format = {
      pattern: "^[a-zA-Z](?=.*[a-zA-Z])(?=.*[0-9]).{7,26}$",
      
      message: '^영문과 숫자를 조합해주세요.',
      fullMessage:true
    }
  }

  const validateResult = validate({ [id]: value }, { [id]: constraints });

  return validateResult && validateResult[id];
}


export const validatePasswordConfirm = (password,passwordConfirm) => {
  const constarints = {
    confirmPassword: {
      equality: {
        attribute: "password",
        message: "^비밀번호와 같지 않습니다."
      }
    },
    
  }
  const validateResult = validate({password:password,confirmPassword:passwordConfirm},constarints);

  return validateResult && validateResult.confirmPassword;
}