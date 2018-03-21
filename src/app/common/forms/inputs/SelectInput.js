import { Component } from 'react'
import Select from 'react-select'
import { autobind } from 'core-decorators'
import PropTypes from 'prop-types'

const propTypes = {
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
const defaultProps = {
  inputClassName: 'select-custom',
  isClearable: false,
  isMulti: false,
  isSearchable: false,
}

export default class SelectInput extends Component {
    @autobind
  handleChange(e) {
    const { value } = this.props
    this.props.onChange(e[value])
  }
    render() {
      const {
        inputClassName,
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
      } = this.props

      return (
        <Select
          name={name}
          className={inputClassName}
          placeholder={placeholder}
          value={value || ''}
          onChange={this.handleChange}
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
}

SelectInput.propTypes = propTypes
SelectInput.defaultProps = defaultProps
