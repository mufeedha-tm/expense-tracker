import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import toast from 'react-hot-toast'
import { FiCalendar, FiDollarSign, FiTag, FiType } from 'react-icons/fi'
import { addExpense } from '../../features/expenses/expenseSlice'
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

export default function ExpenseForm({ onSuccess }) {
  const dispatch = useDispatch()
  const { user } = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      date: new Date().toISOString().split('T')[0],
    },
  })

  const onSubmit = async (data) => {
    const expenseData = {
      ...data,
      userId: user.id,
      amount: Number(data.amount),
    }

    const result = await dispatch(addExpense(expenseData))
    if (addExpense.fulfilled.match(result)) {
      toast.success('Expense recorded')
      reset({
        title: '',
        amount: '',
        category: '',
        date: new Date().toISOString().split('T')[0],
      })
      if (onSuccess) onSuccess()
    } else {
      toast.error('Failed to save expense')
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div className="grid gap-5 md:grid-cols-2">
        <div className="space-y-2 md:col-span-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <FiType className="text-sky-500" /> Expense title
          </label>
          <input type="text" placeholder="Groceries, Rent, Uber ride..." {...register('title')} className="input" />
          {errors.title && <p className="error">{errors.title.message}</p>}
        </div>

        <div className="space-y-2">
          <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
            <FiDollarSign className="text-sky-500" /> Amount
          </label>
          <input type="number" step="0.01" placeholder="0.00" {...register('amount')} className="input" />
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

      <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
        {isSubmitting ? 'Saving...' : 'Record Expense'}
      </button>
    </form>
  )
}
