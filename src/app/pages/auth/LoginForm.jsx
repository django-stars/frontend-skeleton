import { TextField } from 'common/forms'
import classNames from './styles.scss'

export default function LoginForm({ handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <TextField name="email" label="Email" type="email" />
      <TextField name="password" label="Password" type="password" />
      <button className={classNames.btn}>Login</button>
    </form>
  )
}
