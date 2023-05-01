import { validateEmail, validateRequired, compose } from 'common/forms/validation'

export default compose(
  validateEmail('email'),
  validateRequired(['email', 'password']),
)
