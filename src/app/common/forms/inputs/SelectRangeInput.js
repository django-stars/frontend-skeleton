import range from 'lodash/range'
import PropTypes from 'prop-types'
import SelectInput from 'shared/forms/inputs/SelectInput'

SelectRangeInput.propTypes = {
  rangeStart: PropTypes.number,
  rangeEnd: PropTypes.number,
  rangeStep: PropTypes.number,
}
SelectRangeInput.defaultProps = {
  rangeStart: null,
}

export default function SelectRangeInput({ rangeStart, rangeEnd, rangeStep, ...restProps }) {
  return (
    <SelectInput
      options={range(rangeStart, rangeEnd, rangeStep).map((value) => { return { label: value, value } })}
      {...restProps}
    />
  )
}
