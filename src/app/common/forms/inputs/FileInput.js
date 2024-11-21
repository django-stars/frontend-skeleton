import { useCallback } from 'react'
import PropTypes from 'prop-types'


FileInput.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default function FileInput({ name, onChange }) {
  const handleChange = useCallback((e) => onChange(e.target.files[0]), [onChange])
  return (
    <input
      name={name}
      type="file"
      onChange={handleChange}
    />
  )
}
