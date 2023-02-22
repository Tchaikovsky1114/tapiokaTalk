export const reducer = (state, action) => {
  const {validationResult, name, value} = action;
  console.log(value);

  const updateValues = {
    ...state.values,
    [name]: value,
  }

  const updatedValidities = {
    ...state.validities,
    [name]: validationResult,
  }
  let updatedFormIsValid = true;

  for(const key in updatedValidities) {
    if(updatedValidities[key] !== undefined) {
      updatedFormIsValid = false;
      break;
    }
  }

  return {
    values: updateValues,
    validities: updatedValidities,
    formIsValid: updatedFormIsValid
  };
}