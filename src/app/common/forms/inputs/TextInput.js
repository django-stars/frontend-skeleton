import { useCallback } from 'react'
import PropTypes from 'prop-types'


TextInput.propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

TextInput.defaultProps = {
  inputClassName: 'input-custom',
  readOnly: false,
  placeholder: '',
  pattern: undefined,
  required: undefined,
  disabled: undefined,
  value: '',
  name: undefined,
}

export default function TextInput({ onChange, inputClassName, ...props }) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <input
      {...props}
      className={inputClassName}
      onChange={handleChange}
    />
  )
}
