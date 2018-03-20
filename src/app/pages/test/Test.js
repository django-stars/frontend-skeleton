import { TextField, RadiosField } from 'common/forms'


export default function Test({onSubmit}) {
  return (
    <form onSubmit={onSubmit}>
      <TextField name="firstName" />
      <TextField name="lastName" />
      <RadiosField name="salutation" options={[{label: 'Mrs.', value: 'mrs'}, {label: 'Mr.', value: 'mr'}]}/>
      <button type="submit" className="btn btn-defaut">submit to console</button>
    </form>
  )
}
