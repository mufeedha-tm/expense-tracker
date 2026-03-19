import { Outlet } from 'react-router-dom'
import Shell from './Shell'

export default function MainLayout() {
  return (
    <Shell>
      <Outlet />
    </Shell>
  )
}
