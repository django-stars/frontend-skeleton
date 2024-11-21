import { useCallback } from 'react'
import DatePicker from 'react-datepicker'
import PropTypes from 'prop-types'
import valueToDate from 'shared/utils/valueToDate'
import dateToValue from 'shared/utils/dateToValue'

DateInput.propTypes = {
  inputClassName: PropTypes.string,
  monthsShown: PropTypes.number,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  dateFormat: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
}
DateInput.defaultProps = {
  inputClassName: 'input-custom',
  monthsShown: 1,
  dateFormat: 'DD.MM.YYYY',
  placeholder: '',
  required: false,
  disabled: false,
  value: '',
  name: undefined,
}

export default function DateInput({
  inputClassName,
  monthsShown,
  placeholder,
  disabled,
  value,
  dateFormat,
  onChange,
  name,
}) {
  const handleChange = useCallback((value) => onChange(dateToValue(value, dateFormat)), [onChange])
  return (
    <div className='datepicker'>
      <DatePicker
        selected={valueToDate(value, dateFormat)}
        onChange={handleChange}
        disabled={disabled}
        className={inputClassName}
        dateFormat={dateFormat}
        monthsShown={monthsShown}
        placeholderText={placeholder}
        name={name}
      />
    </div>
  )
}
