import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import expenseReducer from '../features/expenses/expenseSlice'
import themeReducer from '../features/theme/themeSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    expenses: expenseReducer,
    theme: themeReducer
  }
})
