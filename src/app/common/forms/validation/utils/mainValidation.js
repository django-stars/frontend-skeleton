import isEmpty from 'lodash/isEmpty'

export default function mainValidation(fields, validate) {
  return function(values) {
    if(!Array.isArray(fields)) {
      fields = [fields]
    }
    if(isEmpty(fields)) {
      throw new Error('fields should be defined')
    }
    return fields.reduce(function(res, key) {
      const errorMessage = validate(values[key])
      if(errorMessage) {
        return {
          ...res,
          [key]: errorMessage,
        }
      }
      return res
    }, {})
  }
}
