import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom'
import { FiArrowLeft, FiCalendar, FiClock, FiHash, FiTag } from 'react-icons/fi'
import { fetchExpenses } from '../features/expenses/expenseSlice'
import { formatCompactINR, formatINR } from '../utils/currency'
import { getCategoryMeta } from '../utils/expenseMeta'

export default function ExpenseDetailsPage() {
  const dispatch = useDispatch()
  const { expenseId } = useParams()
  const { user } = useSelector(state => state.auth)
  const { list: expenses } = useSelector(state => state.expenses)

  useEffect(() => {
    if (user && expenses.length === 0) {
      dispatch(fetchExpenses(user.id))
    }
  }, [dispatch, expenses.length, user])

  const expense = expenses.find(item => String(item.id) === expenseId)

  if (!expense) {
    return (
      <div className="glass-card p-8 text-center">
        <h1 className="text-3xl font-bold text-slate-950 dark:text-white">Expense not found</h1>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          The transaction may have been deleted or has not loaded yet.
        </p>
        <Link to="/expenses" className="btn-primary mt-6">
          Back to expenses
        </Link>
      </div>
    )
  }

  const category = getCategoryMeta(expense.category)
  const expenseDate = new Date(expense.date)
  const currentMonthTotal = expenses
    .filter(item => {
      const date = new Date(item.date)
      return date.getMonth() === expenseDate.getMonth() && date.getFullYear() === expenseDate.getFullYear()
    })
    .reduce((sum, item) => sum + Number(item.amount), 0)
  const monthShare = currentMonthTotal ? (Number(expense.amount) / currentMonthTotal) * 100 : 0

  return (
    <div className="space-y-8">
      <Link to="/expenses" className="btn-secondary w-fit">
        <FiArrowLeft />
        Back to expenses
      </Link>

      <section className="grid gap-6 xl:grid-cols-[1.08fr_0.92fr]">
        <div className="spotlight-card rounded-[32px] bg-slate-950 p-8 text-white dark:bg-sky-400 dark:text-slate-950">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.3),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.26),transparent_30%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.32),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.16),transparent_28%)]" />
          <div className="relative z-10">
            <div className={`w-fit rounded-[24px] p-4 ${category.badgeClass}`}>
              <category.icon className="text-3xl" />
            </div>

            <p className="section-label mt-6 !text-white/65 dark:!text-slate-950/60">Expense Details</p>
            <h1 className="mt-4 text-4xl font-bold md:text-5xl">{expense.title}</h1>
            <p className="mt-4 max-w-xl text-white/75 dark:text-slate-950/75">
              A focused view for one transaction, including timing, category, and its weight within the month.
            </p>

            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-md dark:border-slate-950/10 dark:bg-slate-950/10">
                <p className="text-sm text-white/70 dark:text-slate-950/70">Amount</p>
                <h2 className="mt-2 text-4xl font-bold">{formatINR(expense.amount)}</h2>
              </div>
              <div className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-md dark:border-slate-950/10 dark:bg-slate-950/10">
                <p className="text-sm text-white/70 dark:text-slate-950/70">Share of month</p>
                <h2 className="mt-2 text-4xl font-bold">{monthShare.toFixed(0)}%</h2>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="glass-card p-6">
            <p className="section-label">Snapshot</p>
            <div className="mt-5 space-y-4 text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiTag /> Category</span>
                <span className="font-semibold text-slate-950 dark:text-white">{expense.category}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiCalendar /> Date</span>
                <span className="font-semibold text-slate-950 dark:text-white">{expenseDate.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiClock /> Month bucket</span>
                <span className="font-semibold text-slate-950 dark:text-white">
                  {expenseDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
                </span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="flex items-center gap-2"><FiHash /> Reference</span>
                <span className="font-semibold text-slate-950 dark:text-white">#{expense.id}</span>
              </div>
            </div>
          </div>

          <div className="glass-card p-6">
            <p className="section-label">Context</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Monthly contribution</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              This expense contributes {monthShare.toFixed(1)}% to the total of {formatCompactINR(currentMonthTotal)} spent during{' '}
              {expenseDate.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}.
            </p>

            <div className="mt-6 h-3 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
              <div
                className="h-full rounded-full bg-sky-500"
                style={{ width: `${Math.min(monthShare, 100)}%` }}
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
