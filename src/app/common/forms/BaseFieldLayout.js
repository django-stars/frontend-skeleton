import PropTypes from 'prop-types'

BaseFieldLayout.propTypes = {
  icon: PropTypes.node,
  label: PropTypes.string,
  prefix: PropTypes.string,
  required: PropTypes.bool,
  InputComponent: PropTypes.element,
}

export default function BaseFieldLayout(props) {
  const {
    icon,
    label,
    prefix,
    required,
    inputComponent: InputComponent,
  } = props

  return (
    <div className='form-group'>
      {icon}
      {label && (
        <label className='control-label'>
          {label}
          {required && <span className='control-asterisk'>*</span>}
        </label>
      )}
      <div className='control-field'>
        <div className='control-element'>
          {prefix && <div className='control-prefix'>{prefix}</div>}
          <InputComponent
            {...props}
            {...props.input}
          />
          {props.meta.error}
        </div>
      </div>
    </div>
  )
}
