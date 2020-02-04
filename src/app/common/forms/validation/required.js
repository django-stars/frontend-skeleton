import { mainValidation } from './utils'
import errors from './constants'

export function validateRequired(fields) {
  return mainValidation(fields, required)
}

export function required(value) {
  return !value ? errors.required : undefined
}
