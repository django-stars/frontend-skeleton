import { Field } from 'react-final-form'
import BaseFieldLayout from './BaseFieldLayout'

export default function BaseFieldHOC(Component) {
  return function(props) {
    return (
      <Field
        component={BaseFieldLayout}
        inputComponent={Component}
        parse={identity}
        {...props}
      />
    )
  }
}

// https://github.com/final-form/react-final-form/issues/130
function identity(value) {
  return value
}
