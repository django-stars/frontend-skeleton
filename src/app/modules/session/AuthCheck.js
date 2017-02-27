import { push } from 'react-router-redux'
import { connect } from 'react-redux'
import { Component } from 'react'

export default function(ComposedComponent) {
  class AuthCheck extends Component {
    componentWillMount() {
      if(!this.props.isAuthorized) {
        this.props.push('/auth/login');
      }
    }

    componentWillUpdate(nextProps) {
      if(!nextProps.isAuthorized) {
        this.props.push('/auth/login');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  return connect(
    ({session}) => ({ isAuthorized: !!session.token }), // TODO use reselect
    { push }
  )(AuthCheck)
}
