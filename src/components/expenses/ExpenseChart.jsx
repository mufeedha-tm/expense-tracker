import { useSelector } from 'react-redux'
import { Bar, Doughnut } from 'react-chartjs-2'
import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  Legend,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
} from 'chart.js'
import { formatCompactINR, formatINR } from '../../utils/currency'
import { getDashboardSummary } from '../../utils/expenseInsights'

ChartJS.register(
  ArcElement,
  BarElement,
  CategoryScale,
  Filler,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
)

export default function ExpenseChart() {
  const { list: expenses } = useSelector(state => state.expenses)
  const summary = getDashboardSummary(expenses)
  const categories = summary.categoryTotals.slice(0, 5)
  const monthly = summary.monthlyTotals

  if (expenses.length === 0) {
    return (
      <div className="glass-card p-6">
        <p className="section-label">Visual analytics</p>
        <div className="panel-muted mt-6 text-center text-sm text-slate-500 dark:text-slate-400">
          Your charts will appear here after you add some expenses.
        </div>
      </div>
    )
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
      <div className="glass-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-label">Category Mix</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Where your money goes</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Top categories</p>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="mx-auto h-[260px] w-full max-w-[260px]">
            <Doughnut
              data={{
                labels: categories.map(item => item.category),
                datasets: [
                  {
                    data: categories.map(item => item.total),
                    backgroundColor: categories.map(item => item.color),
                    borderWidth: 0,
                    hoverOffset: 10,
                  },
                ],
              }}
              options={{
                maintainAspectRatio: false,
                cutout: '68%',
                plugins: {
                  legend: { display: false },
                  tooltip: {
                    callbacks: {
                      label: (context) => `${context.label}: ${formatINR(context.raw)}`,
                    },
                  },
                },
              }}
            />
          </div>

          <div className="space-y-3">
            {categories.map(item => (
              <div key={item.category} className="panel-muted">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`rounded-2xl p-3 ${item.badgeClass}`}>
                      <item.icon className="text-lg" />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">{item.category}</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {((item.total / Math.max(summary.totalSpent, 1)) * 100).toFixed(0)}% of total spend
                      </p>
                    </div>
                  </div>
                  <p className="font-semibold text-slate-950 dark:text-white">{formatCompactINR(item.total)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="glass-card p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="section-label">Year View</p>
            <h2 className="mt-2 text-2xl font-bold text-slate-950 dark:text-white">Monthly spending rhythm</h2>
          </div>
          <p className="text-sm text-slate-500 dark:text-slate-400">This calendar year</p>
        </div>

        <div className="mt-8 h-[320px]">
          <Bar
            data={{
              labels: monthly.map(item => item.label),
              datasets: [
                {
                  label: 'Expenses',
                  data: monthly.map(item => item.total),
                  backgroundColor: monthly.map((item, index) => index === new Date().getMonth() ? '#38bdf8' : '#0f172a'),
                  borderRadius: 18,
                  borderSkipped: false,
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
                tooltip: {
                  callbacks: {
                    label: (context) => ` ${formatINR(context.raw)}`,
                  },
                },
              },
              scales: {
                y: {
                  border: { display: false },
                  grid: { color: 'rgba(148,163,184,0.14)' },
                  ticks: {
                    callback: value => formatCompactINR(Number(value)),
                  },
                },
                x: {
                  border: { display: false },
                  grid: { display: false },
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  )
}
