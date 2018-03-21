import range from 'lodash/range'
import PropTypes from 'prop-types'
import SelectInput from 'shared/forms/inputs/SelectInput'

const propTypes = {
  rangeStart: PropTypes.number,
  rangeEnd: PropTypes.number,
  rangeStep: PropTypes.number,
}
const defaultProps = {
  rangeStart: null,
}

export default function SelectRangeInput(props) {
  const { rangeStart, rangeEnd, rangeStep, ...restProps } = props
  return (
    <SelectInput
      options={range(rangeStart, rangeEnd, rangeStep).map((value) => { return { label: value, value } })}
      {...restProps}
    />
  )
}

SelectRangeInput.propTypes = propTypes
SelectRangeInput.defaultProps = defaultProps
