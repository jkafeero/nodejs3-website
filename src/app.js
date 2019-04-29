
const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const public = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(public))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Guru Weather'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About App',
        name: 'Guru About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', 
        {
            title: 'Help Page',
            message: 'This is the help message',
            name: 'Help Guy'
        })
})

app.get('/about', (req, res) => {
    res.send('<h1>About Page</h1>')
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    const address = req.query.address

    geocode(address, (error, {longitude, latitude, location} = {} ) => {
        if (error) {
            return res.send ({ error })
        }
        forecast(longitude, latitude, (error, forecastData) => {    
            if (error) {
                return res.send ({ error })
            }
            
            res.send({
                address,
                forecast: forecastData,
                location
            })
        })
    })
  
})

app.get('/products', (req, res) => {
    if( !req.query.search) {
        return res.send({
            error: 'You must provide a serach term'
        })
    }
    res.send({
        products: []
    }) 
})

// app.get('/help')
// app.get('/about')

// app.com
// app.com/help
// app.com/about

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Error Page',
        name: 'Help Error Guy',
        errorMessage: 'Help article not found'
    })
} )

app.get('*', (req, res) => {
   res.render('404', {
       title: 'Error Page',
       name: 'Error Guy',
       errorMessage: req.path + 'not found'
   })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})