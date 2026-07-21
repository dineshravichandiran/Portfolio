import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="container" style={{ padding: '5rem 2rem', textAlign: 'center' }}>
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--crit)' }}>404 · service unreachable</p>
      <h1 style={{ margin: '1rem 0' }}>This route isn't monitored.</h1>
      <Link to="/" style={{ color: 'var(--accent)' }}>← Back to dashboard</Link>
    </div>
  )
}
