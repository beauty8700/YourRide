import React, { useEffect, useState } from 'react'

const LookingForDriver = (props) => {
    const [ dots, setDots ] = useState('.')
    const [ driverFound, setDriverFound ] = useState(false)

    // Dummy driver data
    const dummyDriver = {
        name: 'Raj Kumar',
        rating: 4.8,
        reviews: 2841,
        vehicle: 'Hyundai i20',
        plate: 'DL 01 AB 1234',
        image: 'https://i.pravatar.cc/150?img=3',
        eta: '3 mins',
        rewards: {
            points: 150,
            cashback: 25,
            bonus: 50
        }
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setDots(prev => prev.length === 3 ? '.' : prev + '.')
        }, 500)
        return () => clearInterval(interval)
    }, [])

    // Simulate driver found after 3 seconds
    useEffect(() => {
        const timer = setTimeout(() => {
            setDriverFound(true)
        }, 3000)
        return () => clearTimeout(timer)
    }, [])

    if (!driverFound) {
        return (
            <div>
                <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                    props.setVehicleFound(false)
                }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>
                
                <div className='px-4 py-6'>
                    {/* Loading Animation */}
                    <div className='flex flex-col items-center justify-center mb-8'>
                        <div className='relative w-20 h-20 mb-4'>
                            <div className='absolute inset-0 border-4 border-blue-200 rounded-full'></div>
                            <div className='absolute inset-0 border-4 border-transparent border-t-green-500 border-r-green-500 rounded-full animate-spin'></div>
                        </div>
                        <h3 className='text-2xl font-bold text-gray-800'>Looking for a Driver{dots}</h3>
                        <p className='text-gray-600 text-sm mt-2'>This usually takes 30 seconds</p>
                    </div>

                    {/* Vehicle Image */}
                    <div className='flex justify-center mb-6'>
                        <div className='bg-gray-100 rounded-lg p-3'>
                            <img className='h-20 w-28 object-cover' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
                        </div>
                    </div>

                    {/* Route Details */}
                    <div className='bg-gray-50 rounded-lg overflow-hidden mb-6'>
                        <div className='flex items-center gap-4 p-4 border-b-2 border-gray-200'>
                            <div className='flex-shrink-0'>
                                <div className='flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white'>
                                    <i className="ri-map-pin-user-fill text-sm"></i>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <h4 className='text-xs font-semibold text-gray-500 uppercase'>From</h4>
                                <p className='text-base font-medium text-gray-900 truncate'>{props.pickup}</p>
                            </div>
                        </div>
                        <div className='flex items-center gap-4 p-4'>
                            <div className='flex-shrink-0'>
                                <div className='flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white'>
                                    <i className="ri-map-pin-2-fill text-sm"></i>
                                </div>
                            </div>
                            <div className='flex-1'>
                                <h4 className='text-xs font-semibold text-gray-500 uppercase'>To</h4>
                                <p className='text-base font-medium text-gray-900 truncate'>{props.destination}</p>
                            </div>
                        </div>
                    </div>

                    {/* Price Display */}
                    <div className='bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-4 mb-4'>
                        <div className='flex justify-between items-center'>
                            <span className='text-gray-700 font-medium'>Estimated Fare</span>
                            <span className='text-xl font-bold text-green-600'>₹{props.fare?.[props.vehicleType]}</span>
                        </div>
                    </div>

                    {/* Cancel Option */}
                    <button onClick={() => {
                        props.setVehicleFound(false)
                    }} className='w-full bg-red-100 text-red-700 font-semibold p-3 rounded-lg hover:bg-red-200 transition-all duration-200'>
                        Cancel Ride
                    </button>
                </div>
            </div>
        )
    }

    // Driver Found View
    return (
        <div>
            <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
                props.setVehicleFound(false)
            }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

            <div className='px-4 py-8 max-h-[80vh] overflow-y-auto'>
                {/* Success Message */}
                <div className='text-center mb-6'>
                    <div className='w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3'>
                        <i className="ri-check-line text-green-600 text-2xl"></i>
                    </div>
                    <h3 className='text-2xl font-bold text-gray-900'>Driver Found!</h3>
                    <p className='text-gray-600 text-sm mt-1'>Your ride is on the way</p>
                </div>

                {/* Driver Card */}
                <div className='bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-6 mb-6 border-2 border-blue-200'>
                    <div className='flex items-center gap-4 mb-4'>
                        <img 
                            src={dummyDriver.image}
                            alt={dummyDriver.name}
                            className='w-16 h-16 rounded-full object-cover border-3 border-white'
                        />
                        <div className='flex-1'>
                            <h4 className='text-lg font-bold text-gray-900'>{dummyDriver.name}</h4>
                            <div className='flex items-center gap-2 mt-1'>
                                <div className='flex items-center gap-1'>
                                    <i className="ri-star-fill text-yellow-400 text-sm"></i>
                                    <span className='font-semibold text-gray-900'>{dummyDriver.rating}</span>
                                </div>
                                <span className='text-gray-600 text-sm'>({dummyDriver.reviews} reviews)</span>
                            </div>
                        </div>
                        <div className='text-right'>
                            <p className='text-2xl font-bold text-purple-600'>{dummyDriver.eta}</p>
                            <p className='text-xs text-gray-600'>ETA</p>
                        </div>
                    </div>

                    {/* Vehicle Details */}
                    <div className='bg-white rounded-lg p-3 mt-4'>
                        <div className='flex items-center gap-3 mb-2'>
                            <i className="ri-car-line text-blue-600 text-lg"></i>
                            <span className='font-semibold text-gray-900'>{dummyDriver.vehicle}</span>
                        </div>
                        <div className='flex items-center gap-3'>
                            <i className="ri-license-line text-blue-600 text-lg"></i>
                            <span className='font-mono font-semibold text-gray-900'>{dummyDriver.plate}</span>
                        </div>
                    </div>
                </div>

                {/* Route Summary */}
                <div className='bg-gray-50 rounded-lg overflow-hidden mb-6'>
                    <div className='flex items-center gap-4 p-4 border-b-2 border-gray-200'>
                        <div className='flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white flex-shrink-0'>
                            <i className="ri-map-pin-user-fill text-sm"></i>
                        </div>
                        <div className='flex-1'>
                            <h4 className='text-xs font-semibold text-gray-500 uppercase'>From</h4>
                            <p className='text-base font-medium text-gray-900 truncate'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-4'>
                        <div className='flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white flex-shrink-0'>
                            <i className="ri-map-pin-2-fill text-sm"></i>
                        </div>
                        <div className='flex-1'>
                            <h4 className='text-xs font-semibold text-gray-500 uppercase'>To</h4>
                            <p className='text-base font-medium text-gray-900 truncate'>{props.destination}</p>
                        </div>
                    </div>
                </div>

                {/* Fare Details */}
                <div className='bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-4 mb-6'>
                    <div className='flex justify-between items-center'>
                        <span className='text-gray-700 font-medium'>Fare</span>
                        <span className='text-xl font-bold text-green-600'>₹{props.fare?.[props.vehicleType]}</span>
                    </div>
                </div>

                {/* Rewards Section */}
                <div className='bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 mb-6 border-2 border-yellow-200'>
                    <div className='flex items-center gap-2 mb-4'>
                        <i className="ri-gift-line text-orange-600 text-2xl"></i>
                        <h4 className='text-lg font-bold text-gray-900'>Earn Rewards!</h4>
                    </div>

                    <div className='grid grid-cols-3 gap-3'>
                        {/* Points */}
                        <div className='bg-white rounded-lg p-4 text-center border-2 border-yellow-100'>
                            <div className='text-3xl font-bold text-blue-600 mb-1'>{dummyDriver.rewards.points}</div>
                            <div className='text-xs font-semibold text-gray-600'>Points</div>
                            <div className='text-xs text-gray-500 mt-1'>Add to balance</div>
                        </div>

                        {/* Cashback */}
                        <div className='bg-white rounded-lg p-4 text-center border-2 border-yellow-100'>
                            <div className='text-3xl font-bold text-green-600 mb-1'>₹{dummyDriver.rewards.cashback}</div>
                            <div className='text-xs font-semibold text-gray-600'>Cashback</div>
                            <div className='text-xs text-gray-500 mt-1'>On this ride</div>
                        </div>

                        {/* Bonus */}
                        <div className='bg-white rounded-lg p-4 text-center border-2 border-yellow-100'>
                            <div className='text-3xl font-bold text-purple-600 mb-1'>₹{dummyDriver.rewards.bonus}</div>
                            <div className='text-xs font-semibold text-gray-600'>Bonus</div>
                            <div className='text-xs text-gray-500 mt-1'>Referral bonus</div>
                        </div>
                    </div>
                </div>

                {/* Call Driver */}
                <button className='w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold p-3 rounded-lg mb-3 flex items-center justify-center gap-2 transition-all duration-200'>
                    <i className="ri-phone-line text-lg"></i>
                    Call Driver
                </button>

                {/* Cancel Option */}
                <button onClick={() => {
                    props.setVehicleFound(false)
                }} className='w-full bg-red-100 text-red-700 font-semibold p-3 rounded-lg hover:bg-red-200 transition-all duration-200'>
                    Cancel Ride
                </button>
            </div>
        </div>
    )
}

export default LookingForDriver