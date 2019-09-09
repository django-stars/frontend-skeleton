import { useCallback } from 'react'
import PropTypes from 'prop-types'

NumberInput.propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}
NumberInput.defaultProps = {
  inputClassName: 'input-custom',
}

export default function NumberInput({
  onChange,
  inputClassName,
  placeholder,
  pattern,
  required,
  disabled,
  name,
  value,
}) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <input
      type='number'
      name={name}
      className={inputClassName}
      placeholder={placeholder}
      pattern={pattern}
      onChange={handleChange}
      required={required}
      disabled={disabled}
      value={value}
    />
  )
}
