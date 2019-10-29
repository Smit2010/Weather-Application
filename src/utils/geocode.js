const request = require('request');

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(location) + '.json?access_token=pk.eyJ1Ijoic21pdGphc2FuaTciLCJhIjoiY2p6Y3RsdGsxMDBvejNkdWltczZhcHUzbCJ9.3DViTOd5aVyRtjbdD7s1Xg&limit=1';

    request({url: url, json: true}, (error, response) => {
        if(error){
            callback('Unable to reach location! Please check your connection', undefined);
        } else if(response.body.features.length === 0){
            callback('Unable to search provided location! Check your given location!', undefined);
        } else{
            callback(undefined, {
                place_name: response.body.features[0].place_name,
                latitude: response.body.features[0].center[1],
                longitude: response.body.features[0].center[0]
            })
        }
    })
}

module.exports = geocode;