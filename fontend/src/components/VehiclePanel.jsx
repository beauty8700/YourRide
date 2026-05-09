import React from 'react'

const VehiclePanel = (props) => {
    const vehicles = [
        {
            type: 'car',
            name: 'YourRide Go',
            capacity: 4,
            time: '2 mins',
            description: 'Affordable, comfortable rides',
            icon: 'ri-car-line',
            color: 'blue'
        },
        {
            type: 'moto',
            name: 'YourRide Moto',
            capacity: 1,
            time: '3 mins',
            description: 'Quick rides for one',
            icon: 'ri-e-bike-2-line',
            color: 'green'
        },
        {
            type: 'auto',
            name: 'YourRide Auto',
            capacity: 3,
            time: '3 mins',
            description: 'Budget-friendly rides',
            icon: 'ri-electric-scooter-line',
            color: 'emerald'
        }
    ]

    const handleSelectVehicle = (vehicleType) => {
        props.selectVehicle(vehicleType)
        props.setConfirmRidePanel(true)
    }

    return (
        <div>
            <div className='flex items-center justify-between p-4 absolute top-0 w-full'>
                <button onClick={() => props.setVehiclePanel(false)} className='text-gray-600 hover:text-gray-800 transition-colors'>
                    <i className="ri-arrow-left-line text-xl"></i>
                </button>
                <h5 className='text-center flex-1' onClick={() => {
                    props.setVehiclePanel(false)
                }}><i className="text-3xl text-gray-300 ri-arrow-down-wide-line"></i></h5>
            </div>
            
            <div className='px-4 py-6 pt-16 max-h-[70vh] overflow-y-auto'>
                <h3 className='text-2xl font-bold mb-6 text-gray-800'>Choose a Vehicle</h3>
                <p className='text-gray-600 text-sm mb-6'>Compare prices and features</p>

                <div className='space-y-4'>
                    {vehicles.map((vehicle) => (
                        <div 
                            key={vehicle.type}
                            onClick={() => handleSelectVehicle(vehicle.type)}
                            className='bg-white border-2 border-gray-200 hover:border-blue-300 rounded-xl p-4 cursor-pointer transition-all duration-200 hover:shadow-lg active:scale-95'
                        >
                            <div className='flex items-start gap-4'>
                                {/* Vehicle Icon */}
                                <div className={`flex-shrink-0 h-12 w-12 rounded-lg bg-${vehicle.color}-50 flex items-center justify-center`}>
                                    <i className={`${vehicle.icon} text-${vehicle.color}-600 text-xl`}></i>
                                </div>

                                {/* Vehicle Info */}
                                <div className='flex-1 min-w-0'>
                                    <div className='flex justify-between items-start mb-2'>
                                        <h4 className='font-bold text-gray-900 text-base'>{vehicle.name}</h4>
                                        <span className='text-xl font-bold text-green-600'>₹{props.fare[vehicle.type]}</span>
                                    </div>
                                    <div className='flex items-center gap-3 mb-2'>
                                        <span className='text-xs font-semibold text-gray-600 bg-gray-100 px-2 py-1 rounded'>
                                            <i className="ri-user-fill"></i> {vehicle.capacity}
                                        </span>
                                        <span className='text-xs text-gray-600'>
                                            <i className="ri-time-line"></i> {vehicle.time} away
                                        </span>
                                    </div>
                                    <p className='text-xs text-gray-600'>{vehicle.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default VehiclePanel