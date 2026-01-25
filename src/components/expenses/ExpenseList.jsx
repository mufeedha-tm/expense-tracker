import { useSelector, useDispatch } from 'react-redux'
import { deleteExpense } from '../../features/expenses/expenseSlice'
import { useState } from 'react'
import EditExpenseModal from './EditExpenseModal'
import { formatINR } from '../../utils/currency'
import { FiEdit, FiTrash2 } from 'react-icons/fi'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

export default function ExpenseList() {
  const expenses = useSelector(state => state.expenses.list)
  const dispatch = useDispatch()
  const [editing, setEditing] = useState(null)

  const handleDelete = (id) => {
    dispatch(deleteExpense(id))
    toast.success('Expense deleted')
  }

  return (
    <div className="bg-[#F5F7FA] dark:bg-[#1A1F2B] p-6 rounded-xl shadow-lg space-y-4">
      <h2 className="text-xl font-bold text-[#1B2A49] dark:text-white">Recent Expenses</h2>
      <div className="overflow-x-auto">
        <table className="w-full table-auto text-left">
          <thead>
            <tr className="border-b border-gray-300 dark:border-gray-700">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Amount</th>
              <th className="px-4 py-2">Category</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((exp, index) => (
              <motion.tr key={exp.id} whileHover={{ scale: 1.02 }} className="border-b border-gray-200 dark:border-gray-700">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">{exp.title}</td>
                <td className="px-4 py-2">{formatINR(exp.amount)}</td>
                <td className="px-4 py-2">{exp.category}</td>
                <td className="px-4 py-2">{exp.date}</td>
                <td className="px-4 py-2 flex space-x-2">
                  <button onClick={() => setEditing(exp)} className="p-1 rounded hover:bg-[#2EC4B6] transition-colors"><FiEdit /></button>
                  <button onClick={() => handleDelete(exp.id)} className="p-1 rounded hover:bg-[#FFD166] transition-colors"><FiTrash2 /></button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      {editing && <EditExpenseModal expense={editing} close={() => setEditing(null)} />}
    </div>
  )
}
