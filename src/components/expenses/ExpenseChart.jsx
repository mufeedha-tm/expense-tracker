import { useSelector } from 'react-redux'
import { Pie, Bar } from 'react-chartjs-2'
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement)

export default function ExpenseChart() {
  const expenses = useSelector(state => state.expenses.list)

  const categories = ['Food','Transport','Shopping','Other']
  const categoryData = categories.map(cat => expenses.filter(e => e.category === cat).reduce((a,b)=>a+Number(b.amount),0))

  const months = [...new Set(expenses.map(e => new Date(e.date).toLocaleString('default', { month: 'short' })))]
  const monthlyData = months.map(m => expenses.filter(e => new Date(e.date).toLocaleString('default', { month: 'short' }) === m).reduce((a,b)=>a+Number(b.amount),0))

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-[#2EC4B6] dark:bg-[#FFD166] p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-[#1B2A49] dark:text-[#1B2A49]">Expenses by Category</h3>
        <Pie data={{
          labels: categories,
          datasets: [{
            label: 'Amount',
            data: categoryData,
            backgroundColor: ['#2EC4B6','#FFD166','#FF6B6B','#4D96FF'],
            borderWidth: 1
          }]
        }} />
      </div>

      <div className="bg-[#2EC4B6] dark:bg-[#FFD166] p-6 rounded-xl shadow-lg">
        <h3 className="text-xl font-bold mb-4 text-[#1B2A49] dark:text-[#1B2A49]">Monthly Expenses</h3>
        <Bar data={{
          labels: months,
          datasets: [{
            label: 'Amount',
            data: monthlyData,
            backgroundColor: '#1B2A49'
          }]
        }} />
      </div>
    </div>
  )
}
