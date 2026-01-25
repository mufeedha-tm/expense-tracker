import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useNavigate, Link } from 'react-router-dom'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required')
})

export default function Register() {
  const navigate = useNavigate()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers')) || []
    const exists = registeredUsers.some(u => u.email === data.email)
    if (exists) {
      toast.error('Email already registered')
      return
    }
    registeredUsers.push(data)
    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers))
    toast.success('Registration successful')
    navigate('/login')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1B2A49] to-[#2C3E50]">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F5F7FA] dark:bg-[#1A1F2B] p-8 rounded-xl shadow-xl w-full max-w-md space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#1B2A49] dark:text-white">Register</h2>

        <input type="text" {...register('name')} placeholder="Name" className="input" />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input type="email" {...register('email')} placeholder="Email" className="input" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <input type="password" {...register('password')} placeholder="Password" className="input" />
        {errors.password && <p className="error">{errors.password.message}</p>}

        <button type="submit" className="btn-primary w-full py-3 text-lg">Register</button>

        <p className="text-center text-sm text-gray-500 dark:text-gray-300">
          Already have an account? <Link to="/login" className="text-[#2EC4B6] hover:underline">Login</Link>
        </p>
      </form>
    </div>
  )
}
