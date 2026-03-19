import { getCategoryMeta } from './expenseMeta'

function normalizeAmount(amount) {
  return Number(amount) || 0
}

export function sortExpensesByDate(expenses) {
  return [...expenses].sort((a, b) => new Date(b.date) - new Date(a.date))
}

export function getCategoryTotals(expenses) {
  const grouped = expenses.reduce((acc, expense) => {
    const key = expense.category || 'Other'
    acc[key] = (acc[key] || 0) + normalizeAmount(expense.amount)
    return acc
  }, {})

  return Object.entries(grouped)
    .map(([category, total]) => ({
      category,
      total,
      ...getCategoryMeta(category),
    }))
    .sort((a, b) => b.total - a.total)
}

export function getMonthlyTotals(expenses) {
  const now = new Date()
  const year = now.getFullYear()
  const formatter = new Intl.DateTimeFormat('en', { month: 'short' })

  return Array.from({ length: 12 }, (_, index) => {
    const monthDate = new Date(year, index, 1)
    const total = expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.getFullYear() === year && expenseDate.getMonth() === index
      })
      .reduce((sum, expense) => sum + normalizeAmount(expense.amount), 0)

    return {
      label: formatter.format(monthDate),
      total,
    }
  })
}

export function getDailyTotals(expenses, days = 7) {
  const today = new Date()

  return Array.from({ length: days }, (_, offset) => {
    const date = new Date(today)
    date.setDate(today.getDate() - (days - offset - 1))
    const label = date.toLocaleDateString('en', { weekday: 'short' })
    const total = expenses
      .filter(expense => {
        const expenseDate = new Date(expense.date)
        return expenseDate.toDateString() === date.toDateString()
      })
      .reduce((sum, expense) => sum + normalizeAmount(expense.amount), 0)

    return {
      label,
      total,
    }
  })
}

export function getDashboardSummary(expenses) {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()
  const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1
  const previousMonthYear = currentMonth === 0 ? currentYear - 1 : currentYear

  const totalSpent = expenses.reduce((sum, expense) => sum + normalizeAmount(expense.amount), 0)
  const currentMonthExpenses = expenses.filter(expense => {
    const date = new Date(expense.date)
    return date.getMonth() === currentMonth && date.getFullYear() === currentYear
  })
  const previousMonthExpenses = expenses.filter(expense => {
    const date = new Date(expense.date)
    return date.getMonth() === previousMonth && date.getFullYear() === previousMonthYear
  })
  const monthTotal = currentMonthExpenses.reduce((sum, expense) => sum + normalizeAmount(expense.amount), 0)
  const previousMonthTotal = previousMonthExpenses.reduce((sum, expense) => sum + normalizeAmount(expense.amount), 0)
  const averageExpense = expenses.length ? totalSpent / expenses.length : 0
  const categoryTotals = getCategoryTotals(expenses)
  const topCategory = categoryTotals[0] || {
    category: 'No category yet',
    total: 0,
    ...getCategoryMeta('Other'),
  }
  const biggestExpense = sortExpensesByDate(expenses)[0] || null
  const monthlyChange = previousMonthTotal
    ? ((monthTotal - previousMonthTotal) / previousMonthTotal) * 100
    : monthTotal > 0
      ? 100
      : 0

  return {
    totalSpent,
    monthTotal,
    previousMonthTotal,
    averageExpense,
    monthlyChange,
    topCategory,
    categoryTotals,
    biggestExpense,
    recentExpenses: sortExpensesByDate(expenses).slice(0, 5),
    dailyTotals: getDailyTotals(expenses),
    monthlyTotals: getMonthlyTotals(expenses),
  }
}
