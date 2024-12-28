
const request = require('request')

// Destructured
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoibmVpbHBvc28iLCJhIjoiY201NXozbnd0MzdvbzJqb2p3anRiNGNoMSJ9.tFs4f6kAlZ-TCm74bi5CsQ&limit=1'

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (body.features.length === 0) {
            console.log('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: body.features[0].properties.coordinates.longitude,
                latitute: body.features[0].properties.coordinates.latitude,
                location: body.features[0].properties.name_preferred
            })
        }
    })
}

/*
const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/search/geocode/v6/forward?q=' + encodeURIComponent(address) + '&access_token=pk.eyJ1IjoibmVpbHBvc28iLCJhIjoiY201NXozbnd0MzdvbzJqb2p3anRiNGNoMSJ9.tFs4f6kAlZ-TCm74bi5CsQ&limit=1'

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to location services!', undefined)
        } else if (response.body.features.length === 0) {
            console.log('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                longitude: response.body.features[0].properties.coordinates.longitude,
                latitute: response.body.features[0].properties.coordinates.latitude,
                location: response.body.features[0].properties.name_preferred
            })
        }
    })
}
*/

module.exports = geocode