import React, { useEffect, useRef, useState } from 'react'
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import axios from 'axios';
import 'remixicon/fonts/remixicon.css'
import { Link } from 'react-router-dom'
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';
import LiveTracking from '../components/LiveTracking';

const Home = () => {
    const [ pickup, setPickup ] = useState('')
    const [ destination, setDestination ] = useState('')
    const [ panelOpen, setPanelOpen ] = useState(false)
    const vehiclePanelRef = useRef(null)
    const confirmRidePanelRef = useRef(null)
    const vehicleFoundRef = useRef(null)
    const waitingForDriverRef = useRef(null)
    const panelRef = useRef(null)
    const panelCloseRef = useRef(null)
    const [ vehiclePanel, setVehiclePanel ] = useState(false)
    const [ confirmRidePanel, setConfirmRidePanel ] = useState(false)
    const [ vehicleFound, setVehicleFound ] = useState(false)
    const [ waitingForDriver, setWaitingForDriver ] = useState(false)
    const [ pickupSuggestions, setPickupSuggestions ] = useState([])
    const [ destinationSuggestions, setDestinationSuggestions ] = useState([])
    const [ activeField, setActiveField ] = useState(null)
    const [ fare, setFare ] = useState({})
    const [ vehicleType, setVehicleType ] = useState(null)
    const [ rideStatus, setRideStatus ] = useState('idle') // idle, searching, confirmed, ongoing, completed
    const [ ride, setRide ] = useState(null)
    const [ menuOpen, setMenuOpen ] = useState(false)
    const [ showFarePanel, setShowFarePanel ] = useState(false)
    const farePanelRef = useRef(null)

    const navigate = useNavigate()

    const handleBack = () => {
        if (window.history.length > 1) {
            navigate(-1)
        } else {
            navigate('/start')
        }
    }

    const { socket } = useContext(SocketContext)
    const { user } = useContext(UserDataContext)

    useEffect(() => {
        if (user?._id) {
            socket.emit("join", { userType: "user", userId: user._id })
        }
    }, [ user ])

    socket.on('ride-confirmed', ride => {
        setRideStatus('confirmed')
        setVehicleFound(false)
        setWaitingForDriver(true)
        setRide(ride)
    })

    socket.on('ride-started', ride => {
        console.log("ride")
        setRideStatus('ongoing')
        setWaitingForDriver(false)
        navigate('/riding', { state: { ride } }) // Updated navigate to include ride data
    })


    const handlePickupChange = async (e) => {
        setPickup(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }

            })
            setPickupSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const handleDestinationChange = async (e) => {
        setDestination(e.target.value)
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
                params: { input: e.target.value },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setDestinationSuggestions(response.data)
        } catch {
            // handle error
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
    }

    useGSAP(function () {
        if (panelOpen) {
            gsap.to(panelRef.current, {
                height: '70%',
                padding: 24
                // opacity:1
            })
            gsap.to(panelCloseRef.current, {
                opacity: 1
            })
        } else {
            gsap.to(panelRef.current, {
                height: '0%',
                padding: 0
                // opacity:0
            })
            gsap.to(panelCloseRef.current, {
                opacity: 0
            })
        }
    }, [ panelOpen ])


    useGSAP(function () {
        if (vehiclePanel) {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehiclePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehiclePanel ])

    useGSAP(function () {
        if (confirmRidePanel) {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(confirmRidePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ confirmRidePanel ])

    useGSAP(function () {
        if (vehicleFound) {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(vehicleFoundRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ vehicleFound ])

    useGSAP(function () {
        if (waitingForDriver) {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(waitingForDriverRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ waitingForDriver ])

    useGSAP(function () {
        if (showFarePanel) {
            gsap.to(farePanelRef.current, {
                transform: 'translateY(0)'
            })
        } else {
            gsap.to(farePanelRef.current, {
                transform: 'translateY(100%)'
            })
        }
    }, [ showFarePanel ])


    async function findTrip() {
        setPanelOpen(false)
        setShowFarePanel(true)

        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
                params: { pickup, destination },
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            setFare(response.data)
        } catch (error) {
            console.error('Error fetching fare:', error)
        }
    }

    async function createRide() {
        setRideStatus('searching')
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
            pickup,
            destination,
            vehicleType
        }, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
    }

    return (
        <div className='h-screen relative overflow-hidden bg-gray-50'>
            {/* Header Section */}
            <div className='fixed top-0 left-0 right-0 z-40 bg-white shadow-sm'>
                <div className='max-w-full px-4 sm:px-6 py-4 flex items-center justify-between'>
                    {/* Logo */}
                    <div className='flex items-center gap-2'>
                        <button 
                            onClick={handleBack}
                            className='p-2 hover:bg-gray-100 rounded-full transition-colors mr-2'
                        >
                            <i className="ri-arrow-left-line text-xl text-gray-700"></i>
                        </button>
                        <img className='w-10 h-10' src="/hero.png" alt="YourRide Logo" />
                        <span className='font-bold text-xl text-gray-900 hidden sm:inline'>YourRide</span>
                    </div>
                    
                    {/* Right Section */}
                    <div className='flex items-center gap-3'>
                        {/* Wallet */}
                        <div className='bg-gradient-to-r from-blue-50 to-blue-100 px-4 py-2 rounded-full flex items-center gap-2'>
                            <i className="ri-wallet-2-line text-blue-600 text-lg"></i>
                            <span className='text-sm font-semibold text-blue-900'>₹{user?.cash || 198}</span>
                        </div>
                        
                        {/* Menu */}
                        <div className='relative'>
                            <button 
                                onClick={() => setMenuOpen(!menuOpen)}
                                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            >
                                <i className="ri-menu-line text-2xl text-gray-700"></i>
                            </button>
                            
                            {menuOpen && (
                                <div className='absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-2'>
                                    <div className='px-4 py-3 border-b border-gray-100'>
                                        <p className='font-semibold text-gray-900'>{user?.fullname || 'User'}</p>
                                        <p className='text-sm text-gray-600'>{user?.email}</p>
                                    </div>
                                    <button className='w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm'>
                                        <i className="ri-user-line mr-2"></i>Profile
                                    </button>
                                    <button className='w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm'>
                                        <i className="ri-history-line mr-2"></i>Ride History
                                    </button>
                                    <button className='w-full text-left px-4 py-2 hover:bg-gray-50 text-gray-700 text-sm'>
                                        <i className="ri-settings-line mr-2"></i>Settings
                                    </button>
                                    <div className='border-t border-gray-100 pt-2'>
                                        <Link to='/user/logout' className='w-full text-left px-4 py-2 hover:bg-gray-50 text-red-600 text-sm font-medium'>
                                            <i className="ri-logout-box-line mr-2"></i>Logout
                                        </Link>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Map Section */}
            <div className='h-screen w-full pt-16'>
                <LiveTracking />
            </div>

            {/* Bottom Sheet - Search & Booking */}
            <div className='fixed bottom-0 left-0 right-0 z-30 flex flex-col justify-end h-full'>
                {/* Ride Status Indicator */}
                {rideStatus !== 'idle' && (
                    <div className='fixed top-24 left-4 right-4 bg-white p-4 rounded-2xl shadow-xl z-50'>
                        <div className='flex items-center gap-3'>
                            <div className={`w-3 h-3 rounded-full animate-pulse ${
                                rideStatus === 'searching' ? 'bg-yellow-500' :
                                rideStatus === 'confirmed' ? 'bg-blue-500' :
                                rideStatus === 'ongoing' ? 'bg-green-500' :
                                'bg-gray-500'
                            }`}></div>
                            <span className='text-sm font-semibold text-gray-800'>
                                {rideStatus === 'searching' && 'Searching for drivers...'}
                                {rideStatus === 'confirmed' && 'Driver confirmed!'}
                                {rideStatus === 'ongoing' && 'Ride in progress...'}
                            </span>
                        </div>
                    </div>
                )}

                {/* Main Search Card */}
                <div className='h-auto max-h-[50vh] p-6 bg-white rounded-t-3xl shadow-2xl overflow-y-auto'>
                    <div className='flex items-center justify-between mb-4'>
                        <h4 className='text-2xl font-bold text-gray-900'>Where to?</h4>
                        <button
                            ref={panelCloseRef}
                            onClick={() => setPanelOpen(false)}
                            className='opacity-0 p-2 hover:bg-gray-100 rounded-full transition-all'
                        >
                            <i className="ri-arrow-down-wide-line text-xl text-gray-400"></i>
                        </button>
                    </div>

                    {/* Search Form */}
                    <form className='space-y-3 mb-6' onSubmit={submitHandler}>
                        <div className='relative'>
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col gap-1 items-center">
                                <div className='w-2 h-2 rounded-full bg-blue-600'></div>
                                <div className='w-0.5 h-6 bg-gradient-to-b from-blue-600 to-green-500'></div>
                                <div className='w-3 h-3 rounded-full border-2 border-green-500'></div>
                            </div>
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('pickup')
                                }}
                                value={pickup}
                                onChange={handlePickupChange}
                                className='w-full bg-gray-100 border-0 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-blue-500 px-12 py-3 text-base rounded-xl transition-all duration-200 focus:outline-none placeholder:text-gray-500'
                                type="text"
                                placeholder='Current location'
                            />
                        </div>

                        <div className='relative'>
                            <input
                                onClick={() => {
                                    setPanelOpen(true)
                                    setActiveField('destination')
                                }}
                                value={destination}
                                onChange={handleDestinationChange}
                                className='w-full bg-gray-100 border-0 hover:bg-gray-200 focus:bg-white focus:ring-2 focus:ring-green-500 px-12 py-3 text-base rounded-xl transition-all duration-200 focus:outline-none placeholder:text-gray-500'
                                type="text"
                                placeholder='Where are you going?'
                            />
                            <i className="ri-map-pin-line absolute left-4 top-1/2 -translate-y-1/2 text-green-600 text-lg"></i>
                        </div>
                    </form>

                    {/* Quick Shortcuts */}
                    {pickup && destination && (
                        <div className='space-y-3 mb-6'>
                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer'>
                                <div className='w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center'>
                                    <i className="ri-home-line text-blue-600"></i>
                                </div>
                                <div>
                                    <p className='text-sm font-semibold text-gray-900'>Home</p>
                                    <p className='text-xs text-gray-600'>Add home address</p>
                                </div>
                            </div>
                            <div className='flex items-center gap-3 p-3 bg-gray-50 rounded-xl hover:bg-gray-100 cursor-pointer'>
                                <div className='w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center'>
                                    <i className="ri-building-line text-orange-600"></i>
                                </div>
                                <div>
                                    <p className='text-sm font-semibold text-gray-900'>Work</p>
                                    <p className='text-xs text-gray-600'>Add work address</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search Button */}
                    <button
                        onClick={findTrip}
                        disabled={!pickup || !destination}
                        className='w-full bg-black text-white py-4 rounded-xl font-bold text-lg hover:bg-gray-900 transition-all duration-200 disabled:bg-gray-300 disabled:cursor-not-allowed shadow-lg'
                    >
                        <i className="ri-search-line mr-2"></i>See prices
                    </button>
                </div>

                {/* Fare Display Panel */}
                <div ref={farePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-4 py-8 rounded-t-3xl shadow-2xl overflow-y-auto'>
                    <div className='max-w-4xl mx-auto'>
                        <div className='flex items-center justify-between mb-6'>
                            <h3 className='text-2xl font-bold text-gray-900'>Estimated Fares</h3>
                            <button 
                                onClick={() => setShowFarePanel(false)}
                                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            >
                                <i className="ri-close-line text-2xl text-gray-600"></i>
                            </button>
                        </div>

                        {/* Route Summary */}
                        <div className='bg-gray-50 rounded-lg p-4 mb-6'>
                            <div className='flex items-start gap-3 mb-3'>
                                <div className='w-8 h-8 rounded-full bg-green-500 flex items-center justify-center flex-shrink-0 mt-1'>
                                    <i className="ri-map-pin-user-fill text-white text-sm"></i>
                                </div>
                                <div>
                                    <p className='text-xs font-semibold text-gray-500 uppercase'>Pickup</p>
                                    <p className='text-sm font-medium text-gray-900'>{pickup}</p>
                                </div>
                            </div>
                            <div className='flex items-start gap-3'>
                                <div className='w-8 h-8 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0 mt-1'>
                                    <i className="ri-map-pin-2-fill text-white text-sm"></i>
                                </div>
                                <div>
                                    <p className='text-xs font-semibold text-gray-500 uppercase'>Dropoff</p>
                                    <p className='text-sm font-medium text-gray-900'>{destination}</p>
                                </div>
                            </div>
                        </div>

                        {/* Fare Options */}
                        <div className='space-y-3 mb-6'>
                            {fare && Object.keys(fare).length > 0 ? (
                                Object.entries(fare).map(([type, price]) => (
                                    <button
                                        key={type}
                                        onClick={() => {
                                            setVehicleType(type)
                                            setShowFarePanel(false)
                                            setVehiclePanel(true)
                                        }}
                                        className='w-full p-4 border-2 border-gray-200 rounded-lg hover:border-black hover:bg-gray-50 transition-all flex items-center justify-between group'
                                    >
                                        <div className='flex items-center gap-4'>
                                            <div className='text-3xl'>
                                                {type === 'auto' && '🚙'}
                                                {type === 'car' && '🚗'}
                                                {type === 'moto' && '🏍️'}
                                            </div>
                                            <div className='text-left'>
                                                <p className='font-semibold text-gray-900 capitalize'>{type}</p>
                                                <p className='text-xs text-gray-600'>2-4 mins away</p>
                                            </div>
                                        </div>
                                        <p className='font-bold text-lg text-gray-900'>₹{price}</p>
                                    </button>
                                ))
                            ) : (
                                <div className='text-center py-8'>
                                    <p className='text-gray-600'>Loading fares...</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                <div ref={panelRef} className='bg-white h-0 overflow-y-auto'>
                    <LocationSearchPanel
                        suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
                        setPanelOpen={setPanelOpen}
                        setVehiclePanel={setVehiclePanel}
                        setPickup={setPickup}
                        setDestination={setDestination}
                        activeField={activeField}
                    />
                </div>

                {/* Vehicle Selection Panel */}
                <div ref={vehiclePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-4 py-8 rounded-t-3xl shadow-2xl'>
                    <div className='max-w-4xl mx-auto'>
                        <div className='flex items-center justify-between mb-6'>
                            <h3 className='text-2xl font-bold text-gray-900'>Choose a ride</h3>
                            <button 
                                onClick={() => setVehiclePanel(false)}
                                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            >
                                <i className="ri-close-line text-2xl text-gray-600"></i>
                            </button>
                        </div>
                        <VehiclePanel
                            selectVehicle={setVehicleType}
                            fare={fare}
                            setConfirmRidePanel={setConfirmRidePanel}
                            setVehiclePanel={setVehiclePanel}
                        />
                    </div>
                </div>

                {/* Confirm Ride Panel */}
                <div ref={confirmRidePanelRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-4 py-8 rounded-t-3xl shadow-2xl'>
                    <div className='max-w-4xl mx-auto'>
                        <div className='flex items-center justify-between mb-6'>
                            <h3 className='text-2xl font-bold text-gray-900'>Confirm your ride</h3>
                            <button 
                                onClick={() => setConfirmRidePanel(false)}
                                className='p-2 hover:bg-gray-100 rounded-full transition-colors'
                            >
                                <i className="ri-close-line text-2xl text-gray-600"></i>
                            </button>
                        </div>
                        <ConfirmRide
                            createRide={createRide}
                            pickup={pickup}
                            destination={destination}
                            fare={fare}
                            vehicleType={vehicleType}
                            setConfirmRidePanel={setConfirmRidePanel}
                            setVehicleFound={setVehicleFound}
                        />
                    </div>
                </div>

                {/* Looking For Driver Panel */}
                <div ref={vehicleFoundRef} className='fixed w-full z-10 bottom-0 translate-y-full bg-white px-4 py-8 rounded-t-3xl shadow-2xl'>
                    <div className='max-w-4xl mx-auto'>
                        <LookingForDriver
                            createRide={createRide}
                            pickup={pickup}
                            destination={destination}
                            fare={fare}
                            vehicleType={vehicleType}
                            setVehicleFound={setVehicleFound}
                        />
                    </div>
                </div>

                {/* Waiting For Driver Panel */}
                <div ref={waitingForDriverRef} className='fixed w-full z-10 bottom-0 bg-white px-4 py-8 rounded-t-3xl shadow-2xl'>
                    <div className='max-w-4xl mx-auto'>
                        <WaitingForDriver
                            ride={ride}
                            setVehicleFound={setVehicleFound}
                            setWaitingForDriver={setWaitingForDriver}
                            waitingForDriver={waitingForDriver}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home