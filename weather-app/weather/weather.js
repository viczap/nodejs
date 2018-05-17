const request = require('request');
const DARK_SKY_API_KEY = 'bfd39daca233d538e84deebb497bd333';

var getWeather = (latitude, longitude, callback) => {
    
    const url = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${latitude},${longitude}?units=si`;

    request({
        url : url,
        json: true
    }, (error, response, body) => {
        if(!error && response.statusCode === 200) {
            callback(undefined, { 
                temperature : body.currently.temperature,
                apparentTemperature : body.currently.apparentTemperature
            });
        } else {
            callback('Unable to fetch weather.');
        }
    });
};

module.exports = {
    getWeather
}