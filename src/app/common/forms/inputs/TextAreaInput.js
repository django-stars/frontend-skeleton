import { autobind } from 'core-decorators'
import { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  inputClassName: PropTypes.string,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  required: PropTypes.bool,
  rows: PropTypes.number,
  cols: PropTypes.number,
  name: PropTypes.string,
  value: PropTypes.string,
}
const defaultProps = {
  inputClassName: 'input-custom',
}

export default class TextAreaInput extends Component {
    @autobind
  handleChange(e) {
    this.props.onChange(e.target.value)
  }
    render() {
      const { inputClassName, placeholder, disabled,
        required, rows, cols, name, value } = this.props
      return (
        <textarea
          name={name}
          className={inputClassName}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          rows={rows}
          cols={cols}
          value={value}
          onChange={this.handleChange}
        ></textarea>
      )
    }
}

TextAreaInput.propTypes = propTypes
TextAreaInput.defaultProps = defaultProps
