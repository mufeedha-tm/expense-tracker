import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { isNetworkError, localExpensesDb } from '../../utils/localDatabase'

const API_URL = 'http://localhost:3001/expenses'

export const fetchExpenses = createAsyncThunk('expenses/fetch', async (userId, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_URL}?userId=${userId}`)
    return data
  } catch (error) {
    if (isNetworkError(error)) {
      return localExpensesDb.listByUser(userId)
    }
    return rejectWithValue(error.message)
  }
})

export const addExpense = createAsyncThunk('expenses/add', async (expenseData, { rejectWithValue }) => {
  try {
    const { data } = await axios.post(API_URL, expenseData)
    return data
  } catch (error) {
    if (isNetworkError(error)) {
      return localExpensesDb.create(expenseData)
    }
    return rejectWithValue(error.message)
  }
})

export const updateExpense = createAsyncThunk('expenses/update', async (expenseData, { rejectWithValue }) => {
  try {
    const { data } = await axios.put(`${API_URL}/${expenseData.id}`, expenseData)
    return data
  } catch (error) {
    if (isNetworkError(error)) {
      return localExpensesDb.update(expenseData)
    }
    return rejectWithValue(error.message)
  }
})

export const deleteExpense = createAsyncThunk('expenses/delete', async (id, { rejectWithValue }) => {
  try {
    await axios.delete(`${API_URL}/${id}`)
    return id
  } catch (error) {
    if (isNetworkError(error)) {
      return localExpensesDb.remove(id)
    }
    return rejectWithValue(error.message)
  }
})

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: { list: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExpenses.pending, (state) => { state.loading = true; state.error = null })
      .addCase(fetchExpenses.fulfilled, (state, action) => { state.loading = false; state.list = action.payload })
      .addCase(fetchExpenses.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(addExpense.fulfilled, (state, action) => { state.list.push(action.payload) })
      .addCase(addExpense.rejected, (state, action) => { state.error = action.payload })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const index = state.list.findIndex(e => e.id === action.payload.id)
        if (index !== -1) state.list[index] = action.payload
      })
      .addCase(updateExpense.rejected, (state, action) => { state.error = action.payload })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e.id !== action.payload)
      })
      .addCase(deleteExpense.rejected, (state, action) => { state.error = action.payload })
  }
})

export default expenseSlice.reducer

