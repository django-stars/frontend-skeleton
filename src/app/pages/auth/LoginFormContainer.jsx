import { Component } from 'react'
import LoginForm from './LoginForm'
import { withReduxForm, ResourceType } from 'ds-resource'

const propTypes = {
  session: ResourceType.isRequired,
}


class LoginFormContainer extends Component {
  render() {
    return <LoginForm {...this.props}/>
  }
}


LoginFormContainer.propTypes = propTypes

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
