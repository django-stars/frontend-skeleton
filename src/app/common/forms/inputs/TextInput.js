import { useCallback } from 'react'
import PropTypes from 'prop-types'


TextInput.propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
}

TextInput.defaultProps = {
  inputClassName: 'input-custom',
  readOnly: false,
}

export default function TextInput({ inputComponent, onChange, inputClassName, input, meta, label, ...props }) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <input
      {...props}
      onChange={handleChange}
    />
  )
}
