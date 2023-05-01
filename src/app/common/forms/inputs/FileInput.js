import { useCallback } from 'react'
import PropTypes from 'prop-types'


FileInput.propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
}

FileInput.defaultProps = {
  inputClassName: 'input-custom',
  readOnly: false,
}

export default function FileInput({ inputComponent, onChange, inputClassName, input, meta, label, ...props }) {
  const handleChange = useCallback((e) => onChange(e.target.files[0]), [onChange])
  return (
    <input
      type="file"
      onChange={handleChange}
    />
  )
}
