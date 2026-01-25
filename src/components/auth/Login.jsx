import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch } from 'react-redux'
import { login } from '../../features/auth/authSlice'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required')
})

export default function Login() {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || []
    const user = registeredUsers.find(u => u.email === data.email && u.password === data.password)
    if (user) {
      dispatch(login(user))
      toast.success('Login successful')
      navigate('/dashboard')
    } else {
      toast.error('Invalid credentials or user not registered')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1B2A49] to-[#2C3E50]">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F5F7FA] dark:bg-[#1A1F2B] p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#1B2A49] dark:text-white">Login</h2>

        <input type="email" {...register('email')} placeholder="Email" className="input" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input type="password" {...register('password')} placeholder="Password" className="input" />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit" className="btn-primary w-full py-3 text-lg">Login</button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-300">
          Don't have an account? <Link to="/register" className="text-[#2EC4B6] hover:underline">Register</Link>
        </p>
      </form>
    </div>
  )
}
