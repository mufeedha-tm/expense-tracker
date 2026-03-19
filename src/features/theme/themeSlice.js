import { createSlice } from '@reduxjs/toolkit'

const isDark = localStorage.getItem('theme') === 'dark'

const themeSlice = createSlice({
  name: 'theme',
  initialState: { dark: isDark },
  reducers: {
    toggleTheme: (state) => {
      state.dark = !state.dark
      localStorage.setItem('theme', state.dark ? 'dark' : 'light')
      document.documentElement.classList.toggle('dark', state.dark)
    }
  }
})

export const { toggleTheme } = themeSlice.actions
export default themeSlice.reducer
