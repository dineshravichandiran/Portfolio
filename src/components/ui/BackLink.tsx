import { Link } from 'react-router-dom'

export default function BackLink() {
  return (
    <Link
      to="/"
      className="inline-flex items-center gap-1.5 font-mono text-sm text-dim hover:text-accent transition-colors"
    >
      ← Dashboard
    </Link>
  )
}
