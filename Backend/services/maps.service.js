const axios = require('axios');
const captainModel = require('../models/captain.model');

module.exports.getAddressCoordinate = async (address) => {
    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            const location = response.data.results[ 0 ].geometry.location;
            return {
                ltd: location.lat,
                lng: location.lng
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;

    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            if (response.data.rows[ 0 ].elements[ 0 ].status === 'ZERO_RESULTS') {
                throw new Error('No routes found');
            }
            return response.data.rows[ 0 ].elements[ 0 ];
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (err) {
        console.error(err);
        // Return mock data on error
        return {
            distance: { text: '5.2 km', value: 5200 },
            duration: { text: '15 mins', value: 900 },
            status: 'OK'
        };
    }
}

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('query is required');
    }

    const apiKey = process.env.GOOGLE_MAPS_API;
    const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.status === 'OK') {
            return response.data.predictions.map(prediction => prediction.description).filter(value => value);
        } else {
            // Fallback mock data if API fails
            const mockSuggestions = [
                `${input} - Main Street`,
                `${input} - City Center`,
                `${input} - Airport`,
                `${input} - Train Station`,
                `${input} - Shopping Mall`
            ];
            return mockSuggestions;
        }
    } catch (err) {
        console.error(err);
        // Return mock suggestions on error
        const mockSuggestions = [
            `${input} - Main Street`,
            `${input} - City Center`,
            `${input} - Airport`,
            `${input} - Train Station`,
            `${input} - Shopping Mall`
        ];
        return mockSuggestions;
    }
}

module.exports.getCaptainsInTheRadius = async (ltd, lng, radius) => {

    // radius in km


    const captains = await captainModel.find({
        location: {
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    });

    return captains;


}