import { useCallback } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

CurrencyInput.propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
  thousandSeparator: PropTypes.string,
}
CurrencyInput.defaultProps = {
  inputClassName: 'input-custom',
  thousandSeparator: "'",
}

export default function CurrencyInput({
  onChange,
  inputClassName,
  placeholder,
  required,
  disabled,
  name,
  value,
  thousandSeparator,
}) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <NumberFormat
      className={inputClassName}
      placeholder={placeholder}
      onChange={handleChange}
      required={required}
      disabled={disabled}
      name={name}
      value={value}
      thousandSeparator={thousandSeparator}
    />
  )
}
