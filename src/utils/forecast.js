
//
// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)

// forecast(-75.7088, 44.1545, (error, data) => {
//     console.log('Error', error)
//     console.log('Data', data)
//   })

const request = require('request')

const forecast = (longitude, latitude, callback) => {

    const url ='https://api.darksky.net/forecast/cdd0bdcc38880cac21dc2bafe890b23f/' + latitude +',' + longitude + '?units=si'

    request( { url, json: true}, (error, {body}) => {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else  if (body.error){
            callback('Unable to get weather. Try another search',  undefined)
        } else {
            callback(undefined, {
                summary: body.daily.data[0].summary,
                temperature: body.currently.temperature,
                precipProbability:  body.currently.precipProbability
            })
        }
    })


}

module.exports = forecast 