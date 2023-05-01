import errors from './constants'

export default function required(value) {
  return !value ? errors.required : undefined
}
