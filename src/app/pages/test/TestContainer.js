import { compose } from 'redux'
import { reduxForm } from 'redux-form'

import Test from './Test'


export default compose(
  reduxForm({
    form: 'test',
    initialValues: {
    },
  }),
)(Test)
