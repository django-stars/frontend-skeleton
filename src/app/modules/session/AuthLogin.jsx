import { Component } from 'react'

import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { login } from '.'

class AuthLogin extends Component {
  render() {
    const { handleSubmit, error } = this.props;
    return (
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">User name</label>
          <Field name="username" component="input" type="text" />
        </div>
        <div>
          <label htmlFor="lastName">Password</label>
          <Field name="password" component="input" type="password" />
        </div>
        { error && <p style={{color:'red'}}>{error}</p> }
        <button type="submit">Login</button>
      </form>
    )
  }
}

const loginForm = reduxForm({
  form: 'login'
})(AuthLogin)

export default connect(
  (state) => ({}),
  {
    onSubmit: login
  }
)(loginForm)
