import { Component } from 'react'
import LoginForm from './LoginForm'
import { ResourceType } from 'ds-resource'
import { withReduxForm } from 'common/hocs'

class LoginFormContainer extends Component {
  render() {
    return <LoginForm {...this.props}/>
  }
}


LoginFormContainer.propTypes = {
  session: ResourceType,
}

export default withReduxForm({
  form: {
    form: 'login',
  },
  resource: {
    namespace: 'session',
    endpoint: 'accounts/login',
  },
})(LoginFormContainer)
