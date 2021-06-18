import { useMemo } from 'react'
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
  label: undefined,
  required: false,
  prefix: undefined,
}

export default function BaseFieldLayout({
  label,
  prefix,
  required,
  inputComponent: InputComponent,
  meta,
  input,
  ...rest
}) {
  const error = useMemo(() => {
    if(meta.submitError && !meta.dirtySinceLastSubmit) {
      return meta.submitError
    }
    if(meta.error && meta.touched) {
      return meta.error
    }
  }, [meta.error, meta.touched, meta.dirtySinceLastSubmit, meta.submitError])
  const formattedError = useMemo(() => Array.isArray(error) ? error[0] : error, [error])

  return (
    <div className="form-group">
      {label && (
        <label className="control-label">
          {label}
          {required && <span className="control-asterisk">*</span>}
        </label>
      )}
      <div className="control-field">
        <div className="control-element">
          {prefix && <div className="control-prefix">{prefix}</div>}
          <InputComponent
            required={required}
            {...rest}
            {...input}
          />
          <p>{formattedError}</p>
        </div>
      </div>
    </div>
  )
}
