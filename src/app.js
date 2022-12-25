const hbs = require('hbs')
const path = require('path')
const express = require('express')
const app = express()
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const pathTodir = path.join(__dirname, '../public')
const pathToView = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
app.use(express.static(pathTodir))


app.set('view engine', 'hbs')
app.set('views', pathToView)
hbs.registerPartials(partialsPath)

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Amit'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        help: "help everyone those who need it",
        name: "Amit"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About",
        name: "Amit"
    })
}
)


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must provide location"
        })
    }
        geocode(req.query.address, (error, data) => {
            if (error) {
                return res.send(error)
            }
            console.log(data.lat)
            console.log(data.long)
            forecast(data.lat, data.long, (error, forecastData) => {
                console.log(data.lat)
                console.log(data.long)
                if (error) {
                    return res.send(error)
                }
                res.send({
                    forecast: forecastData,
                    address: req.query.address,
                })
            })
        })
    
}
)



app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amit',
        errorMessage: 'help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Amit',
        errorMessage: 'Page not found'
    })
})
app.listen(3000, () => {

})