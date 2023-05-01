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
  onChange: PropTypes.func.isRequired,
}

NumberInput.defaultProps = {
  inputClassName: 'input-custom',
  placeholder: '',
  pattern: '###',
  required: false,
  disabled: false,
  value: '',
  name: undefined,
}

export default function NumberInput({
  onChange,
  inputClassName,
  ...props
}) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <input
      {...props}
      type='number'
      className={inputClassName}
      onChange={handleChange}
    />
  )
}
