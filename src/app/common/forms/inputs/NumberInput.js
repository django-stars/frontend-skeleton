import { autobind } from 'core-decorators'
import { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
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

export default class NumberInput extends Component {
    @autobind
  handleChange(e) {
    this.props.onChange(e.target.value)
  }
    render() {
      const { inputClassName, placeholder, pattern,
        required, disabled, name, value } = this.props
      return (
        <input
          type='number'
          name={name}
          className={inputClassName}
          placeholder={placeholder}
          pattern={pattern}
          onChange={this.handleChange}
          required={required}
          disabled={disabled}
          value={value}
        />
      )
    }
}

NumberInput.propTypes = propTypes
NumberInput.defaultProps = defaultProps
