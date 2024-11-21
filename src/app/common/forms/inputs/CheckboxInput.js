import { useCallback } from 'react'
import PropTypes from 'prop-types'

CheckboxInput.propTypes = {
  inputClassName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  checkboxLabel: PropTypes.node,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
}

CheckboxInput.defaultProps = {
  inputClassName: 'custom-checkbox',
  value: false,
  disabled: false,
  required: false,
  checkboxLabel: undefined,
  name: undefined,
}

export default function CheckboxInput({
  inputClassName,
  value,
  checkboxLabel,
  disabled,
  required,
  onChange,
  name,
}) {
  const handleChange = useCallback((e) => onChange(e.target.checked), [onChange])
  return (
    <div className='input-wrapper'>
      {
        <label className={inputClassName}>
          <input
            name={name}
            type='checkbox'
            checked={value === true}
            value={value}
            onChange={handleChange}
            required={required}
            disabled={disabled}
          />
          <i></i> {/* empty tag for applying custom styles */}
          {checkboxLabel}
        </label>
      }
    </div>
  )
}
