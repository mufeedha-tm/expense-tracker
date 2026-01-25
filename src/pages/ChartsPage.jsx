import Navbar from '../components/common/Navbar'
import ExpenseChart from '../components/expenses/ExpenseChart'
import { useSelector } from 'react-redux'

export default function ChartsPage() {
  const expenses = useSelector(state => state.expenses.list)

  const totalExpenses = expenses.reduce((sum, e) => sum + Number(e.amount), 0)
  const currentMonth = new Date().getMonth()
  const monthlyExpenses = expenses
    .filter(e => new Date(e.date).getMonth() === currentMonth)
    .reduce((sum, e) => sum + Number(e.amount), 0)
  const transactions = expenses.length

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Navbar />

      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="card bg-[#2C3E50] dark:bg-[#1A1F2B] text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm">Total Expenses</h3>
            <p className="text-2xl font-bold">₹{totalExpenses}</p>
          </div>
          <div className="card bg-[#2C3E50] dark:bg-[#1A1F2B] text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm">Monthly Expenses</h3>
            <p className="text-2xl font-bold">₹{monthlyExpenses}</p>
          </div>
          <div className="card bg-[#2C3E50] dark:bg-[#1A1F2B] text-white p-6 rounded-xl shadow-lg">
            <h3 className="text-sm">Transactions</h3>
            <p className="text-2xl font-bold">{transactions}</p>
          </div>
        </div>

        <ExpenseChart />
      </main>
    </div>
  )
}
