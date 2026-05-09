import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { CaptainDataContext } from '../context/CapatainContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//import heroImage from '../assets/hero.png'

const CaptainSignup = () => {

  const navigate = useNavigate()

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')

  const [ vehicleColor, setVehicleColor ] = useState('')
  const [ vehiclePlate, setVehiclePlate ] = useState('')
  const [ vehicleCapacity, setVehicleCapacity ] = useState('')
  const [ vehicleType, setVehicleType ] = useState('')
  const [ error, setError ] = useState('')


  const { captain, setCaptain } = React.useContext(CaptainDataContext)


  const submitHandler = async (e) => {
    e.preventDefault()
    setError('')
    
    const captainData = {
      fullname: {
        firstname: firstName,
        lastname: lastName
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType
      }
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captains/register`, captainData)

      if (response.status === 201) {
        const data = response.data
        setCaptain(data.captain)
        localStorage.setItem('token', data.token)
        navigate('/captain-home')
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed. Please try again.')
    }

    setEmail('')
    setFirstName('')
    setLastName('')
    setPassword('')
    setVehicleColor('')
    setVehiclePlate('')
    setVehicleCapacity('')
    setVehicleType('')
  }

  return (
    <div className='h-screen flex'>
      {/* Image Section */}
      <div className='hidden lg:flex lg:w-1/2 bg-gradient-to-br from-orange-200 to-orange-800 items-center justify-center p-0.1'>
        <img src="image/ride2.webp" alt="YourRide" className='w-full h-full rounded-lg' />
      </div>

      {/* Form Section */}
      <div className='w-full lg:w-1/2 p-8 lg:p-12 h-screen flex flex-col justify-between overflow-y-auto'>
        <div>
          <Link to='/start' className='inline-block mb-8 bg-gray-100 p-2 rounded-full hover:bg-gray-200'>
            <i className="ri-arrow-left-line text-lg"></i>
          </Link>
          <h1 className='text-3xl font-bold mb-2 text-gray-900'>Become a Captain</h1>
          <p className='text-gray-600 mb-8'>Join our fleet and start earning</p>

          <form onSubmit={submitHandler}>

            <h3 className='text-lg font-medium mb-2 text-gray-700'>Your Name</h3>
            <div className='flex gap-4 mb-6'>
              <input
                required
                className='bg-gray-100 w-1/2 rounded-lg px-4 py-3 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value)
                }}
              />
              <input
                required
                className='bg-gray-100 w-1/2 rounded-lg px-4 py-3 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white'
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
              className='bg-gray-100 mb-6 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white'
              type="email"
              placeholder='captain@example.com'
            />

            <h3 className='text-lg font-medium mb-2 text-gray-700'>Password</h3>

            <input
              className='bg-gray-100 mb-6 rounded-lg px-4 py-3 border border-gray-300 w-full text-lg placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required type="password"
              placeholder='••••••••'
            />

            <h3 className='text-lg font-medium mb-3 text-gray-700'>Vehicle Information</h3>
            <div className='flex gap-4 mb-6'>
              <input
                required
                className='bg-gray-100 w-1/2 rounded-lg px-4 py-3 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white'
                type="text"
                placeholder='Vehicle Color'
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value)
                }}
              />
              <input
                required
                className='bg-gray-100 w-1/2 rounded-lg px-4 py-3 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white'
                type="text"
                placeholder='Vehicle Plate'
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value)
                }}
              />
            </div>
            <div className='flex gap-4 mb-6'>
              <input
                required
                className='bg-gray-100 w-1/2 rounded-lg px-4 py-3 border border-gray-300 text-lg placeholder:text-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white'
                type="number"
                placeholder='Vehicle Capacity'
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value)
                }}
              />
              <select
                required
                className='bg-gray-100 w-1/2 rounded-lg px-4 py-3 border border-gray-300 text-lg text-gray-500 focus:outline-none focus:border-orange-500 focus:bg-white'
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value)
                }}
              >
                <option value="" disabled>Select Vehicle Type</option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="moto">Motorcycle</option>
              </select>
            </div>

            {error && <p className='text-red-600 text-sm mb-4'>{error}</p>}

            <button
              className='bg-orange-600 text-white font-semibold mb-4 rounded-lg px-4 py-3 w-full text-lg hover:bg-orange-700 transition'
            >Create Captain Account</button>

          </form>
          <p className='text-center text-gray-600 mb-8'>Already have an account? <Link to='/captain-login' className='text-orange-600 font-semibold hover:underline'>Login here</Link></p>
        </div>

        <div>
          <p className='text-[10px] leading-tight text-gray-600'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
      </div>
    </div>
  )
//}
  return (
    <div className='py-5 px-5 h-screen flex flex-col justify-between'>
      <div>
        <img className='w-20 mb-3' src="https://via.placeholder.com/80?text=YourRide" alt="YourRide Logo" />

        <form onSubmit={(e) => {
          submitHandler(e)
        }}>

          <h3 className='text-lg w-full  font-medium mb-2'>What's our Captain's name</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='First name'
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
              type="text"
              placeholder='Last name'
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value)
              }}
            />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's our Captain's email</h3>
          <input
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            type="email"
            placeholder='email@example.com'
          />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

          <input
            className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
            required type="password"
            placeholder='password'
          />

          <h3 className='text-lg font-medium mb-2'>Vehicle Information</h3>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Color'
              value={vehicleColor}
              onChange={(e) => {
                setVehicleColor(e.target.value)
              }}
            />
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="text"
              placeholder='Vehicle Plate'
              value={vehiclePlate}
              onChange={(e) => {
                setVehiclePlate(e.target.value)
              }}
            />
          </div>
          <div className='flex gap-4 mb-7'>
            <input
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              type="number"
              placeholder='Vehicle Capacity'
              value={vehicleCapacity}
              onChange={(e) => {
                setVehicleCapacity(e.target.value)
              }}
            />
            <select
              required
              className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border text-lg placeholder:text-base'
              value={vehicleType}
              onChange={(e) => {
                setVehicleType(e.target.value)
              }}
            >
              <option value="" disabled>Select Vehicle Type</option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="moto">Moto</option>
            </select>
          </div>

          <button
            className='bg-[#111] text-white font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
          >Create Captain Account</button>

        </form>
        <p className='text-center'>Already have a account? <Link to='/captain-login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] mt-6 leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
          Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
      </div>
    </div>
  )
}
export default CaptainSignup