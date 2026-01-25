import Navbar from '../components/common/Navbar'
import ExpenseForm from '../components/expenses/ExpenseForm'
import ExpenseList from '../components/expenses/ExpenseList'
import ExpenseChart from '../components/expenses/ExpenseChart'
import { motion } from 'framer-motion'

export default function ExpensesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1 p-6 space-y-6">
        {/* Top Stats Cards */}
        <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card bg-[#2C3E50] dark:bg-[#1A1F2B] text-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-sm">Total Expenses</h3>
            <p className="text-2xl font-bold">₹12,450</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card bg-[#2C3E50] dark:bg-[#1A1F2B] text-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-sm">Monthly Expenses</h3>
            <p className="text-2xl font-bold">₹5,300</p>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="card bg-[#2C3E50] dark:bg-[#1A1F2B] text-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-sm">Transactions</h3>
            <p className="text-2xl font-bold">45</p>
          </motion.div>
        </motion.div>

        {/* Add Expense Form */}
        <ExpenseForm />

        {/* Expense Charts */}
        <ExpenseChart />

        {/* Recent Expenses */}
        <ExpenseList />
      </main>
    </div>
  )
}
