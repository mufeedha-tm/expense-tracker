import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiCalendar, FiEdit, FiEye, FiTrash2 } from 'react-icons/fi'
import { deleteExpense } from '../../features/expenses/expenseSlice'
import { formatINR } from '../../utils/currency'
import { getCategoryMeta } from '../../utils/expenseMeta'
import EditExpenseModal from './EditExpenseModal'

export default function ExpenseList({ expenses }) {
  const MotionArticle = motion.article
  const { loading } = useSelector(state => state.expenses)
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(null)

  const handleDelete = async (id) => {
    const result = await dispatch(deleteExpense(id))
    if (deleteExpense.fulfilled.match(result)) {
      toast.success('Expense deleted')
    } else {
      toast.error('Failed to delete expense')
    }
  }

  if (loading && expenses.length === 0) {
    return <div className="panel-muted text-center text-slate-500 dark:text-slate-400">Loading expenses...</div>
  }

  if (expenses.length === 0) {
    return (
      <div className="glass-card p-8 text-center">
        <h3 className="text-2xl font-bold text-slate-950 dark:text-white">No matching expenses</h3>
        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Try changing your search or filters, or add a brand new transaction.
        </p>
      </div>
    )
  }

  return (
    <>
      <div className="grid gap-4">
        <AnimatePresence>
          {expenses.map((expense, index) => {
            const category = getCategoryMeta(expense.category)

            return (
              <MotionArticle
                key={expense.id}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ delay: index * 0.03 }}
                className="glass-card p-5"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex items-start gap-4">
                    <div className={`rounded-[22px] p-4 ${category.badgeClass}`}>
                      <category.icon className="text-2xl" />
                    </div>

                    <div>
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-bold text-slate-950 dark:text-white">{expense.title}</h3>
                        <span className={`category-pill ${category.badgeClass}`}>{expense.category}</span>
                      </div>

                      <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                        <span className="flex items-center gap-2">
                          <FiCalendar />
                          {new Date(expense.date).toLocaleDateString('en-IN', {
                            day: 'numeric',
                            month: 'short',
                            year: 'numeric',
                          })}
                        </span>
                        <span>ID #{expense.id}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center lg:justify-end">
                    <div className="text-left sm:text-right">
                      <p className="text-sm text-slate-500 dark:text-slate-400">Amount</p>
                      <p className="text-2xl font-bold text-slate-950 dark:text-white">{formatINR(expense.amount)}</p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      <Link to={`/expenses/${expense.id}`} className="btn-secondary">
                        <FiEye />
                        View
                      </Link>
                      <button onClick={() => setEditing(expense)} className="btn-secondary">
                        <FiEdit />
                        Edit
                      </button>
                      <button onClick={() => handleDelete(expense.id)} className="btn-secondary text-rose-500 dark:text-rose-300">
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </MotionArticle>
            )
          })}
        </AnimatePresence>
      </div>

      <AnimatePresence>{editing && <EditExpenseModal expense={editing} close={() => setEditing(null)} />}</AnimatePresence>
    </>
  )
}
