import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import valueToDate from 'shared/utils/valueToDate'
import dateToValue from 'shared/utils/dateToValue'

const propTypes = {
  inputClassName: PropTypes.string,
  monthsShown: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  dateFormat: PropTypes.string,
  value: PropTypes.string,
}
const defaultProps = {
  inputClassName: 'input-custom',
  monthsShown: 1,
  dateFormat: 'DD.MM.YYYY',
}

export default function DateInput(props) {
  const { inputClassName, monthsShown, placeholder, disabled, name, value, dateFormat } = props
  return (
    <div className='datepicker'>
      <DatePicker
        name={name}
        selected={valueToDate(value, dateFormat)}
        onChange={(value) => {
          props.onChange(dateToValue(value, dateFormat))
        }}
        disabled={disabled}
        className={inputClassName}
        dateFormat={dateFormat}
        monthsShown={monthsShown}
        placeholderText={placeholder}
      />
    </div>
  )
}

DateInput.propTypes = propTypes
DateInput.defaultProps = defaultProps
