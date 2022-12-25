const request = require("request")

const geocode=(location, callback)=>
{
   const url= "http://api.positionstack.com/v1/forward?access_key=9a6ba5521e2912df8fb1b4bf968c91c4&query=%20"+location+"&limit=1"
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback("unable to connect location ", undefined)
        }
        else if (response.body.error) {
            callback("wrong input", undefined)
        }
        else {

            callback(undefined,
                    {
                     lat: response.body.data[0].latitude,
                     long: response.body.data[0].longitude,
                })
        }
    })
}


module.exports=geocode
