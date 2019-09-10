import { TextField } from 'common/forms'

export default function LoginForm({ handleSubmit, onSubmit }) {
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h2>Login</h2>
      <TextField name="email" label="Email" type="email" />
      <TextField name="password" label="Password" type="password" />
      <button>Login</button>
    </form>
  )
}
