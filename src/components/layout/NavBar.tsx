import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useScrollGlitch } from '../../hooks/useScrollGlitch'

const NAV_ITEMS = [
  { to: '/about', label: 'About' },
  { to: '/work', label: 'Work' },
  { to: '/skills', label: 'Skills' },
  { to: '/projects', label: 'Projects' },
  { to: '/tree', label: 'Tree' },
  { to: '/timeline', label: 'Journey' },
  { to: '/credentials', label: 'Credentials' },
  { to: '/contact', label: 'Contact' },
]

export default function NavBar() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()
  const glitching = useScrollGlitch()

  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100vw-2rem)] max-w-fit">
      {open && (
        <ul className="lg:hidden absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-56 bg-panel border border-panel-border rounded-2xl overflow-hidden shadow-xl">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block px-5 py-3 text-sm border-t border-panel-border first:border-t-0 ${
                    isActive ? 'text-text bg-panel-hover' : 'text-dim hover:text-text'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      )}

      <div className="flex items-center gap-1 bg-panel/95 backdrop-blur-md border border-panel-border rounded-full pl-4 pr-1.5 py-1.5 shadow-lg">
        <button
          className={`font-mono text-[0.85rem] font-bold text-text tracking-tight cursor-pointer whitespace-nowrap mr-1 ${glitching ? 'glitch-active' : ''}`}
          data-text="dinesh@ops"
          onClick={() => {
            navigate('/')
            setOpen(false)
          }}
        >
          dinesh<span className="text-accent">@</span>ops
        </button>

        <ul className="hidden lg:flex items-center gap-0.5 list-none">
          {NAV_ITEMS.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `block px-3 py-2 rounded-full text-[0.82rem] whitespace-nowrap transition-colors ${
                    isActive ? 'text-text bg-panel-hover' : 'text-dim hover:text-text'
                  } ${glitching ? 'glitch-active' : ''}`
                }
              >
                {item.label}
              </NavLink>
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
