import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AnimatePresence, motion } from 'framer-motion'
import { useSearchParams } from 'react-router-dom'
import { FiFilter, FiPlus, FiSearch, FiX } from 'react-icons/fi'
import ExpenseForm from '../components/expenses/ExpenseForm'
import ExpenseList from '../components/expenses/ExpenseList'
import { fetchExpenses } from '../features/expenses/expenseSlice'
import { formatCompactINR } from '../utils/currency'
import { expenseCategories } from '../utils/expenseMeta'

export default function ExpensesPage() {
  const MotionDiv = motion.div
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { list: expenses } = useSelector(state => state.expenses)
  const [searchParams, setSearchParams] = useSearchParams()
  const [isFormOpen, setIsFormOpen] = useState(searchParams.get('new') === 'true')
  const [searchTerm, setSearchTerm] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('All')

  useEffect(() => {
    if (user) dispatch(fetchExpenses(user.id))
  }, [dispatch, user])

  useEffect(() => {
    setIsFormOpen(searchParams.get('new') === 'true')
  }, [searchParams])

  const filteredExpenses = [...expenses]
    .filter(expense => {
      const searchValue = searchTerm.trim().toLowerCase()
      const searchableParts = [
        expense.title,
        expense.category,
        String(expense.amount),
        new Date(expense.date).toLocaleDateString('en-IN'),
        new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      ].filter(Boolean)
      const matchesSearch = searchValue === '' || searchableParts.some(value => value.toLowerCase().includes(searchValue))
      const matchesCategory = categoryFilter === 'All' || expense.category === categoryFilter
      return matchesSearch && matchesCategory
    })
    .sort((a, b) => new Date(b.date) - new Date(a.date))

  const visibleTotal = filteredExpenses.reduce((sum, expense) => sum + Number(expense.amount), 0)

  const openForm = () => {
    setSearchParams({ new: 'true' })
  }

  const closeForm = () => {
    setIsFormOpen(false)
    setSearchParams({})
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.12fr_0.88fr]">
        <div className="spotlight-card rounded-[32px] bg-slate-950 p-8 text-white dark:bg-sky-400 dark:text-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.3),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.26),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.32),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.16),transparent_28%)]" />
          <div className="relative z-10">
            <p className="section-label !text-white/65 dark:!text-slate-950/60">Expense Manager</p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">Every transaction, styled and searchable.</h1>
            <p className="mt-4 max-w-2xl text-white/75 dark:text-slate-950/75">
              Add, update, filter, and inspect every spend from one polished command center.
            </p>

            <button onClick={openForm} className="btn-secondary mt-8 border-white/10 bg-white/10 text-white hover:bg-white/15 dark:border-slate-950/10 dark:bg-slate-950/10 dark:text-slate-950 dark:hover:bg-slate-950/15">
              <FiPlus />
              Add New Expense
            </button>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-3 xl:grid-cols-1">
          <div className="glass-card p-6">
            <p className="section-label">Visible Entries</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{filteredExpenses.length}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Transactions matching current filters</p>
          </div>

          <div className="glass-card p-6">
            <p className="section-label">Visible Spend</p>
            <h2 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">{formatCompactINR(visibleTotal)}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Total amount in your current view</p>
          </div>

          <div className="glass-card p-6">
            <p className="section-label">Filter Status</p>
            <h2 className="mt-3 text-2xl font-bold text-slate-950 dark:text-white">{categoryFilter}</h2>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">Category currently in focus</p>
          </div>
        </div>
      </section>

      <section className="glass-card p-6">
        <div className="grid gap-4 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <FiSearch className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by title, category, amount, or date..."
              className="input pl-12"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm('')}
                className="absolute right-3 top-1/2 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-xl text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                aria-label="Clear search"
              >
                <FiX />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
            <FiFilter />
            Filter by category
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            onClick={() => setCategoryFilter('All')}
            className={`category-pill ${
              categoryFilter === 'All'
                ? 'bg-slate-950 text-white dark:bg-sky-400 dark:text-slate-950'
                : 'border border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300'
            }`}
          >
            All
          </button>

          {expenseCategories.filter(category => category.value !== 'Other' || expenses.some(expense => expense.category === 'Other')).map(category => (
            <button
              key={category.value}
              onClick={() => setCategoryFilter(category.value)}
              className={`category-pill ${
                categoryFilter === category.value
                  ? category.badgeClass
                  : 'border border-slate-200 bg-white text-slate-600 dark:border-white/10 dark:bg-slate-900/50 dark:text-slate-300'
              }`}
            >
              <category.icon />
              {category.value}
            </button>
          ))}
        </div>
      </section>

      <ExpenseList expenses={filteredExpenses} />

      <AnimatePresence>
        {isFormOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md">
            <MotionDiv
              initial={{ opacity: 0, scale: 0.94, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 12 }}
              className="glass-card w-full max-w-2xl p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="section-label">Create Transaction</p>
                  <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Add an expense</h2>
                </div>
                <button onClick={closeForm} className="btn-secondary !h-11 !w-11 !rounded-2xl !p-0" aria-label="Close">
                  <FiX />
                </button>
              </div>

              <div className="mt-8">
                <ExpenseForm onSuccess={closeForm} />
              </div>
            </MotionDiv>
          </div>
        )}
      </AnimatePresence>
    </div>
  )
}
