import PropTypes from 'prop-types'
import { TextField } from 'common/forms'
import classNames from './login.scss'


LoginView.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  submitting: PropTypes.bool,
  valid: PropTypes.bool,
}

LoginView.defaultProps = {
  submitting: false,
  valid: true,
}

// ussage with variables
const title = gettext('Login')

export default function LoginView({ handleSubmit, submitting, valid }) {
  return (
    <form onSubmit={handleSubmit} className={classNames.login}>
      <h2>{title}</h2>
      <TextField name="email" label={gettext('Email')} type="email" />
      <TextField name="password" label={gettext('Password')} type="password" />
      <button disabled={submitting || !valid }>{gettext('Login')}</button>
    </form>
  )
}
