export function compose(...validations) {
  return function(values) {
    return validations.reduce(function(errors, validator) {
      return { ...errors, ...validator(values) }
    }, {})
  }
}

export function composeValidators(...validations) {
  return function(value) {
    return validations.reduce(function(error, validator) {
      return error || validator(value)
    }, undefined)
  }
}
