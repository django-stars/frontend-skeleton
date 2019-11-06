import BaseFieldHOC from './BaseFieldHOC'

import CheckboxInput from './inputs/CheckboxInput'
import NumberInput from './inputs/NumberInput'
import RadiosInput from './inputs/RadiosInput'
import TextInput from './inputs/TextInput'
import TextAreaInput from './inputs/TextAreaInput'
import FileInput from './inputs/FileInput'


const CheckboxField = BaseFieldHOC(CheckboxInput)
const NumberField = BaseFieldHOC(NumberInput)
const RadiosField = BaseFieldHOC(RadiosInput)
const TextField = BaseFieldHOC(TextInput)
const TextAreaField = BaseFieldHOC(TextAreaInput)
const FileInputField = BaseFieldHOC(FileInput)

export {
  CheckboxField,
  NumberField,
  RadiosField,
  TextField,
  TextAreaField,
  FileInputField,
}
