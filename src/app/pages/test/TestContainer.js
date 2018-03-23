import { autobind } from 'core-decorators'
import { Component } from 'react'
import { compose } from 'redux'
import { reduxForm } from 'redux-form'

// import { connectResource, connectFormResource } from 'common/utils/resource'
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
      onSubmit={handleSubmit}
    />
  }
}

/*
let testResource = {
  namespace: 'leads',
  endpoint: 'leads/e4831306-9e2e-41b7-bb77-514318aa51ba',
}
*/

export default compose(
  // connectResource(testResource),
  // connectFormResource(testResource),

  reduxForm({
    form: 'test',
    initialValues: {
      firstName: 'Stephen',
      lastName: 'Hawking',
      salutation: 'mr',
    },
  }),
)(TestContainer)
