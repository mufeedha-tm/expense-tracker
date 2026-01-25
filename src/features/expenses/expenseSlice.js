import { createSlice } from '@reduxjs/toolkit'
import { v4 as uuid } from 'uuid'

const storedExpenses = JSON.parse(localStorage.getItem('expenses')) || []

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: { list: storedExpenses },
  reducers: {
    addExpense: (state, action) => {
      state.list.push({ id: uuid(), ...action.payload })
      localStorage.setItem('expenses', JSON.stringify(state.list))
    },
    updateExpense: (state, action) => {
      const index = state.list.findIndex(e => e.id === action.payload.id)
      state.list[index] = action.payload
      localStorage.setItem('expenses', JSON.stringify(state.list))
    },
    deleteExpense: (state, action) => {
      state.list = state.list.filter(e => e.id !== action.payload)
      localStorage.setItem('expenses', JSON.stringify(state.list))
    }
  }
})

export const { addExpense, updateExpense, deleteExpense } = expenseSlice.actions
export default expenseSlice.reducer
