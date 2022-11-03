
const path = require('path')

const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// Define paths for Express configs
const publicDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, '../templates/partials')


const app = express()

// On Heroku it will use PORT value
const port = process.env.PORT || 3000

// Setup handlebars engine and view location
app.set('view engine', 'hbs')

// The default folder is in the top directory in a folder called 'views'
// To change folder do something like
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDir))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Lucas'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Lucas'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpMessage: 'Some helpful text',
        title: 'Help',
        name: 'Lucas'
    })
})

// app.com
// app.get('', (req, res) => {
//     res.send('<h1>Weather</h1>')
// })

// app.com/help
// app.get('/help', (req, res) => {
//     // res.send('This is a help page')
//     // res.send({
//     //     name: 'Lucas',
//     //     age: 21
//     // })
//     res.send([{name: 'Lucas'}, {name: 'Person 2'}])
// })

// app.com/about
// app.get('/about', (req, res) => {
//     res.send('<h1>About</h1>')
// })

// app.com/weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({error: 'You must provide an address term'})
    }

    geocode(req.query.address, (error, {name} = {}) => {
        if (error) {
            return res.send({error})
        }
    
        forecast.forecast2(name, (error, forecastData) => {
            if (error) {
                return res.send({error})
            }

            res.send({
                forecast: forecastData,
                location: name,
                address: req.query.address
            })
        })
    })

    // res.send({
    //     forecast: 'Raining',
    //     location: 'London',
    //     address: req.query.address
    // })
})

app.get('/products', (req, res) => {

    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
        
    }

    console.log(req.query)

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Help',
        name: 'Lucas',
        errorMessage: '404: Help Article not found'
    })
})

// 404 Page needs to come last
app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Error',
        name: 'Lucas',
        errorMessage: '404: Page not found'
    })
})

// Starts up the server
// 3000 is a good dev ports
app.listen(port, () => {
    console.log('Server is up on port ' + port)
})