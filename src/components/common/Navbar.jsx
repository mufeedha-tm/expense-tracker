import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import ThemeToggle from './ThemeToggle'
import { Link, useNavigate } from 'react-router-dom'

export default function Navbar() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const user = useSelector(state => state.auth.user)

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  return (
    <nav className="bg-[#1B2A49] dark:bg-[#2C3E50] text-white flex justify-between items-center p-4 shadow-md sticky top-0 z-50">
      {/* Left: App name and links */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-bold">ExpenseTracker</h1>
        <Link to="/dashboard" className="hover:text-[#FFD166] transition-colors">Dashboard</Link>
        <Link to="/expenses" className="hover:text-[#FFD166] transition-colors">Expenses</Link>
        <Link to="/charts" className="hover:text-[#FFD166] transition-colors">Charts</Link>
        <Link to="/contact" className="hover:text-[#FFD166] transition-colors">Contact</Link>
      </div>

      {/* Right: Theme toggle + logout */}
      <div className="flex items-center space-x-4 z-50">
        <ThemeToggle />
        {user && (
          <>
            <span className="hidden md:inline-block">{user.name}</span>
            <button
              onClick={handleLogout}
              className="bg-[#2EC4B6] text-[#1B2A49] px-3 py-1 rounded hover:bg-[#FFD166] transition-colors"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  )
}
