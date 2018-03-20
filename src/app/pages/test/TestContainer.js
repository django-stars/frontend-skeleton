import { autobind } from 'core-decorators'
import { Component } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'

import Test from './Test'


class TestContainer extends Component {
  @autobind
  onSubmit(data) {
    console.log('submitted', data) // eslint-disable-line no-console
  }

  render() {
    const { handleSubmit, ...props } = this.props
    return <Test
      {...props}
      onSubmit={handleSubmit(this.onSubmit)}
    />
  }
}

export default compose(
  reduxForm({
    form: 'test',
    initialValues: {
      firstName: 'Stephen',
      lastName: 'Hawking',
      salutation: 'mr',
    },
  }),
)(TestContainer)
