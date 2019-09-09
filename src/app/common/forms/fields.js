import BaseFieldHOC from './BaseFieldHOC'

import CheckboxInput from './inputs/CheckboxInput'
import NumberInput from './inputs/NumberInput'
import RadiosInput from './inputs/RadiosInput'
import TextInput from './inputs/TextInput'
import TextAreaInput from './inputs/TextAreaInput'


const CheckboxField = BaseFieldHOC(CheckboxInput)
const NumberField = BaseFieldHOC(NumberInput)
const RadiosField = BaseFieldHOC(RadiosInput)
const TextField = BaseFieldHOC(TextInput)
const TextAreaField = BaseFieldHOC(TextAreaInput)

export {
  CheckboxField,
  NumberField,
  RadiosField,
  TextField,
  TextAreaField,
}
