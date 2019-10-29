const request = require('request');

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/590264b7ce09ec93e97d98ef7d7aed04/' + latitude + ',' + longitude + '?units=si';

    request({
        url: url,
        json: true
    }, (error, response) => {
        if (error) {
            callback('Unable to reach location! Please check your connection', undefined);
        } else if (response.body.error) {
            callback('Unable to search weather for the provided location! Check your given location!', undefined);
        } else {
            callback(undefined, {
                temperature: response.body.currently.temperature
            })
        }
    })
}

module.exports = forecast;