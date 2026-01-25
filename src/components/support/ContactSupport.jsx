import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import emailjs from '@emailjs/browser'
import toast from 'react-hot-toast'

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  message: yup.string().required('Message is required')
})

export default function ContactSupport() {
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = (data) => {
    emailjs.send(
      'service_fnabwat',
      'emplate_qcfe0gw',
      data,
      '3iAeoL60gUcpim-J4'
    ).then(() => {
      toast.success('Message sent successfully')
      reset()
    }).catch(() => {
      toast.error('Failed to send message')
    })
  }

  return (
    <div className="flex justify-center p-6 bg-[#F5F7FA] dark:bg-[#1A1F2B] min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#F5F7FA] dark:bg-[#1A1F2B] p-8 rounded-xl shadow-xl w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-[#1B2A49] dark:text-white">Contact Support</h2>

        <input type="text" placeholder="Name" {...register('name')} className="input" />
        {errors.name && <p className="error">{errors.name.message}</p>}

        <input type="email" placeholder="Email" {...register('email')} className="input" />
        {errors.email && <p className="error">{errors.email.message}</p>}

        <textarea placeholder="Message" {...register('message')} className="input h-32"></textarea>
        {errors.message && <p className="error">{errors.message.message}</p>}

        <button type="submit" className="btn-primary w-full py-3 text-lg">Send Message</button>
      </form>
    </div>
  )
}
