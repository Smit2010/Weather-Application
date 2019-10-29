const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

//Define paths for Express Config
const directoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

//Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(directoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Home Page',
        name: 'Smit Jasani'
    })
})
app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, place_name}) => {
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                place_name,
                address: req.query.address
            })
        })
    })
})
app.get('/help', (req, res) => {
    res.render('help', { 
        title: 'Help',
        message: 'help@example.com',
        name: 'Smit Jasani'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Smit Jasani'
    })
})
app.get('/help/*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Smit Jasani',
        errorMessage: 'Help article not found!'
    });
})
app.get('*', (req, res) => {
    res.render('404',{
        title: '404',
        name: 'Smit Jasani',
        errorMessage: '404: Page not found'
    });
})

app.listen(3000, () => {
    console.log('Server is up on port 3000');
});