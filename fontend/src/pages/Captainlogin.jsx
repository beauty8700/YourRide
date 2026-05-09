import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { CaptainDataContext } from '../context/CapatainContext'
//import heroImage from '../assets/hero.png'

const Captainlogin = () => {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ error, setError ] = useState('')

  const { captain, setCaptain } = React.useContext(CaptainDataContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('')
    
    const captainData = {
      email: email,
      password
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/login`, captainData)

      if (response.status === 200) {
        const data = response.data

        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
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
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-white-600 to-orange-800 items-center justify-center p-0.1'>
        <img src="/image/yourRide.png" alt="YourRide" className='w-full h-full object-cover rounded-lg' />
      </div>

      {/* Form Section */}
      <div className='w-full lg:w-1/2 p-8 lg:p-12 h-screen flex flex-col justify-between overflow-y-auto'>
        <div>
          <Link to='/start' className='inline-block mb-8 bg-gray-100 p-2 rounded-full hover:bg-gray-200'>
            <i className="ri-arrow-left-line text-lg"></i>
          </Link>
          <h1 className='text-3xl font-bold mb-2 text-gray-900'>Captain Login</h1>
          <p className='text-gray-600 mb-8'>Sign in to your captain account</p>

          <form onSubmit={submitHandler}>
            <h3 className='text-lg font-medium mb-2 text-gray-700'>Email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='bg-gray-100 mb-6 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white'
              type="email"
              placeholder='captain@example.com'
            />

            <h3 className='text-lg font-medium mb-2 text-gray-700'>Password</h3>

            <input
              className='bg-gray-100 mb-2 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required type="password"
              placeholder='••••••••'
            />

            {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}

            <button
              className='bg-orange-600 text-white font-semibold mb-4 rounded-lg px-4 py-3 w-full text-lg hover:bg-orange-700 transition'
            >Login</button>

          </form>
          <p className='text-center text-gray-600 mb-8'>New captain? <Link to='/captain-signup' className='text-orange-600 font-semibold hover:underline'>Register here</Link></p>
        </div>

        <div>
          <Link
            to='/login'
            className='bg-blue-600 flex items-center justify-center text-white font-semibold mb-5 rounded-lg px-4 py-3 w-full text-lg hover:bg-blue-700 transition'
          >Sign in as User</Link>
        </div>
      </div>
    </div>
  )
}

export default Captainlogin