import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiArrowRight, FiCompass, FiLock, FiMail, FiTrendingUp } from 'react-icons/fi'
import { loginUser } from '../../features/auth/authSlice'

const schema = yup.object().shape({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

export default function Login() {
  const MotionDiv = motion.div
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { loading } = useSelector(state => state.auth)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = async (data) => {
    const result = await dispatch(loginUser(data))
    if (loginUser.fulfilled.match(result)) {
      toast.success('Welcome back!')
      navigate('/dashboard')
    } else {
      toast.error(result.payload || 'Login failed')
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="aurora-layer">
        <div className="grid-noise absolute inset-0" />
      </div>

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-white/60 bg-white/70 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.4)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/55 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="relative hidden overflow-hidden bg-slate-950 p-10 text-white dark:bg-sky-400 dark:text-slate-950 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.38),transparent_38%),radial-gradient(circle_at_bottom_right,rgba(251,191,36,0.36),transparent_36%)] dark:bg-[radial-gradient(circle_at_top_left,rgba(255,255,255,0.26),transparent_32%),radial-gradient(circle_at_bottom_right,rgba(15,23,42,0.24),transparent_36%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="section-label !text-white/65 dark:!text-slate-950/60">Smart Expense Tracker</p>
              <h1 className="mt-4 max-w-md text-5xl font-bold leading-tight">
                See your money move with confidence.
              </h1>
              <p className="mt-5 max-w-md text-base text-white/75 dark:text-slate-950/75">
                Log in to a dashboard built to make finance feel sharp, fluid, and surprisingly enjoyable.
              </p>
            </div>

            <div className="space-y-4">
              <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md dark:border-slate-950/10 dark:bg-slate-950/10">
                <div className="flex items-center gap-3">
                  <FiTrendingUp className="text-2xl" />
                  <div>
                    <p className="text-sm text-white/70 dark:text-slate-950/70">Live insight</p>
                    <p className="font-semibold">Monthly patterns, category trends, and transaction history in one flow.</p>
                  </div>
                </div>
              </div>
              <div className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md dark:border-slate-950/10 dark:bg-slate-950/10">
                <div className="flex items-center gap-3">
                  <FiCompass className="text-2xl" />
                  <div>
                    <p className="text-sm text-white/70 dark:text-slate-950/70">Designed to guide</p>
                    <p className="font-semibold">Every screen helps you understand where your spending is going next.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <MotionDiv
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-6 sm:p-10"
        >
          <div className="mb-8">
            <p className="section-label">Welcome Back</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-950 dark:text-white">Log In</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Pick up right where you left off and continue tracking your momentum.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiMail className="text-sky-500" /> Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="you@example.com"
                className={`input ${errors.email ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/15' : ''}`}
              />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiLock className="text-sky-500" /> Password
              </label>
              <input
                type="password"
                {...register('password')}
                placeholder="Enter your password"
                className={`input ${errors.password ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/15' : ''}`}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary w-full">
              {loading ? 'Authenticating...' : 'Enter Dashboard'}
              {!loading && <FiArrowRight />}
            </button>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              New here?{' '}
              <Link to="/register" className="font-semibold text-sky-500 transition-colors hover:text-sky-600">
                Create an account
              </Link>
            </p>
          </form>
        </MotionDiv>
      </div>
    </div>
  )
}
