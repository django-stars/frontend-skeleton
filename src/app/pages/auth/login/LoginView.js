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

export default function LoginView({ handleSubmit, submitting, valid }) {
  return (
    <form onSubmit={handleSubmit} className={classNames.login}>
      <h2>Login</h2>
      <TextField name="email" label="Email" type="email" />
      <TextField name="password" label="Password" type="password" />
      <button disabled={submitting || !valid }>Login</button>
    </form>
  )
}
