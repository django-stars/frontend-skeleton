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
}
SelectInput.defaultProps = {
  inputClassName: 'select-custom',
  isClearable: false,
  isMulti: false,
  isSearchable: false,
}

export default function SelectInput({
  inputClassName,
  onChange,
  placeholder,
  name,
  options,
  required,
  value,
  isDisabled,
  isClearable,
  isMulti,
  isSearchable,
  ...restProps
}) {
  const handleChange = useCallback((e) => onChange(e[value]), [onChange, value])
  return (
    <Select
      name={name}
      className={inputClassName}
      placeholder={placeholder}
      value={value || ''}
      onChange={handleChange}
      options={options}
      required={required}
      isDisabled={isDisabled}
      isClearable={isClearable}
      isMulti={isMulti}
      isSearchable={isSearchable}
      {...restProps}
    />
  )
}
