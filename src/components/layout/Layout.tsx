import { Outlet } from 'react-router-dom'
import NavBar from './NavBar'
import CustomCursor from './CustomCursor'
import GlareSweep from './GlareSweep'
import ChatAgent from '../chatbot/ChatAgent'

export default function Layout() {
  return (
    <>
      <GlareSweep />
      <CustomCursor />
      <NavBar />
      <main className="pb-24">
        <Outlet />
      </main>
      <ChatAgent />
    </>
  )
}
