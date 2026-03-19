import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { FiArrowRight, FiLayers, FiLock, FiMail, FiShield, FiUser } from 'react-icons/fi'
import { registerUser } from '../../features/auth/authSlice'

const schema = yup.object().shape({
  name: yup.string().required('Full name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
})

export default function Register() {
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
    const result = await dispatch(registerUser(data))
    if (registerUser.fulfilled.match(result)) {
      toast.success('Account created successfully!')
      navigate('/dashboard')
    } else {
      toast.error(result.payload || 'Registration failed')
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-8">
      <div className="aurora-layer">
        <div className="grid-noise absolute inset-0" />
      </div>

      <div className="relative z-10 grid w-full max-w-6xl overflow-hidden rounded-[36px] border border-white/60 bg-white/70 shadow-[0_40px_120px_-40px_rgba(15,23,42,0.4)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/55 lg:grid-cols-[0.96fr_1.04fr]">
        <MotionDiv
          initial={{ opacity: 0, x: -24 }}
          animate={{ opacity: 1, x: 0 }}
          className="p-6 sm:p-10"
        >
          <div className="mb-8">
            <p className="section-label">Create Your Space</p>
            <h2 className="mt-3 text-4xl font-bold text-slate-950 dark:text-white">Join Expense Flow</h2>
            <p className="mt-3 text-slate-500 dark:text-slate-400">
              Build a polished, personal finance workspace in under a minute.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiUser className="text-sky-500" /> Full Name
              </label>
              <input
                type="text"
                {...register('name')}
                placeholder="Atleast 2 characters"
                className={`input ${errors.name ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/15' : ''}`}
              />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiMail className="text-sky-500" /> Email Address
              </label>
              <input
                type="email"
                {...register('email')}
                placeholder="user@example.com"
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
                placeholder="At least 6 characters"
                className={`input ${errors.password ? 'border-rose-500 focus:border-rose-500 focus:ring-rose-500/15' : ''}`}
              />
              {errors.password && <p className="error">{errors.password.message}</p>}
            </div>

            <button type="submit" disabled={loading} className="btn-primary mt-2 w-full">
              {loading ? 'Creating account...' : 'Create Account'}
              {!loading && <FiArrowRight />}
            </button>

            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              Already have an account?{' '}
              <Link to="/login" className="font-semibold text-sky-500 transition-colors hover:text-sky-600">
                Log in
              </Link>
            </p>
          </form>
        </MotionDiv>

        <div className="relative hidden overflow-hidden bg-[linear-gradient(160deg,#082032_0%,#0f172a_50%,#111827_100%)] p-10 text-white dark:bg-[linear-gradient(160deg,#38bdf8_0%,#0ea5e9_100%)] dark:text-slate-950 lg:block">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.12),transparent_24%),radial-gradient(circle_at_82%_80%,rgba(251,191,36,0.18),transparent_28%)] dark:bg-[radial-gradient(circle_at_18%_18%,rgba(255,255,255,0.34),transparent_24%),radial-gradient(circle_at_82%_80%,rgba(15,23,42,0.16),transparent_30%)]" />
          <div className="relative z-10 flex h-full flex-col justify-between">
            <div>
              <p className="section-label !text-white/65 dark:!text-slate-950/60">Why people love it</p>
              <h2 className="mt-4 max-w-md text-5xl font-bold leading-tight">
                Designed to feel premium from the first click.
              </h2>
            </div>

            <div className="space-y-4">
              {[
                {
                  icon: FiLayers,
                  title: 'Clean structure',
                  text: 'Authentication, routing, CRUD, and analytics are already woven into the flow.',
                },
                {
                  icon: FiShield,
                  title: 'Protected experience',
                  text: 'Private routes and persisted sessions keep the app feeling reliable and complete.',
                },
              ].map(item => (
                <div key={item.title} className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur-md dark:border-slate-950/10 dark:bg-slate-950/10">
                  <div className="flex items-start gap-4">
                    <div className="mt-1 rounded-2xl bg-white/10 p-3 text-xl dark:bg-slate-950/10">
                      <item.icon />
                    </div>
                    <div>
                      <p className="text-lg font-semibold">{item.title}</p>
                      <p className="mt-1 text-sm text-white/70 dark:text-slate-950/75">{item.text}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
