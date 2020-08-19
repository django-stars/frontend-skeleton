import { TextField } from 'common/forms'
import styles from './loginForm.scss'

export default function LoginForm({ handleSubmit }) {
  return (
    <div className={styles.loginContainer}>
      <form onSubmit={handleSubmit}>
        <h2>Login</h2>
        <TextField name="email" label="Email" type="email" />
        <TextField name="password" label="Password" type="password" />
        <button className={styles.loginButton}> <i className={styles.keyIcon} /> Login</button>
      </form>
    </div>
  )
}
