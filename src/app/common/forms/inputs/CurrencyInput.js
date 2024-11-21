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
  onChange: PropTypes.func.isRequired,
}
CurrencyInput.defaultProps = {
  inputClassName: 'input-custom',
  thousandSeparator: "'",
  placeholder: '',
  required: false,
  disabled: false,
  value: '',
  name: undefined,
}

export default function CurrencyInput({
  onChange,
  inputClassName,
  ...props
}) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <NumberFormat
      {...props}
      className={inputClassName}
      onChange={handleChange}
    />
  )
}
