import BaseFieldHOC from './BaseFieldHOC'

import CheckboxInput from './inputs/CheckboxInput'
// import CurrencyInput from './inputs/CurrencyInput'
// import DateInput from './inputs/DateInput'
import NumberInput from './inputs/NumberInput'
import RadiosInput from './inputs/RadiosInput'
// import SelectInput from './inputs/SelectInput'
// import SelectRangeInput from './inputs/SelectRangeInput'
import TextInput from './inputs/TextInput'
import TextAreaInput from './inputs/TextAreaInput'


const
  CheckboxField = BaseFieldHOC(CheckboxInput),
  // CurrencyField = BaseFieldHOC(CurrencyInput),
  // DateField = BaseFieldHOC(DateInput),
  NumberField = BaseFieldHOC(NumberInput),
  RadiosField = BaseFieldHOC(RadiosInput),
  // SelectField = BaseFieldHOC(SelectInput),
  // SelectRangeField = BaseFieldHOC(SelectRangeInput),
  TextField = BaseFieldHOC(TextInput),
  TextAreaField = BaseFieldHOC(TextAreaInput)

export {
  CheckboxField,
  // CurrencyField,
  // DateField,
  NumberField,
  RadiosField,
  // SelectField,
  // SelectRangeField,
  TextField,
  TextAreaField,
}
