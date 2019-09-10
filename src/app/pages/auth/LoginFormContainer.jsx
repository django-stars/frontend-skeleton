import { Component } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'
import LoginForm from './LoginForm'
import connectResouces from 'djangostars/resources'

class LoginFormContainer extends Component {
  onSubmit = (data) => this.props.session.create(data)


  render() {
    return <LoginForm {...this.props} onSubmit ={this.onSubmit}/>
  }
}

export default compose(
  connectResouces({
    namespace: 'session',
    endpoint: 'accounts/login',
  }),
  reduxForm({
    form: 'login',
  })
)(LoginFormContainer)
