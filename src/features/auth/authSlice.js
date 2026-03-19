import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { isNetworkError, localUsersDb } from '../../utils/localDatabase'

const API_URL = 'http://localhost:3001/users'

export const registerUser = createAsyncThunk('auth/register', async (userData, { rejectWithValue }) => {
  try {
    const { data: existingUsers } = await axios.get(`${API_URL}?email=${userData.email}`)
    if (existingUsers.length > 0) return rejectWithValue('User already exists')
    const { data } = await axios.post(API_URL, userData)
    localStorage.setItem('user', JSON.stringify(data))
    return data
  } catch (error) {
    if (isNetworkError(error)) {
      const existingUsers = localUsersDb.findByEmail(userData.email)
      if (existingUsers.length > 0) return rejectWithValue('User already exists')
      const user = localUsersDb.create(userData)
      localStorage.setItem('user', JSON.stringify(user))
      return user
    }
    return rejectWithValue(error.message)
  }
})

export const loginUser = createAsyncThunk('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const { data } = await axios.get(`${API_URL}?email=${credentials.email}&password=${credentials.password}`)
    if (data.length === 0) return rejectWithValue('Invalid credentials')
    localStorage.setItem('user', JSON.stringify(data[0]))
    return data[0]
  } catch (error) {
    if (isNetworkError(error)) {
      const users = localUsersDb.findByCredentials(credentials.email, credentials.password)
      if (users.length === 0) return rejectWithValue('Invalid credentials')
      localStorage.setItem('user', JSON.stringify(users[0]))
      return users[0]
    }
    return rejectWithValue(error.message)
  }
})

const user = JSON.parse(localStorage.getItem('user'))

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: user || null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null
      localStorage.removeItem('user')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload })
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer

