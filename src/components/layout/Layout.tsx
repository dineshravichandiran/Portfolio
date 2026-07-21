import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import CustomCursor from './CustomCursor'

export default function Layout() {
  return (
    <>
      <CustomCursor />
      <NavBar />
      <main className="pb-24">
        <Outlet />
      </main>
    </>
  )
}
