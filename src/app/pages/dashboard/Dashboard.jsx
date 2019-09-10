export default function Dashboard({ logout, text }) {
  return (
    <div>
      <h1>{text}</h1>
      <button onClick={logout}>Logout</button>
    </div>
  )
}
