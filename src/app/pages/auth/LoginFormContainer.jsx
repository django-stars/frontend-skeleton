import { PureComponent } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import LoginForm from './LoginForm'
import { connectFormResource } from 'common/utils/resource'

class LoginFormContainer extends PureComponent {
  render() {
    return <LoginForm {...this.props} />
  }
}

let loginResource = {
  prefetch: false,
  namespace: 'session',
  endpoint: 'auth',
}

export default compose(
  connectFormResource(loginResource, { form: 'login' }),
  reduxForm({
    form: 'login',
  }),
)(LoginFormContainer)
