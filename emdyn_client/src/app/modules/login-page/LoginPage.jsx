import { Component } from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import { login } from '../session/'
import { InputCustom } from '../form/input-custom'
import { validate } from '../form/validate'
import { Button } from 'antd'

class LoginPage extends Component {
  render() {
    const { handleSubmit } = this.props;
    return (
      <div className="login-page">
        <form onSubmit={handleSubmit} className="form-login">
          <img className="logo" src="static/img/logo.svg" alt="Emdyn Vigilance" />
          <Field
            name="email"
            label="Login"
            component={InputCustom}
            type="email" />
          <Field
            name="password"
            label="Password"
            component={InputCustom}
            type="password" />
          <Button type="primary" htmlType="submit">Sign in</Button>
        </form>
      </div>
    );
  }
}

const loginForm = reduxForm({
  form: 'login',
  validate,
})(LoginPage);

export default connect(
  ({session}) => ({
    session,
  }),
  {
    onSubmit: login,
  }
)(loginForm)
