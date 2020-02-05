import { useCallback } from 'react'
import Select from 'react-select'
import PropTypes from 'prop-types'

SelectInput.propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  name: PropTypes.string,
  options: PropTypes.array,
  required: PropTypes.bool,
  value: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.string,
  ]),
  isDisabled: PropTypes.bool,
  isClearable: PropTypes.bool,
  isMulti: PropTypes.bool,
  isSearchable: PropTypes.bool,
  onChange: PropTypes.func.isRequired,
}
SelectInput.defaultProps = {
  inputClassName: 'select-custom',
  name: undefined,
  isClearable: false,
  isMulti: false,
  isSearchable: false,
  placeholder: '',
  options: [],
  required: false,
  value: '',
  isDisabled: false,
}

export default function SelectInput({
  inputClassName,
  onChange,
  value,
  ...props
}) {
  const handleChange = useCallback((e) => onChange(e[value]), [onChange, value])
  return (
    <Select
      {...props}
      className={inputClassName}
      value={value || ''}
      onChange={handleChange}
    />
  )
}
