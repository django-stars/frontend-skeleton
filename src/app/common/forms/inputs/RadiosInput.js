import { useCallback } from 'react'
import PropTypes from 'prop-types'

RadiosInput.propTypes = {
  inputClassName: PropTypes.string,
  value: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  options: PropTypes.array.isRequired,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  onChange: PropTypes.func.isRequired,
}
RadiosInput.defaultProps = {
  inputClassName: 'radio-custom',
  valueKey: 'value',
  labelKey: 'label',
  value: '',
  disabled: false,
  name: undefined,
}

export default function RadiosInput({
  onChange,
  inputClassName,
  value,
  valueKey,
  labelKey,
  options,
  disabled,
  name,
}) {
  const handleChange = useCallback((e) => onChange(e.target.value), [onChange])
  return (
    <div className="radio-wrapper">
      {
        options.map((option) => (
          <label
            className={inputClassName}
            key={option[valueKey]}>
            <input
              type="radio"
              onChange={handleChange}
              checked={value === option[valueKey]}
              value={option[valueKey]}
              disabled={disabled}
              name={name}
            />
            <i></i> {/* empty tag for applying custom styles */}
            { option[labelKey] }
          </label>
        ))
      }
    </div>
  )
}
