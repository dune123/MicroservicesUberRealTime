const axios=require('axios');
const captainModel=require('../models/CaptainModel')

const getCoordinatesFromAddress = async (address) => {
    if (!address) {
        throw new Error('Address is required');
    }

    const apiKey = process.env.HERE_MAPS_API; // Ensure your API key is set in the environment variables.

    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    console.log("Geocode URL:", url); // Debugging the URL

    try {
        const response = await axios.get(url);

        if (response.data.items && response.data.items.length > 0) {
            const { lat, lng } = response.data.items[0].position; // Extract latitude and longitude from the response
            return { latitude: lat, longitude: lng };
        } else {
            console.warn("No results found for address:", address);
            return null;
        }
    } catch (error) {
        console.error("Error Response Data:", error.response?.data || error.message);
        throw new Error('Unable to fetch coordinates');
    }
};

/* get coordinates and and disstance and time */
const getCoordinates = async (address) => {
    const apiKey = process.env.HERE_MAPS_API;
    const geocodeUrl = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;
    const response = await axios.get(geocodeUrl);
    if (response.data.items && response.data.items.length > 0) {
        const { lat, lng } = response.data.items[0].position;
        return `${lat},${lng}`;
    } else {
        throw new Error('Unable to fetch coordinates for address');
    }
};

module.exports.getDistanceTime = async (origin, destination) => {
    if (!origin || !destination) {
        throw new Error('Origin and destination are required');
    }

    const apiKey = process.env.HERE_MAPS_API;

    try {
        const originCoords = await getCoordinates(origin);
        const destinationCoords = await getCoordinates(destination);

        const routeUrl = `https://router.hereapi.com/v8/routes?transportMode=car&origin=${originCoords}&destination=${destinationCoords}&return=summary&apiKey=${apiKey}`;
        const response = await axios.get(routeUrl);
        
        if (response.data.routes) {
            const summary = response.data.routes[0].sections[0].summary;
            
            return {
                distance: summary.length,
                time: summary.duration
            };
        } else {
            throw new Error('Unable to fetch distance and time');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

module.exports.getAutoCompleteSuggestions = async (input) => {
    if (!input) {
        throw new Error('Query is required');
    }

    const coordinates=await getCoordinatesFromAddress(input);
    
    latitude = coordinates.latitude;
    longitude = coordinates.longitude;

    if (!latitude || !longitude) {
        throw new Error('Latitude and Longitude are required');
    }

    const apiKey = process.env.HERE_MAPS_API;

    const url = `https://autosuggest.search.hereapi.com/v1/autosuggest?q=${encodeURIComponent(input)}&at=${latitude},${longitude}&apiKey=${apiKey}`;


    try {
        const response = await axios.get(url);
        if (response.data.items && response.data.items.length > 0) {
            return response.data.items.map((item) => item.title);
        } else {
            console.warn("No results found for input:", input);
            return [];
        }
    } catch (error) {
        console.error("Error Response Data:", error.response?.data || error.message);
        throw new Error('Unable to fetch results');
    }
};

module.exports.getCaptainsInRadius=async(ltd,lng,radius)=>{
    //radius in Km

    const captains=await captainModel.find({
        location:{
            $geoWithin: {
                $centerSphere: [ [ ltd, lng ], radius / 6371 ]
            }
        }
    })

    return captains
}

module.exports.getAddress = async (address) => {
    const apiKey = process.env.HERE_MAPS_API;

    const url = `https://geocode.search.hereapi.com/v1/geocode?q=${encodeURIComponent(address)}&apiKey=${apiKey}`;

    try {
        const response = await axios.get(url);
        if (response.data.items && response.data.items.length > 0) {
            const location = response.data.items[0].position;
            return {
                ltd: location.lat,
                lng: location.lng,
            };
        } else {
            throw new Error('Unable to fetch coordinates');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};
