import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useScrollActive } from '../../hooks/useScrollActive'

const NAV_ITEMS = [
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'tree', label: 'Tree' },
  { id: 'timeline', label: 'Journey' },
  { id: 'credentials', label: 'Credentials' },
  { id: 'contact', label: 'Contact' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState<string | null>(null)
  const navigate = useNavigate()
  const scrolling = useScrollActive()

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -50% 0px', threshold: 0 }
    )
    NAV_ITEMS.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  function goTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    window.history.pushState(null, '', `#${id}`)
    setOpen(false)
  }

  function goHome() {
    navigate('/')
    window.scrollTo({ top: 0, behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-2rem)] max-w-fit">
      {open && (
        <ul className="lg:hidden absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 bg-panel border border-panel-border rounded-2xl overflow-hidden shadow-xl">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(item.id)}
                className={`block w-full text-left px-5 py-3 text-sm border-t border-panel-border first:border-t-0 cursor-pointer ${
                  active === item.id ? 'text-text bg-panel-hover' : 'text-dim hover:text-text'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>
      )}

      <div
        className={`glass-panel ${scrolling ? 'glow-active' : ''} flex items-center gap-1 rounded-full pl-4 pr-1.5 py-1.5 overflow-hidden`}
      >
        <button
          className="font-mono text-[0.85rem] font-bold text-text tracking-tight cursor-pointer whitespace-nowrap mr-1"
          onClick={goHome}
        >
          dinesh<span className="text-accent">@</span>ops
        </button>

        <ul className="hidden lg:flex items-center gap-0.5 list-none">
          {NAV_ITEMS.map((item) => (
            <li key={item.id}>
              <button
                type="button"
                onClick={() => goTo(item.id)}
                className={`block px-3 py-2 rounded-full text-[0.82rem] whitespace-nowrap transition-colors cursor-pointer ${
                  active === item.id ? 'text-text bg-panel-hover' : 'text-dim hover:text-text'
                }`}
              >
                {item.label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="flex lg:hidden items-center justify-center w-9 h-9 rounded-full hover:bg-panel-hover cursor-pointer"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="flex flex-col gap-1">
            <span className="w-4 h-0.5 bg-text" />
            <span className="w-4 h-0.5 bg-text" />
            <span className="w-4 h-0.5 bg-text" />
          </span>
        </button>
      </div>
    </nav>
  )
}
