import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  FiActivity,
  FiArrowRight,
  FiClock,
  FiLayers,
  FiTarget,
  FiTrendingUp,
} from 'react-icons/fi'
import ExpenseChart from '../components/expenses/ExpenseChart'
import { fetchExpenses } from '../features/expenses/expenseSlice'
import { formatCompactINR, formatINR } from '../utils/currency'
import { getDashboardSummary } from '../utils/expenseInsights'
import { getCategoryMeta } from '../utils/expenseMeta'

export default function Dashboard() {
  const MotionDiv = motion.div
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const { list: expenses, loading } = useSelector(state => state.expenses)

  useEffect(() => {
    if (user) {
      dispatch(fetchExpenses(user.id))
    }
  }, [dispatch, user])

  const summary = getDashboardSummary(expenses)
  const peakDay = summary.dailyTotals.reduce(
    (top, current) => (current.total > top.total ? current : top),
    { label: 'None', total: 0 }
  )

  const stats = [
    {
      label: 'Total Spent',
      value: formatCompactINR(summary.totalSpent),
      detail: `${expenses.length} transactions captured`,
      icon: FiTrendingUp,
    },
    {
      label: 'This Month',
      value: formatCompactINR(summary.monthTotal),
      detail: `${summary.monthlyChange >= 0 ? '+' : ''}${summary.monthlyChange.toFixed(0)}% vs last month`,
      icon: FiTarget,
    },
    {
      label: 'Average Spend',
      value: formatCompactINR(summary.averageExpense),
      detail: 'A clean read on your typical outflow',
      icon: FiActivity,
    },
    {
      label: 'Top Category',
      value: summary.topCategory.category,
      detail: formatINR(summary.topCategory.total),
      icon: FiLayers,
    },
  ]

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[1.35fr_0.85fr]">
        <MotionDiv
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="spotlight-card overflow-hidden rounded-[32px] bg-slate-950 p-8 text-white shadow-[0_30px_90px_-32px_rgba(15,23,42,0.55)] dark:bg-sky-400 dark:text-slate-950"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.3),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.32),transparent_32%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.35),transparent_28%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.18),transparent_32%)]" />
          <div className="relative z-10">
            <p className="section-label !text-white/65 dark:!text-slate-950/60">Overview</p>
            <h1 className="mt-4 max-w-xl text-4xl font-bold md:text-5xl">
              Welcome back, {user?.name?.split(' ')[0] || 'there'}.
            </h1>
            <p className="mt-4 max-w-2xl text-base text-white/75 dark:text-slate-950/75">
              Track every purchase, spot trends instantly, and keep your money story feeling clear and in control.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/expenses?new=true" className="btn-secondary border-white/10 bg-white/10 text-white hover:bg-white/15 dark:border-slate-950/10 dark:bg-slate-950/10 dark:text-slate-950 dark:hover:bg-slate-950/15">
                Add Expense
                <FiArrowRight />
              </Link>
              <Link to="/expenses" className="btn-secondary border-white/10 bg-transparent text-white hover:bg-white/10 dark:border-slate-950/10 dark:text-slate-950 dark:hover:bg-slate-950/10">
                Explore Transactions
              </Link>
            </div>
          </div>
        </MotionDiv>

        <div className="grid gap-4">
          <div className="glass-card p-6">
            <p className="section-label">Today&apos;s pulse</p>
            <div className="mt-4 flex items-end justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Strongest spend day this week</p>
                <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">{peakDay.label}</h2>
              </div>
              <div className="rounded-2xl bg-amber-400/15 p-3 text-amber-500">
                <FiClock className="text-2xl" />
              </div>
            </div>
            <p className="mt-5 text-lg font-semibold text-slate-950 dark:text-white">{formatINR(peakDay.total)}</p>
          </div>

          <div className="glass-card p-6">
            <p className="section-label">Fast insight</p>
            <div className="mt-4 flex items-start gap-4">
              <div className={`rounded-2xl bg-gradient-to-br ${summary.topCategory.glowClass} p-3`}>
                <summary.topCategory.icon className="text-2xl text-slate-950 dark:text-white" />
              </div>
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">Most active category</p>
                <h2 className="mt-1 text-2xl font-bold text-slate-950 dark:text-white">{summary.topCategory.category}</h2>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  {summary.topCategory.total ? `${formatINR(summary.topCategory.total)} spent here so far.` : 'Add your first expense to unlock insights.'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <MotionDiv
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06 }}
            className="stat-card"
          >
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-sm text-slate-500 dark:text-slate-400">{stat.label}</p>
                <h3 className="mt-3 text-3xl font-bold text-slate-950 dark:text-white">
                  {loading ? '...' : stat.value}
                </h3>
                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{stat.detail}</p>
              </div>
              <div className="rounded-2xl bg-slate-950/5 p-3 text-slate-700 dark:bg-white/10 dark:text-white">
                <stat.icon className="text-2xl" />
              </div>
            </div>
          </MotionDiv>
        ))}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <ExpenseChart />

        <div className="glass-card p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <p className="section-label">Recent Flow</p>
              <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Latest transactions</h2>
            </div>
            <Link to="/expenses" className="text-sm font-semibold text-sky-500 transition-colors hover:text-sky-600">
              View all
            </Link>
          </div>

          <div className="mt-6 space-y-3">
            {summary.recentExpenses.length === 0 && (
              <div className="panel-muted text-center text-sm text-slate-500 dark:text-slate-400">
                Add your first expense to populate this activity feed.
              </div>
            )}

            {summary.recentExpenses.map(expense => {
              const category = getCategoryMeta(expense.category)

              return (
                <Link
                  key={expense.id}
                  to={`/expenses/${expense.id}`}
                  className="panel-muted flex items-center justify-between gap-4 transition-all hover:-translate-y-0.5 hover:border-slate-300 dark:hover:border-white/20"
                >
                  <div className="flex items-center gap-4">
                    <div className={`rounded-2xl p-3 ${category.badgeClass}`}>
                      <category.icon className="text-xl" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-950 dark:text-white">{expense.title}</h3>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {expense.category} • {new Date(expense.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-slate-950 dark:text-white">{formatINR(expense.amount)}</p>
                    <p className="text-sm text-slate-500 dark:text-slate-400">Tap for details</p>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}
