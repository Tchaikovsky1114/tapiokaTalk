export const reducer = (state, action) => {
  const {validationResult,name} = action;

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
    validities: updatedValidities,
    formIsValid: updatedFormIsValid
  };
}