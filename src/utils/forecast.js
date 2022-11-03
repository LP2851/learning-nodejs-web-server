const request = require("request")


const forecast = (lat, long, callback) => {
    const url = "http://api.weatherstack.com/forecast?access_key=9c94f1b738d78e0ee3155ab5ec9d8e6e&query=" + lat + "," + long

    request({url, json: true}, (error, {body}={}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, "The forecast is " + body.current.temperature + ". It will feel like " + body.current.feelslike + ".")
        }
    } )
}

const forecast2 = (name, callback) => {
    const url = "http://api.weatherstack.com/forecast?access_key=9c94f1b738d78e0ee3155ab5ec9d8e6e&query=" + encodeURIComponent(name)

    request({url, json: true}, (error, {body}={}) => {
        if (error) {
            callback("Unable to connect to weather service", undefined)
        } else if (body.error) {
            callback("Unable to find location", undefined)
        } else {
            callback(undefined, "The forecast is " + body.current.temperature + ". It will feel like " + body.current.feelslike + ".")
        }
    } )
}

module.exports = {
    forecast1: forecast,
    forecast2: forecast2
}