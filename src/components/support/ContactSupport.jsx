import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'
import { motion } from 'framer-motion'
import { FiMail, FiMessageSquare, FiPhoneCall, FiSend, FiUser } from 'react-icons/fi'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required'),
})

export default function ContactSupport() {
  const MotionDiv = motion.div
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const onSubmit = (data) => {
    const templateParams = {
      ...data,
      to_email: 'mufeedha564@gmail.com',
      recipient_email: 'mufeedha564@gmail.com',
      reply_to: data.email,
      subject: `Expense Tracker Support: ${data.name}`,
    }

    emailjs.send(
      'service_fnabwat',
      'template_qcfe0gw',
      templateParams,
      '3iAeoL60gUcpim-J4'
    ).then(() => {
      toast.success('Message sent! We will get back to you soon.')
      reset()
    }).catch(() => {
      toast.error('Failed to send message. Please try again later.')
    })
  }

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <MotionDiv
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="spotlight-card rounded-[32px] bg-slate-950 p-8 text-white dark:bg-sky-400 dark:text-slate-950"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(56,189,248,0.3),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(251,191,36,0.28),transparent_28%)] dark:bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.32),transparent_32%),radial-gradient(circle_at_bottom_left,rgba(15,23,42,0.14),transparent_28%)]" />
          <div className="relative z-10">
            <p className="section-label !text-white/65 dark:!text-slate-950/60">Support</p>
            <h1 className="mt-4 text-4xl font-bold">Need help or want to share feedback?</h1>
            <p className="mt-4 max-w-lg text-white/75 dark:text-slate-950/75">
              Send a message straight from the app. This keeps the optional EmailJS requirement from the project brief and wraps it in a more polished support experience.
            </p>

            <div className="mt-8 space-y-4">
              {[
                {
                  icon: FiMail,
                  title: 'Email-ready workflow',
                  text: 'Messages are sent directly using EmailJS so feedback can move without a backend form handler.',
                },
                {
                  icon: FiPhoneCall,
                  title: 'Fast response vibe',
                  text: 'Keep your questions structured and we can respond with enough context to actually help.',
                },
              ].map(item => (
                <div key={item.title} className="rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur-md dark:border-slate-950/10 dark:bg-slate-950/10">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl bg-white/10 p-3 text-xl dark:bg-slate-950/10">
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
        </MotionDiv>

        <MotionDiv initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="glass-card p-8">
          <div className="mb-8">
            <p className="section-label">Send A Message</p>
            <h2 className="mt-2 text-3xl font-bold text-slate-950 dark:text-white">Contact Support</h2>
            <p className="mt-3 text-sm text-slate-500 dark:text-slate-400">
              Messages are configured to go to <span className="font-semibold text-slate-700 dark:text-slate-200">mufeedha564@gmail.com</span>.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiUser className="text-sky-500" /> Your Name
              </label>
              <input type="text" placeholder="your name" {...register('name')} className="input" />
              {errors.name && <p className="error">{errors.name.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiMail className="text-sky-500" /> Email Address
              </label>
              <input type="email" placeholder="user@example.com" {...register('email')} className="input" />
              {errors.email && <p className="error">{errors.email.message}</p>}
            </div>

            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                <FiMessageSquare className="text-sky-500" /> Message
              </label>
              <textarea
                placeholder="Tell us what happened, what you expected, and how we can help."
                {...register('message')}
                className="input min-h-[180px] resize-none py-4"
              />
              {errors.message && <p className="error">{errors.message.message}</p>}
            </div>

            <button type="submit" disabled={isSubmitting} className="btn-primary w-full">
              <FiSend />
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        </MotionDiv>
      </section>
    </div>
  )
}
