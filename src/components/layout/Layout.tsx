import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import CustomCursor from './CustomCursor'
import GlareSweep from './GlareSweep'

export default function Layout() {
  return (
    <>
      <GlareSweep />
      <CustomCursor />
      <NavBar />
      <main className="pb-24">
        <Outlet />
      </main>
    </>
  )
}
