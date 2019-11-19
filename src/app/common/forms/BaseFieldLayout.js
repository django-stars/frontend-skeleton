import PropTypes from 'prop-types'

BaseFieldLayout.propTypes = {
  label: PropTypes.node,
  required: PropTypes.bool,
  inputComponent: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.elementType,
    PropTypes.func,
  ]).isRequired,
  meta: PropTypes.object.isRequired,
  input: PropTypes.object.isRequired,
  prefix: PropTypes.node,
}

BaseFieldLayout.defaultProps = {
  label: null,
  required: false,
  prefix: undefined,
}

export default function BaseFieldLayout({
  label,
  required,
  inputComponent: InputComponent,
  meta,
  input,
  prefix,
  ...rest
}) {
  return (
    <div className='form-group'>
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
            required={required}
            {...rest}
            {...input}
          />
          {meta.error}
        </div>
      </div>
    </div>
  )
}
