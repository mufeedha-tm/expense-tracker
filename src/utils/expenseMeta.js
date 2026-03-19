import {
  FiActivity,
  FiBriefcase,
  FiCoffee,
  FiFilm,
  FiHome,
  FiMapPin,
  FiShoppingBag,
} from 'react-icons/fi'

export const expenseCategories = [
  {
    value: 'Food',
    icon: FiCoffee,
    color: '#f59e0b',
    badgeClass: 'bg-amber-100 text-amber-700 dark:bg-amber-500/15 dark:text-amber-300',
    glowClass: 'from-amber-400/30 via-orange-400/15 to-transparent',
  },
  {
    value: 'Transport',
    icon: FiMapPin,
    color: '#38bdf8',
    badgeClass: 'bg-sky-100 text-sky-700 dark:bg-sky-500/15 dark:text-sky-300',
    glowClass: 'from-sky-400/30 via-cyan-400/15 to-transparent',
  },
  {
    value: 'Shopping',
    icon: FiShoppingBag,
    color: '#ec4899',
    badgeClass: 'bg-pink-100 text-pink-700 dark:bg-pink-500/15 dark:text-pink-300',
    glowClass: 'from-pink-400/30 via-rose-400/15 to-transparent',
  },
  {
    value: 'Bills',
    icon: FiHome,
    color: '#8b5cf6',
    badgeClass: 'bg-violet-100 text-violet-700 dark:bg-violet-500/15 dark:text-violet-300',
    glowClass: 'from-violet-400/30 via-purple-400/15 to-transparent',
  },
  {
    value: 'Entertainment',
    icon: FiFilm,
    color: '#f43f5e',
    badgeClass: 'bg-rose-100 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300',
    glowClass: 'from-rose-400/30 via-red-400/15 to-transparent',
  },
  {
    value: 'Work',
    icon: FiBriefcase,
    color: '#22c55e',
    badgeClass: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300',
    glowClass: 'from-emerald-400/30 via-lime-400/15 to-transparent',
  },
  {
    value: 'Other',
    icon: FiActivity,
    color: '#94a3b8',
    badgeClass: 'bg-slate-100 text-slate-700 dark:bg-slate-500/15 dark:text-slate-300',
    glowClass: 'from-slate-400/30 via-slate-300/15 to-transparent',
  },
]

export function getCategoryMeta(category) {
  return expenseCategories.find(item => item.value === category) || expenseCategories.at(-1)
}
