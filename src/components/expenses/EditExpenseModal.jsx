import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiCalendar, FiDollarSign, FiTag, FiType, FiX } from 'react-icons/fi'
import { updateExpense } from '../../features/expenses/expenseSlice'
import { expenseCategories } from '../../utils/expenseMeta'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  category: yup.string().required('Category is required'),
  date: yup.string().required('Date is required'),
})

export default function EditExpenseModal({ expense, close }) {
  const MotionDiv = motion.div
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...expense,
      date: expense.date ? new Date(expense.date).toISOString().split('T')[0] : '',
    },
  })

  const onSubmit = async (data) => {
    const result = await dispatch(updateExpense({ ...expense, ...data, amount: Number(data.amount) }))
    if (updateExpense.fulfilled.match(result)) {
      toast.success('Expense updated')
      close()
    } else {
      toast.error('Failed to update expense')
    }
  }

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/40 p-4 backdrop-blur-md">
      <MotionDiv
        initial={{ opacity: 0, scale: 0.94, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        className="glass-card w-full max-w-2xl p-8"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="section-label">Update Transaction</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Edit expense</h2>
          </div>
          <button onClick={close} className="btn-secondary !h-11 !w-11 !rounded-2xl !p-0" aria-label="Close">
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiType className="text-sky-500" /> Expense title
              </label>
              <input type="text" {...register('title')} className="input" />
              {errors.title && <p className="error">{errors.title.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiDollarSign className="text-sky-500" /> Amount
              </label>
              <input type="number" step="0.01" {...register('amount')} className="input" />
              {errors.amount && <p className="error">{errors.amount.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiCalendar className="text-sky-500" /> Date
              </label>
              <input type="date" {...register('date')} className="input" />
              {errors.date && <p className="error">{errors.date.message}</p>}
            </div>

            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiTag className="text-sky-500" /> Category
              </label>
              <select {...register('category')} className="input">
                <option value="">Select Category</option>
                {expenseCategories.map(category => (
                  <option key={category.value} value={category.value}>
                    {category.value}
                  </option>
                ))}
              </select>
              {errors.category && <p className="error">{errors.category.message}</p>}
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button type="button" onClick={close} className="btn-secondary flex-1">
              Cancel
            </button>
            <button type="submit" disabled={isSubmitting} className="btn-primary flex-1">
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </MotionDiv>
    </div>
  )
}
