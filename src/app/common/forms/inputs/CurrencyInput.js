import { autobind } from 'core-decorators'
import { Component } from 'react'
import PropTypes from 'prop-types'
import NumberFormat from 'react-number-format'

const propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
}
const defaultProps = {
  inputClassName: 'input-custom',
}

export default class CurrencyInput extends Component {
    @autobind
  handleChange(e) {
    this.props.onChange(e.target.value)
  }
    render() {
      const { inputClassName, placeholder, required,
        disabled, name, value } = this.props
      return (
        <NumberFormat
          className={inputClassName}
          placeholder={placeholder}
          onChange={this.handleChange}
          required={required}
          disabled={disabled}
          name={name}
          value={value}
          thousandSeparator="'"
        />
      )
    }
}

CurrencyInput.propTypes = propTypes
CurrencyInput.defaultProps = defaultProps
