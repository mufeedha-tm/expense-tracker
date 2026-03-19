import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import './App.css'
import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './pages/Dashboard'
import ExpensesPage from './pages/ExpensesPage'
import ExpenseDetailsPage from './pages/ExpenseDetailsPage'
import ContactSupport from './components/support/ContactSupport'
import MainLayout from './components/layout/MainLayout'

// ProtectedRoute wrapper
function ProtectedRoute({ children }) {
  const { user, loading } = useSelector(state => state.auth)
  
  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <>
      <Toaster position="top-right" />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="expenses" element={<ExpensesPage />} />
            <Route path="expenses/:expenseId" element={<ExpenseDetailsPage />} />
            <Route path="contact" element={<ContactSupport />} />
          </Route>

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </>
  )
}
