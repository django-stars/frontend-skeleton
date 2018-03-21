import { autobind } from 'core-decorators'
import { Component } from 'react'
import PropTypes from 'prop-types'

const propTypes = {
  inputClassName: PropTypes.string,
  value: PropTypes.string,
  valueKey: PropTypes.string,
  labelKey: PropTypes.string,
  options: PropTypes.array,
  disabled: PropTypes.bool,
  name: PropTypes.string,
}
const defaultProps = {
  inputClassName: 'radio-custom',
  valueKey: 'value',
  labelKey: 'label',
}

export default class RadiosInput extends Component {
    @autobind
  handleChange(e) {
    this.props.onChange(e.target.value)
  }
    render() {
      const { inputClassName, value, valueKey, labelKey,
        options, disabled, name } = this.props
      return (
        <div className='radio-wrapper'>
          {
            options.map((option) => (
              <label
                className={inputClassName}
                key={option[valueKey]}>
                <input
                  type='radio'
                  name={name}
                  onChange={this.handleChange}
                  checked={value === option[valueKey]}
                  value={option[valueKey]}
                  disabled={disabled}
                />
                <i></i> {/* empty tag for applying custom styles */}
                { option[labelKey] }
              </label>
            ))
          }
        </div>
      )
    }
}

RadiosInput.propTypes = propTypes
RadiosInput.defaultProps = defaultProps
