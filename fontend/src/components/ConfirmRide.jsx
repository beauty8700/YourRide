import React from 'react'

const ConfirmRide = (props) => {
    const fare = props.fare?.[props.vehicleType] || 0
    const [isLoading, setIsLoading] = React.useState(false)
    
    return (
        <div>
            <div className='flex items-center justify-between p-4 absolute top-0 w-full'>
                <button onClick={() => {
                    props.setConfirmRidePanel(false)
                    props.setVehiclePanel(true)
                }} className='text-gray-600 hover:text-gray-800 transition-colors'>
                    <i className="ri-arrow-left-line text-xl"></i>
                </button>
                <h5 className='text-center flex-1' onClick={() => {
                    props.setConfirmRidePanel(false)
                }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
            </div>
            
            <div className='px-4 py-6 pt-16'>
                <h3 className='text-2xl font-bold mb-6 text-gray-900'>Confirm your Ride</h3>

                {/* Vehicle Image */}
                <div className='flex justify-center mb-6'>
                    <div className='bg-gray-100 rounded-lg p-3'>
                        <img className='h-24 w-32 object-cover' src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" alt="Vehicle" />
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
                            <h4 className='text-sm font-semibold text-gray-600'>PICKUP</h4>
                            <p className='text-base font-medium text-gray-900 truncate'>{props.pickup}</p>
                        </div>
                    </div>
                    <div className='flex items-center gap-4 p-4 border-b-2 border-gray-200'>
                        <div className='flex-shrink-0'>
                            <div className='flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white'>
                                <i className="text-sm ri-map-pin-2-fill"></i>
                            </div>
                        </div>
                        <div className='flex-1'>
                            <h4 className='text-sm font-semibold text-gray-600'>DESTINATION</h4>
                            <p className='text-base font-medium text-gray-900 truncate'>{props.destination}</p>
                        </div>
                    </div>
                </div>

                {/* Price Breakdown */}
                <div className='bg-gradient-to-r from-blue-50 to-green-50 border-2 border-blue-200 rounded-lg p-4 mb-6'>
                    <div className='flex justify-between items-center mb-3'>
                        <span className='text-gray-700 font-medium'>Estimated Fare</span>
                        <span className='text-2xl font-bold text-green-600'>₹{fare}</span>
                    </div>
                    <div className='text-xs text-gray-600'>
                        <p>✓ Inclusive of all charges</p>
                        <p>✓ Cash Payment</p>
                        <p>✓ Professional drivers</p>
                    </div>
                </div>

                {/* Buttons */}
                <button onClick={async () => {
                    setIsLoading(true)
                    // Simulate 5 second delay for driver assignment
                    setTimeout(async () => {
                        await props.createRide()
                        setIsLoading(false)
                        props.setVehicleFound(true)
                        props.setConfirmRidePanel(false)
                    }, 5000)
                }} 
                disabled={isLoading}
                className='w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-bold p-3 rounded-lg mb-3 hover:shadow-lg transition-all duration-200 transform hover:scale-105 disabled:cursor-not-allowed disabled:transform-none'>
                    {isLoading ? (
                        <div className='flex items-center justify-center gap-2'>
                            <div className='w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin'></div>
                            Finding Driver...
                        </div>
                    ) : (
                        'Confirm Ride'
                    )}
                </button>
                <button onClick={() => {
                    props.setConfirmRidePanel(false)
                }} className='w-full bg-gray-200 text-gray-900 font-semibold p-3 rounded-lg hover:bg-gray-300 transition-all duration-200'>
                    Cancel
                </button>
            </div>
        </div>
    )
}

export default ConfirmRide