import { useCallback } from 'react'
import PropTypes from 'prop-types'

TextAreaInput.propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  cols: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
}
TextAreaInput.defaultProps = {
  inputClassName: 'input-custom',
}


export default function TextAreaInput({
  onChange,
  inputClassName,
  placeholder,
  disabled,
  required,
  rows,
  cols,
  name,
  value,
}) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <textarea
      name={name}
      className={inputClassName}
      placeholder={placeholder}
      disabled={disabled}
      required={required}
      rows={rows}
      cols={cols}
      value={value}
      onChange={handleChange}
    ></textarea>
  )
}
