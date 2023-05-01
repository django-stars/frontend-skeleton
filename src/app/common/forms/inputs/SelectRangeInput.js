import range from 'lodash/range'
import PropTypes from 'prop-types'
import SelectInput from 'shared/forms/inputs/SelectInput'

SelectRangeInput.propTypes = {
  rangeStart: PropTypes.number.isRequired,
  rangeEnd: PropTypes.number.isRequired,
  rangeStep: PropTypes.number.isRequired,
}


export default function SelectRangeInput({ rangeStart, rangeEnd, rangeStep, ...restProps }) {
  return (
    <SelectInput
      options={range(rangeStart, rangeEnd, rangeStep).map((value) => { return { label: value, value } })}
      {...restProps}
    />
  )
}
