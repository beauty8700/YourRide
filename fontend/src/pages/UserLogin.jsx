import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//import yourRide from "../image/yourRide.png";

const UserLogin = () => {
  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ userData, setUserData ] = useState({})

  const { user, setUser } = useContext(UserDataContext)
  const navigate = useNavigate()

  const handleBack = () => {
    if (window.history.length > 1) {
      navigate(-1)
    } else {
      navigate('/start')
    }
  }



  const [ error, setError ] = useState('')

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('')

    const userData = {
      email: email,
      password: password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`, userData)

      if (response.status === 200) {
        const data = response.data
        setUser(data.user)
        localStorage.setItem('token', data.token)
        navigate('/home')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Check your credentials.')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='h-screen flex'>
      {/* Image Section */}
      <div className='hidden lg:flex lg:w-1/2 h-screen bg-gradient-to-br from-blue-600 to-blue-800 p-0.1'>
  <img 
  src="/image/yourRide.png"
  alt="YourRide"
  className="w-full h-full object-cover object-left"
/>
</div>

      {/* Form Section */}
      <div className='w-full lg:w-1/2 p-8 lg:p-12 h-screen flex flex-col justify-between overflow-y-auto'>
        <div>
          <button onClick={handleBack} className='inline-block mb-8 bg-gray-100 p-2 rounded-full hover:bg-gray-200'>
            <i className="ri-arrow-left-line text-lg"></i>
          </button>
          <h1 className='text-3xl font-bold mb-2 text-gray-900'>Welcome Back</h1>
          <p className='text-gray-600 mb-8'>Sign in to your account</p>

          <form onSubmit={(e) => {
            submitHandler(e)
          }}>
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
            >Login</button>

          </form>
          <p className='text-center text-gray-600 mb-8'>New here? <Link to='/signup' className='text-blue-600 font-semibold hover:underline'>Create an account</Link></p>
        </div>

        <div>
          <Link
            to='/captain-login'
            className='bg-green-600 flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-3 w-full text-lg hover:bg-green-700 transition'
          >Sign in as Captain</Link>
        </div>
      </div>
    </div>
  )
}

export default UserLogin