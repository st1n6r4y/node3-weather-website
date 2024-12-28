
const request = require('request')

// Destructured
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=c994b20d570c7199cf263a86001423cd&query=37.8267,-122.4233&units=f'
    // const url = 'https://api.weatherstack.com/current?access_key=c994b20d570c7199cf263a86001423cd&query=' + latitude + ',' + longitude + '&units=f'

    request({ url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            console.log('Unable to find location.', undefined)
        } else {
            callback(undefined, body.current.weather_descriptions[0] + '. It is currently ' + body.current.temperature + ' degrees out. It feels like ' + body.current.feelslike + ' degrees out.')
        }
    })
}

/*
const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.weatherstack.com/current?access_key=c994b20d570c7199cf263a86001423cd&query=37.8267,-122.4233&units=f'
    // const url = 'https://api.weatherstack.com/current?access_key=c994b20d570c7199cf263a86001423cd&query=' + latitude + ',' + longitude + '&units=f'

    request({ url: url, json: true}, (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.error) {
            console.log('Unable to find location.', undefined)
        } else {
            callback(undefined, response.body.current.weather_descriptions[0] + '. It is currently ' + response.body.current.temperature + ' degrees out. It feels like ' + response.body.current.feelslike + ' degrees out.')
        }
    })
}
*/

module.exports = forecast