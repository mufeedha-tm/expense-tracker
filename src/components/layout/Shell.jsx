import { AnimatePresence, motion } from 'framer-motion'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  FiArrowUpRight,
  FiGrid,
  FiList,
  FiLogOut,
  FiMail,
  FiMoon,
  FiPlus,
  FiSun,
} from 'react-icons/fi'
import { logout } from '../../features/auth/authSlice'
import { toggleTheme } from '../../features/theme/themeSlice'

const menuItems = [
  { icon: FiGrid, label: 'Dashboard', path: '/dashboard' },
  { icon: FiList, label: 'Expenses', path: '/expenses' },
  { icon: FiMail, label: 'Support', path: '/contact' },
]

export default function Shell({ children }) {
  const MotionDiv = motion.div
  const { user } = useSelector(state => state.auth)
  const dark = useSelector(state => state.theme.dark)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation()

  const handleLogout = () => {
    dispatch(logout())
    navigate('/login')
  }

  const isActive = (path) => {
    if (path === '/expenses') return location.pathname.startsWith('/expenses')
    return location.pathname === path
  }

  return (
    <div className="relative min-h-screen">
      <div className="aurora-layer">
        <div className="grid-noise absolute inset-0" />
      </div>

      <div className="relative z-10 flex min-h-screen">
        <aside className="sticky top-0 hidden h-screen w-[18rem] shrink-0 p-5 lg:block">
          <div className="glass-card flex h-full flex-col gap-6 p-6">
            <div className="spotlight-card rounded-[24px] bg-slate-950 px-5 py-5 text-white dark:bg-sky-400 dark:text-slate-950">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/15 text-xl font-bold dark:bg-slate-950/10">
                  X
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.28em] text-white/60 dark:text-slate-950/60">Expense Flow</p>
                  <h1 className="text-2xl font-bold">Tracker</h1>
                </div>
              </div>
              <p className="mt-5 text-sm text-white/75 dark:text-slate-950/75">
                A cinematic workspace for tracking every rupee with clarity, motion, and focus.
              </p>
            </div>

            <nav className="space-y-2">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3 transition-all ${
                    isActive(item.path)
                      ? 'bg-slate-950 text-white shadow-lg shadow-slate-950/20 dark:bg-sky-400 dark:text-slate-950'
                      : 'text-slate-600 hover:bg-white/90 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-900/70 dark:hover:text-white'
                  }`}
                >
                  <span className="flex items-center gap-3 font-medium">
                    <item.icon className="text-lg" />
                    {item.label}
                  </span>
                  <FiArrowUpRight className={`text-sm transition-transform ${isActive(item.path) ? 'translate-x-0' : '-translate-x-1 opacity-40'}`} />
                </Link>
              ))}
            </nav>

            <div className="panel-muted space-y-4">
              <div className="flex items-center justify-between">
                <p className="section-label">Quick Actions</p>
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="btn-secondary !h-11 !w-11 !rounded-2xl !p-0"
                  aria-label="Toggle theme"
                >
                  {dark ? <FiSun /> : <FiMoon />}
                </button>
              </div>

              <Link to="/expenses?new=true" className="btn-primary w-full">
                <FiPlus />
                Add Expense
              </Link>
            </div>

            <div className="mt-auto panel-muted space-y-4">
              <div>
                <p className="text-xs uppercase tracking-[0.24em] text-slate-400">Signed In As</p>
                <h2 className="mt-2 text-lg font-bold text-slate-950 dark:text-white">{user?.name || 'Explorer'}</h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
              </div>

              <button onClick={handleLogout} className="btn-secondary w-full justify-center text-rose-500 dark:text-rose-300">
                <FiLogOut />
                Sign Out
              </button>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="sticky top-0 z-30 px-4 pt-4 md:px-6 lg:px-8">
            <div className="glass-card mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-4 md:px-6">
              <div className="min-w-0">
                <p className="section-label">Welcome Back</p>
                <h2 className="truncate text-xl font-bold text-slate-950 dark:text-white">
                  {user?.name ? `${user.name.split(' ')[0]}'s finance cockpit` : 'Your finance cockpit'}
                </h2>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch(toggleTheme())}
                  className="btn-secondary !h-11 !w-11 !rounded-2xl !p-0"
                  aria-label="Toggle theme"
                >
                  {dark ? <FiSun /> : <FiMoon />}
                </button>

                <Link to="/expenses?new=true" className="btn-primary hidden sm:inline-flex">
                  <FiPlus />
                  Add
                </Link>

                <button onClick={handleLogout} className="btn-secondary" aria-label="Sign out">
                  <FiLogOut />
                  Logout
                </button>
              </div>
            </div>
          </header>

          <main className="flex-1 px-4 pb-28 pt-6 md:px-6 lg:px-8 lg:pb-10">
            <div className="mx-auto max-w-7xl">
              <AnimatePresence mode="wait">
                <MotionDiv
                  key={location.pathname + location.search}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.24, ease: 'easeOut' }}
                >
                  {children}
                </MotionDiv>
              </AnimatePresence>
            </div>
          </main>

          <nav className="fixed bottom-4 left-4 right-4 z-40 lg:hidden">
            <div className="glass-card mx-auto flex max-w-lg items-center justify-around px-3 py-2">
              {menuItems.map(item => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex min-w-[72px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-semibold transition-all ${
                    isActive(item.path)
                      ? 'bg-slate-950 text-white dark:bg-sky-400 dark:text-slate-950'
                      : 'text-slate-500 dark:text-slate-300'
                  }`}
                >
                  <item.icon className="text-lg" />
                  {item.label}
                </Link>
              ))}
              <button
                onClick={handleLogout}
                className="flex min-w-[72px] flex-col items-center gap-1 rounded-2xl px-3 py-2 text-xs font-semibold text-rose-500 transition-all dark:text-rose-300"
              >
                <FiLogOut className="text-lg" />
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
    </div>
  )
}
