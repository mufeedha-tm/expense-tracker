import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { addExpense } from '../../features/expenses/expenseSlice'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  amount: yup
    .number()
    .typeError('Amount must be a number')
    .positive('Amount must be positive')
    .required('Amount is required'),
  category: yup.string().required('Category is required'),
  date: yup.date().typeError('Date is required').required('Date is required'),
})

export default function ExpenseForm() {
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) })

  const onSubmit = (data, e) => {
    e.preventDefault()
    dispatch(addExpense(data))
    toast.success('Expense added successfully')
    reset()
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-[#F5F7FA] dark:bg-[#1A1F2B] p-6 rounded-xl shadow-lg space-y-4"
    >
      <h2 className="text-xl font-bold text-[#1B2A49] dark:text-white">Add Expense</h2>

      <input type="text" placeholder="Title" {...register('title')} className="input" />
      {errors.title && <p className="error">{errors.title.message}</p>}

      <input type="text" placeholder="Amount" {...register('amount')} className="input" />
      {errors.amount && <p className="error">{errors.amount.message}</p>}

      <select {...register('category')} className="input">
        <option value="">Select Category</option>
        <option value="Food">Food</option>
        <option value="Transport">Transport</option>
        <option value="Shopping">Shopping</option>
        <option value="Other">Other</option>
      </select>
      {errors.category && <p className="error">{errors.category.message}</p>}

      <input type="date" {...register('date')} className="input" />
      {errors.date && <p className="error">{errors.date.message}</p>}

      <button type="submit" className="btn-primary">
        Add Expense
      </button>
    </form>
  )
}
