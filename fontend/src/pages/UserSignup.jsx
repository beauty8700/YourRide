import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { UserDataContext } from '../context/UserContext'

const UserSignup = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ userData, setUserData ] = useState({})
  const [ error, setError ] = useState('')

  const navigate = useNavigate()
  const { user, setUser } = useContext(UserDataContext)

  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    
    const newUser = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`, newUser)

      if (response.status === 201) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
  }

  return (
    <div className='h-screen flex'>
      {/* Image Section */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-white-600 to-blue-800 items-center justify-center p-0.5'>
        <img src="image/ride2.webp" alt="YourRide" className='w-full h-full rounded-lg' />
      </div>

      {/* Form Section */}
      <div className='w-full lg:w-1/2 p-8 lg:p-12 h-screen flex flex-col justify-between overflow-y-auto'>
        <div>
          <Link to='/start' className='inline-block mb-8 bg-gray-100 p-2 rounded-full hover:bg-gray-200'>
            <i className="ri-arrow-left-line text-lg"></i>
          </Link>
          <h1 className='text-3xl font-bold mb-2 text-gray-900'>Create Account</h1>
          <p className='text-gray-600 mb-8'>Join YourRide today</p>

          <form onSubmit={submitHandler}>
            <h3 className='text-lg font-medium mb-2 text-gray-700'>Your Name</h3>
            <div className='flex gap-4 mb-6'>
              <input
                required
                className='bg-gray-100 w-1/2 rounded-lg px-4 py-3 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
              <input
                required
                className='bg-gray-100 w-1/2 rounded-lg px-4 py-3 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value)
                }}
              />
            </div>

            <h3 className='text-lg font-medium mb-2 text-gray-700'>Email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='bg-gray-100 mb-6 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white'
              type="email"
              placeholder='you@example.com'
            />

            <h3 className='text-lg font-medium mb-2 text-gray-700'>Password</h3>

            <input
              className='bg-gray-100 mb-2 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder:text-gray-500 focus:outline-none focus:border-blue-500 focus:bg-white'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required type="password"
              placeholder='••••••••'
            />

            {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}

            <button
              className='bg-blue-600 text-white font-semibold mb-4 rounded-lg px-4 py-3 w-full text-lg hover:bg-blue-700 transition'
            >Create Account</button>

          </form>
          <p className='text-center text-gray-600 mb-8'>Already have an account? <Link to='/login' className='text-blue-600 font-semibold hover:underline'>Login here</Link></p>
        </div>

        <div>
          <p className='text-[10px] leading-tight text-gray-600'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div>
  )
}

export default UserSignup