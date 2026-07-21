import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

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

  return (
    <nav className="sticky top-0 z-40 bg-bg/85 backdrop-blur-md border-b border-panel-border">
      <div className="relative max-w-(--container-w) mx-auto px-8 py-3.5 flex items-center justify-between gap-6">
        <button
          className="font-mono text-[0.95rem] font-bold text-text tracking-tight cursor-pointer"
          onClick={() => {
            navigate('/')
            setOpen(false)
          }}
        >
          dinesh<span className="text-accent">@</span>ops
        </button>

        <span className="hidden lg:inline-flex items-center gap-2 font-mono text-xs text-ok border border-ok/35 bg-ok/10 px-3 py-1.5 rounded-full whitespace-nowrap">
          <span className="w-1.5 h-1.5 rounded-full bg-ok shadow-[0_0_8px_var(--color-ok)]" />
          All systems operational
        </span>

        <button
          className="flex lg:hidden flex-col gap-1 p-1.5 cursor-pointer"
          aria-label="Menu"
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span className="w-5 h-0.5 bg-text" />
          <span className="w-5 h-0.5 bg-text" />
          <span className="w-5 h-0.5 bg-text" />
        </button>

        <ul
          className={`flex items-center gap-6 list-none
            max-lg:absolute max-lg:top-full max-lg:left-0 max-lg:right-0 max-lg:flex-col max-lg:items-start max-lg:gap-0
            max-lg:bg-panel max-lg:border-b max-lg:border-panel-border max-lg:overflow-hidden max-lg:transition-[max-height] max-lg:duration-250
            ${open ? 'max-lg:max-h-[480px]' : 'max-lg:max-h-0'}`}
        >
          {NAV_ITEMS.map((item) => (
            <li key={item.to} className="max-lg:w-full">
              <NavLink
                to={item.to}
                className={({ isActive }) =>
                  `text-sm transition-colors max-lg:block max-lg:w-full max-lg:px-6 max-lg:py-3.5 max-lg:border-t max-lg:border-panel-border ${
                    isActive ? 'text-text' : 'text-dim hover:text-text'
                  }`
                }
                onClick={() => setOpen(false)}
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
