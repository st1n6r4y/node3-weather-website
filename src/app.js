
// Deploying Node.js to Heroku
// Wiring up the User Interface
// Creating a Search Form
// Browser HTTP Requests with Fetch (Browser API)
// ES6 Aside: Default Function Parameters

const path = require('path')
const express = require('express')
// Partials for Handlebars
const hbs = require('hbs')
// Load utils/geocode.js
const geocode = require('./utils/geocode')
// Load utils/forecast.js
const forecast = require('./utils/forecast')

const app = express()
const port = proccess.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')   // case sensitive and explicit
app.set('views', viewsPath)   // dynamically pointing to 'templates' folder
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Neilsky'
    })     // must be the same with your 'index.hbs'
})

// About section
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Neilsky'
    })     // must be the same with your 'about.hbs'
})

// Help section
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Neilsky',
        helpText: 'Help text page'
    })     // must be the same with your 'help.hbs'
})

// Weather section
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

})

// Products section
// Query String - http://localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search parameter.'
        })
    }

    console.log(req.query)  // Works like a var URL
    res.send({
        products: []
    })
})

// When everything goes wrong or cannot find any?
// Has to be the very last entry/section - right before the execution of every page
// '*' wild card as in for everything - other than specified from above

// 404 Help sub section
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neilsky',
        errorMessage: 'Help article not found.'
    })
})

// 404 section
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neilsky',
        errorMessage: 'Page not found.'
    })
})

// Serving up the page to the Browser
app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})

// Hard coded - Serving up the page to the Browser
/*
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/



// Building a JSON HTTP Endpoint
/*
const path = require('path')
const express = require('express')
// Partials for Handlebars
const hbs = require('hbs')
// Load utils/geocode.js
const geocode = require('./utils/geocode')
// Load utils/forecast.js
const forecast = require('./utils/forecast')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')   // case sensitive and explicit
app.set('views', viewsPath)   // dynamically pointing to 'templates' folder
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Neilsky'
    })     // must be the same with your 'index.hbs'
})

// About section
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Neilsky'
    })     // must be the same with your 'about.hbs'
})

// Help section
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Neilsky',
        helpText: 'Help text page'
    })     // must be the same with your 'help.hbs'
})

// Weather section
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location } = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
    
            res.send({
                location: location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

})

// Products section
// Query String - http://localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search parameter.'
        })
    }

    console.log(req.query)  // Works like a var URL
    res.send({
        products: []
    })
})

// When everything goes wrong or cannot find any?
// Has to be the very last entry/section - right before the execution of every page
// '*' wild card as in for everything - other than specified from above

// 404 Help sub section
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neilsky',
        errorMessage: 'Help article not found.'
    })
})

// 404 section
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neilsky',
        errorMessage: 'Page not found.'
    })
})

// Serving up the page to the Browser
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/




// Accessing API from Browser - Query String
/*
const path = require('path')
const express = require('express')
// Partials for Handlebars
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')   // case sensitive and explicit
app.set('views', viewsPath)   // dynamically pointing to 'templates' folder
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Neilsky'
    })     // must be the same with your 'index.hbs'
})

// About section
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Neilsky'
    })     // must be the same with your 'about.hbs'
})

// Help section
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Neilsky',
        helpText: 'Help text page'
    })     // must be the same with your 'help.hbs'
})

// Weather section
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide an address.'
        })
    }

    res.send({
        location: 'Las Vegas',
        forecast: 'It is a sunny day.',
        address: req.query.address
    })
})

// Products section
// Query String - http://localhost:3000/products?search=games&rating=5
app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search parameter.'
        })
    }

    console.log(req.query)  // Works like a var URL
    res.send({
        products: []
    })
})

// When everything goes wrong or cannot find any?
// Has to be the very last entry/section - right before the execution of every page
// '*' wild card as in for everything - other than specified from above

// 404 Help sub section
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neilsky',
        errorMessage: 'Help article not found.'
    })
})

// 404 section
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neilsky',
        errorMessage: 'Page not found.'
    })
})

// Serving up the page to the Browser
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/




// Styling the Application
/*
const path = require('path')
const express = require('express')
// Partials for Handlebars
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')   // case sensitive and explicit
app.set('views', viewsPath)   // dynamically pointing to 'templates' folder
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Neilsky'
    })     // must be the same with your 'index.hbs'
})

// About section
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Neilsky'
    })     // must be the same with your 'about.hbs'
})

// Help section
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Neilsky',
        helpText: 'Help text page'
    })     // must be the same with your 'help.hbs'
})

// Weather section
app.get('/weather', (req, res) => {
    res.send({
        location: 'Las Vegas',
        forecast: 'It is a sunny day.'
    })
})

// When everything goes wrong or cannot find any?
// Has to be the very last entry/section - right before the execution of every page
// '*' wild card as in for everything - other than specified from above

// 404 Help sub section
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neilsky',
        errorMessage: 'Help article not found.'
    })
})

// 404 section
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neilsky',
        errorMessage: 'Page not found.'
    })
})

// Serving up the page to the Browser
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/



// 404 Pages
/*
const path = require('path')
const express = require('express')
// Partials for Handlebars
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')   // case sensitive and explicit
app.set('views', viewsPath)   // dynamically pointing to 'templates' folder
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Neilsky'
    })     // must be the same with your 'index.hbs'
})

// About section
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Neilsky'
    })     // must be the same with your 'about.hbs'
})

// Help section
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Neilsky',
        helpText: 'Help text page'
    })     // must be the same with your 'help.hbs'
})

// Weather section
app.get('/weather', (req, res) => {
    res.send({
        location: 'Las Vegas',
        forecast: 'It is a sunny day.'
    })
})

// When everything goes wrong or cannot find any?
// Has to be the very last entry/section - right before the execution of every page
// '*' wild card as in for everything - other than specified from above

// 404 Help sub section
app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neilsky',
        errorMessage: 'Help article not found'
    })
})

// 404 section
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Neilsky',
        errorMessage: 'Page not found'
    })
})

// Serving up the page to the Browser
app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/



// Advanced Templating
/*
const path = require('path')
const express = require('express')
// Partials for Handlebars
const hbs = require('hbs')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')   // case sensitive and explicit
app.set('views', viewsPath)   // dynamically pointing to 'templates' folder
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Neilsky'
    })     // must be the same with your 'index.hbs'
})

// About section
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Neilsky'
    })     // must be the same with your 'about.hbs'
})

// Help section
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Neilsky',
        helpText: 'Help text page'
    })     // must be the same with your 'help.hbs'
})

// Weather section
app.get('/weather', (req, res) => {
    res.send({
        location: 'Las Vegas',
        forecast: 'It is a sunny day.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/



// Customizing the Views Directory
/*
const path = require('path')
const express = require('express')

const app = express()

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates')

// Setup handlerbars engine and views location
app.set('view engine', 'hbs')   // case sensitive and explicit
app.set('views', viewsPath)   // dynamically pointing to 'templates' folder

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Neilsky'
    })     // must be the same with your 'index.hbs'
})

// About section
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Neilsky'
    })     // must be the same with your 'about.hbs'
})

// Help section
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help text page'
    })     // must be the same with your 'help.hbs'
})

// Weather section
app.get('/weather', (req, res) => {
    res.send({
        location: 'Las Vegas',
        forecast: 'It is a sunny day.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/


// Dynamic Pages with Templating
// Serving up CSS, JS, Images and More
/*
const path = require('path')
const express = require('express')

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.set('view engine', 'hbs')   // case sensitive and explicit
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Neilsky'
    })     // must be the same with your 'index.hbs'
})

// About section
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Neilsky'
    })     // must be the same with your 'about.hbs'
})

// Help section
app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'Help text page'
    })     // must be the same with your 'help.hbs'
})

// Weather section
app.get('/weather', (req, res) => {
    res.send({
        location: 'Las Vegas',
        forecast: 'It is a sunny day.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/



// Serving up Static Assets
/*
const path = require('path')
const express = require('express')

console.log(__dirname)
console.log(path.join(__dirname, '../public'))

const app = express()
const publicDirectoryPath = path.join(__dirname, '../public')

app.use(express.static(publicDirectoryPath))

// Weather section
app.get('/weather', (req, res) => {
    res.send({
        location: 'Las Vegas',
        forecast: 'It is a sunny day.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/


// Serving up HTML and JSON
/*
const express = require('express')
const app = express()

// Root web site
app.get('', (req, res) => {
    res.send('<h1>Weather</h1>')
})

// Serving up JSON object
app.get('/help', (req, res) => {
    // Array
    res.send([{
        name: 'Neil'
    }, {
        name: 'Sarah'
    }])
    // Struct
    res.send({
        name: 'Neil',
        age: 55
    })
})

// About section
app.get('/about', (req, res) => {
    res.send('<h1>About</h1>')
})

// Weather section
app.get('/weather', (req, res) => {
    res.send({
        location: 'Las Vegas',
        forecast: 'It is a sunny day.'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/


// Hello Express!
/*
const express = require('express')
const app = express()

// Root web site
app.get('', (req, res) => {
    res.send('Hello express!')
})

// Help section
app.get('/help', (req, res) => {
    res.send('Help page')
})

// About section
app.get('/about', (req, res) => {
    res.send('About your site')
})

// Weather section
app.get('/weather', (req, res) => {
    res.send('Your Weather')
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})
*/