import { autobind } from 'core-decorators'
import { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  pattern: PropTypes.string,
  required: PropTypes.bool,
  disabled: PropTypes.bool,
  readOnly: PropTypes.bool,
  name: PropTypes.string,
  value: PropTypes.string,
}
const defaultProps = {
  inputClassName: 'input-custom',
  readOnly: false,
}

export default class TextInput extends Component {
    @autobind
  handleChange(e) {
    this.props.onChange(e.target.value)
  }
    render() {
      const { inputClassName, placeholder, pattern,
        required, disabled, readOnly, name, value } = this.props
      return (
        <input
          type="text"
          name={name}
          className={inputClassName}
          placeholder={placeholder}
          pattern={pattern}
          onChange={this.handleChange}
          required={required}
          disabled={disabled}
          readOnly={readOnly}
          value={value}
        />
      )
    }
}

TextInput.propTypes = propTypes
TextInput.defaultProps = defaultProps
