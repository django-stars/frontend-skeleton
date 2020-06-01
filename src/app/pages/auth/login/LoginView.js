import { useEffect } from 'react'
import PropTypes from 'prop-types'
import { TextField } from 'common/forms'
import classNames from './login.scss'
import { notification } from 'antd'


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
  useEffect(() => {
    notification.success({
      description: gettext('message description'),
    })
  }, [])

  return (
    <form onSubmit={handleSubmit} className={classNames.login}>
      <h2>{title}</h2>
      <TextField name="email" label={gettext('Email')} type="email" />
      <TextField name="password" label={gettext('Password')} type="password" />
      <button disabled={submitting || !valid }>{gettext('Login')}</button>
      <span dangerouslySetInnerHTML={{
        __html: interpolate(
          pgettext('EMAIL VALIDATION', 'It looks like an account with this email address already exists. Please %slog in%s to continue'),
          ['<a href="/login/">', '</a>'],
        ),
      }} />
    </form>
  )
}
