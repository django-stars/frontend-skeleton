import { useCallback } from 'react'
import PropTypes from 'prop-types'

TextAreaInput.propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  cols: PropTypes.number,
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}

TextAreaInput.defaultProps = {
  inputClassName: 'input-custom',
  placeholder: '',
  disabled: false,
  required: false,
  rows: undefined,
  cols: undefined,
  value: '',
  name: undefined,
}


export default function TextAreaInput({
  onChange,
  inputClassName,
  ...props
}) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <textarea {...props} onChange={handleChange} className={inputClassName}></textarea>
  )
}
