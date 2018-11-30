import { Link } from 'react-router-dom'

// TODO make it pretty
export default function NotFound(props) {
  return (
    <main style={{ textAlign: 'center' }}>
      <div style={{ fontSize: '20em' }}>.404</div>
      <div>
        The page you are trying to reach does not exist, or has been moved.
        <Link className="link" to="/">Go to homepage</Link>
      </div>
    </main>
  )
}
