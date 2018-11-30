import { PureComponent } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import LoginForm from './LoginForm'
import { connectFormResource } from 'common/utils/resource'
import { connect } from 'react-redux'
import navigate from 'common/router/navigate'

class LoginFormContainer extends PureComponent {
  componentWillReceiveProps({ submitting, submitSucceeded, navigate }) {
    if(!submitting && submitSucceeded) {
      navigate('dashboard')
    }
  }
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
  connect(null, { navigate }),
)(LoginFormContainer)
