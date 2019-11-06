import { Component } from 'react'
import LoginForm from './LoginForm'
import { withReduxForm, ResourceType } from 'ds-resource'

class LoginFormContainer extends Component {
  render() {
    return <LoginForm {...this.props}/>
  }
}


LoginFormContainer.propTypes = {
  session: ResourceType,
}

export default withReduxForm(
  {
    form: 'login',
  },
  {
    namespace: 'session',
    endpoint: 'accounts/login',
  },
  {
    prefetch: false,
  }
)(LoginFormContainer)
