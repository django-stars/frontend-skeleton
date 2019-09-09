import { useCallback } from 'react'
import PropTypes from 'prop-types'

CheckboxInput.propTypes = {
  inputClassName: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.string,
  ]),
  label: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
}

CheckboxInput.defaultProps = {
  inputClassName: 'custom-checkbox',
}

export default function CheckboxInput({
  inputClassName,
  value,
  checkboxLabel,
  disabled,
  required,
  onChange,
}) {
  const handleChange = useCallback((e) => onChange(e.target.checked), [onChange])
  return (
    <div className='input-wrapper'>
      {
        <label className={inputClassName}>
          <input
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
