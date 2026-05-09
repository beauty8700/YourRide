import React from 'react'

const WaitingForDriver = (props) => {
  const driverName = props.ride?.captain?.fullname?.firstname || 'Driver'
  const vehiclePlate = props.ride?.captain?.vehicle?.plate || 'N/A'
  const vehicleColor = props.ride?.captain?.vehicle?.color || 'Unknown'
  const otp = props.ride?.otp || '****'
  const fare = props.ride?.fare || 0
  const rating = props.ride?.captain?.rating || 4.8
  const totalRides = props.ride?.captain?.totalRides || 0

  return (
    <div>
      <h5 className='p-1 text-center w-[93%] absolute top-0' onClick={() => {
        props.setWaitingForDriver(false)
      }}><i className="text-3xl text-gray-200 ri-arrow-down-wide-line"></i></h5>

      <div className='px-4 py-6'>
        {/* Driver Card */}
        <div className='bg-gradient-to-r from-blue-50 to-green-100 rounded-xl p-5 mb-6 border-2 border-blue-200'>
          <div className='flex items-center gap-4'>
            {/* Driver Avatar */}
            <div className='flex-shrink-0'>
              <div className='h-16 w-16 bg-gradient-to-br from-blue-400 to-green-500 rounded-full flex items-center justify-center text-white text-2xl font-bold'>
                {driverName.charAt(0).toUpperCase()}
              </div>
            </div>
            
            {/* Driver Info */}
            <div className='flex-1'>
              <h2 className='text-lg font-bold text-gray-900 capitalize'>{driverName}</h2>
              <div className='flex items-center gap-2 mt-1'>
                <div className='flex items-center gap-1'>
                  <i className="ri-star-fill text-yellow-400"></i>
                  <span className='text-sm font-semibold text-gray-700'>{rating.toFixed(1)}</span>
                </div>
                <span className='text-gray-400'>•</span>
                <span className='text-sm text-gray-600'>{totalRides} rides</span>
                <span className='text-gray-400'>•</span>
                <span className='text-sm text-green-600 font-medium'>Verified</span>
              </div>
              <p className='text-xs text-gray-600 mt-1'>Professional Driver • 5 years experience</p>
            </div>
          </div>
        </div>

        {/* Vehicle Details */}
        <div className='bg-gray-50 rounded-lg overflow-hidden mb-6 border border-gray-200'>
          <div className='p-4 border-b border-gray-200'>
            <h4 className='text-xs font-semibold text-gray-600 uppercase mb-3'>Vehicle Details</h4>
            <div className='flex justify-between items-center'>
              <div>
                <p className='text-sm text-gray-600'>Plate Number</p>
                <p className='text-lg font-bold text-gray-900'>{vehiclePlate}</p>
              </div>
              <div className='text-right'>
                <p className='text-sm text-gray-600'>Color</p>
                <p className='text-lg font-bold text-gray-900 capitalize'>{vehicleColor}</p>
              </div>
            </div>
          </div>

          {/* OTP Section */}
          <div className='p-4 bg-yellow-50 border-t-2 border-yellow-200'>
            <p className='text-xs font-semibold text-gray-600 uppercase mb-2'>Share this OTP with driver</p>
            <div className='text-center'>
              <div className='inline-block bg-white border-2 border-yellow-400 rounded-lg px-6 py-3'>
                <p className='text-4xl font-bold text-yellow-600 tracking-widest'>{otp}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Route Details */}
        <div className='bg-white rounded-lg overflow-hidden border border-gray-200 mb-6'>
          <div className='flex items-center gap-4 p-4 border-b border-gray-200'>
            <div className='flex-shrink-0'>
              <div className='flex items-center justify-center h-8 w-8 rounded-full bg-green-500 text-white'>
                <i className="ri-map-pin-user-fill text-sm"></i>
              </div>
            </div>
            <div className='flex-1'>
              <h4 className='text-xs font-semibold text-gray-500 uppercase'>Pickup Location</h4>
              <p className='text-base font-medium text-gray-900 truncate'>{props.ride?.pickup}</p>
            </div>
          </div>
          <div className='flex items-center gap-4 p-4'>
            <div className='flex-shrink-0'>
              <div className='flex items-center justify-center h-8 w-8 rounded-full bg-red-500 text-white'>
                <i className="ri-map-pin-2-fill text-sm"></i>
              </div>
            </div>
            <div className='flex-1'>
              <h4 className='text-xs font-semibold text-gray-500 uppercase'>Destination</h4>
              <p className='text-base font-medium text-gray-900 truncate'>{props.ride?.destination}</p>
            </div>
          </div>
        </div>

        {/* Safety & Share */}
        <div className='bg-red-50 border-2 border-red-200 rounded-lg p-4 mb-6'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='w-10 h-10 bg-red-500 rounded-full flex items-center justify-center'>
                <i className="ri-shield-check-fill text-white"></i>
              </div>
              <div>
                <h4 className='font-semibold text-gray-800'>Safety First</h4>
                <p className='text-xs text-gray-600'>Emergency contact active</p>
              </div>
            </div>
            <button className='bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-red-600 transition'>
              SOS
            </button>
          </div>
        </div>
        <div className='bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-200 rounded-lg p-4 mb-6'>
          <div className='flex justify-between items-center'>
            <span className='text-gray-700 font-medium'>Fare Amount</span>
            <span className='text-2xl font-bold text-green-600'>₹{fare}</span>
          </div>
          <p className='text-xs text-gray-600 mt-2'>Payment Method: Cash • Safe & Secure</p>
        </div>

        {/* Action Buttons */}
        <div className='grid grid-cols-2 gap-3 mb-3'>
          <button className='bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-bold p-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2'>
            <i className="ri-phone-fill"></i>
            Call
          </button>
          <button className='bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-bold p-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2'>
            <i className="ri-message-3-fill"></i>
            Message
          </button>
          <button className='bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-bold p-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2'>
            <i className="ri-share-fill"></i>
            Share
          </button>
          <button className='bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-bold p-3 rounded-lg hover:shadow-lg transition-all duration-200 transform hover:scale-105 flex items-center justify-center gap-2'>
            <i className="ri-map-pin-fill"></i>
            Track
          </button>
        </div>
        <button onClick={() => {
          props.setWaitingForDriver(false)
        }} className='w-full mt-3 bg-red-100 text-red-700 font-semibold p-3 rounded-lg hover:bg-red-200 transition-all duration-200'>
          Cancel Ride
        </button>
      </div>
    </div>
  )
}

export default WaitingForDriver