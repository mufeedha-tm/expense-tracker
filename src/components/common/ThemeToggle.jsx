import { useDispatch, useSelector } from 'react-redux'
import { toggleTheme } from '../../features/theme/themeSlice'
import { FiSun, FiMoon } from 'react-icons/fi'

export default function ThemeToggle() {
  const dispatch = useDispatch()
  const dark = useSelector(state => state.theme.dark)

  return (
    <button onClick={() => dispatch(toggleTheme())} className="p-2 rounded bg-[#2EC4B6] dark:bg-[#FFD166] text-[#1B2A49] hover:scale-105 transition-transform">
      {dark ? <FiSun /> : <FiMoon />}
    </button>
  )
}
