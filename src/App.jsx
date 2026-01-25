import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Toaster } from 'react-hot-toast'

import Login from './components/auth/Login'
import Register from './components/auth/Register'
import Dashboard from './pages/Dashboard'
import ExpensesPage from './pages/ExpensesPage'
import ContactSupport from './components/support/ContactSupport'

// ProtectedRoute wrapper
function ProtectedRoute({ children }) {
  const user = useSelector(state => state.auth.user)
  return user ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <>
      <Toaster />
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard redirects to /expenses */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />

          {/* Expenses Page */}
          <Route
            path="/expenses"
            element={
              <ProtectedRoute>
                <ExpensesPage />
              </ProtectedRoute>
            }
          />

          {/* Contact Support */}
          <Route
            path="/contact"
            element={
              <ProtectedRoute>
                <ContactSupport />
              </ProtectedRoute>
            }
          />
        </Routes>
      </Router>
    </>
  )
}
