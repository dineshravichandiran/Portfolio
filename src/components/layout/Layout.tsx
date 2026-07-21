import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import CometCursor from './CometCursor'

export default function Layout() {
  return (
    <>
      <CometCursor />
      <NavBar />
      <main className="pb-24">
        <Outlet />
      </main>
    </>
  )
}
