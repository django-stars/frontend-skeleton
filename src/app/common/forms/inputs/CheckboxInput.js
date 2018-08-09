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

export default function CheckboxInput(props) {
  const { inputClassName, value, checkboxLabel, disabled, required } = props
  return (
    <div className='input-wrapper'>
      {
        <label className={inputClassName}>
          <input
            type='checkbox'
            checked={value === true}
            value={value}
            onChange={e => props.onChange(e.target.checked)}
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
