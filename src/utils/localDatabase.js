import { v4 as uuid } from 'uuid'

const USERS_KEY = 'expense-tracker-users'
const EXPENSES_KEY = 'expense-tracker-expenses'

function readCollection(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || []
  } catch {
    return []
  }
}

function writeCollection(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
  return value
}

export function isNetworkError(error) {
  return error?.code === 'ERR_NETWORK' || error?.message === 'Network Error'
}

export const localUsersDb = {
  getAll() {
    return readCollection(USERS_KEY)
  },
  findByEmail(email) {
    return this.getAll().filter(user => user.email === email)
  },
  findByCredentials(email, password) {
    return this.getAll().filter(user => user.email === email && user.password === password)
  },
  create(userData) {
    const users = this.getAll()
    const nextUser = { id: uuid(), ...userData }
    writeCollection(USERS_KEY, [...users, nextUser])
    return nextUser
  },
}

export const localExpensesDb = {
  getAll() {
    return readCollection(EXPENSES_KEY)
  },
  listByUser(userId) {
    return this.getAll().filter(expense => String(expense.userId) === String(userId))
  },
  create(expenseData) {
    const expenses = this.getAll()
    const nextExpense = { id: uuid(), ...expenseData }
    writeCollection(EXPENSES_KEY, [...expenses, nextExpense])
    return nextExpense
  },
  update(expenseData) {
    const expenses = this.getAll().map(expense => (
      String(expense.id) === String(expenseData.id) ? expenseData : expense
    ))
    writeCollection(EXPENSES_KEY, expenses)
    return expenseData
  },
  remove(id) {
    const expenses = this.getAll().filter(expense => String(expense.id) !== String(id))
    writeCollection(EXPENSES_KEY, expenses)
    return id
  },
}
