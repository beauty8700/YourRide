import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom' // Added useLocation
import { useEffect, useContext } from 'react'
import { SocketContext } from '../context/SocketContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Riding = () => {
    const location = useLocation()
    const { ride } = location.state || {} // Retrieve ride data
    const { socket } = useContext(SocketContext)
    const navigate = useNavigate()
    const [showReward, setShowReward] = useState(false)
    const [rideStatus, setRideStatus] = useState('ongoing')

    useEffect(() => {
        socket.on("ride-ended", () => {
            setRideStatus('completed')
            setShowReward(true)
        })

        return () => {
            socket.off("ride-ended")
        }
    }, [socket])

    const handleRewardClose = () => {
        setShowReward(false)
        navigate('/home')
    }


    return (
        <div className='h-screen bg-gradient-to-b from-blue-50 to-green-50'>
            <Link to='/home' className='fixed right-4 top-4 h-12 w-12 bg-white flex items-center justify-center rounded-full shadow-lg hover:shadow-xl transition-all duration-200 z-10'>
                <i className="text-lg font-medium ri-home-5-line text-blue-600"></i>
            </Link>
            
            {/* Ride Status */}
            <div className='absolute top-4 left-4 right-16 bg-white p-3 rounded-lg shadow-md z-10'>
                <div className='flex items-center justify-between'>
                    <span className='text-sm font-medium text-gray-700'>Ride Status:</span>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rideStatus === 'ongoing' ? 'bg-green-100 text-green-800' :
                        rideStatus === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                    }`}>
                        {rideStatus.charAt(0).toUpperCase() + rideStatus.slice(1)}
                    </span>
                </div>
            </div>
            
            <div className='h-1/2'>
                <LiveTracking />
            </div>
            <div className='h-1/2 p-4'>
                <div className='flex items-center justify-between mb-4'>
                    <img className='h-16 rounded-lg shadow-md' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="" />
                    <div className='text-right'>
                        <h2 className='text-lg font-medium capitalize text-gray-800'>{ride?.captain.fullname.firstname}</h2>
                        <h4 className='text-xl font-semibold -mt-1 -mb-1 text-blue-600'>{ride?.captain.vehicle.plate}</h4>
                        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
                        <div className='flex items-center gap-1 mt-1'>
                            <i className="ri-star-fill text-yellow-400 text-sm"></i>
                            <span className='text-sm font-semibold text-gray-700'>4.8</span>
                        </div>
                    </div>
                </div>

                <div className='flex gap-2 justify-between flex-col items-center'>
                    <div className='w-full mt-5'>

                        <div className='flex items-center gap-5 p-4 border-b-2 border-gray-200 bg-white rounded-lg shadow-sm mb-3'>
                            <i className="text-lg ri-map-pin-2-fill text-red-500"></i>
                            <div>
                                <h3 className='text-lg font-medium text-gray-800'>Destination</h3>
                                <p className='text-sm -mt-1 text-gray-600'>{ride?.destination}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-5 p-4 bg-white rounded-lg shadow-sm'>
                            <i className="ri-currency-line text-green-500"></i>
                            <div>
                                <h3 className='text-lg font-medium text-gray-800'>₹{ride?.fare}</h3>
                                <p className='text-sm -mt-1 text-gray-600'>Cash Payment</p>
                            </div>
                        </div>
                    </div>
                </div>
                <button className='w-full mt-5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-semibold p-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'>Make a Payment</button>
            </div>
            {showReward && (
                <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
                    <div className='bg-white p-8 rounded-2xl text-center max-w-sm mx-4 shadow-2xl'>
                        <div className='w-20 h-20 bg-gradient-to-r from-yellow-400 to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-6'>
                            <i className="ri-gift-fill text-white text-3xl"></i>
                        </div>
                        <h2 className='text-3xl font-bold mb-4 text-gray-800'>Congratulations!</h2>
                        <p className='text-lg mb-6 text-gray-600'>You earned <span className='font-bold text-green-600'>20 rewards</span> on this trip!</p>
                        <div className='bg-gradient-to-r from-blue-50 to-green-50 p-4 rounded-lg mb-6'>
                            <p className='text-sm text-gray-700'>Use rewards for discounted rides</p>
                            <p className='text-xs text-gray-500 mt-1'>Valid for 30 days</p>
                        </div>
                        <button onClick={handleRewardClose} className='w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white px-6 py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 transform hover:scale-105'>
                            Continue
                        </button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Riding