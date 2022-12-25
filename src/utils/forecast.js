
const request = require('request')

    const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=db22d711cd225cee6e296107770d7e39&query="+latitude+","+longitude
    request({ url: url, json: true }, (error, response) => {
        if(error)
        {
            callback("unable to connect location ", undefined)
        }
        else if(response.body.error)
        {
            callback("Incorrect input",undefined)
        }
        else{
            callback(undefined,
            'The temperature is '+ response.body.current.temperature+' and feelslike '+ response.body.current.feelslike)
        }
    })
}
module.exports = forecast