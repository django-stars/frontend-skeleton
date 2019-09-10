import { TextField } from 'common/forms'

export default function Test({ onSubmit }) {
  return (
    <form onSubmit={onSubmit}>
      <TextField name="firstName" />
      <TextField name="lastName" />
      <button type="submit" className="btn btn-defaut">submit to console</button>
    </form>
  )
}
