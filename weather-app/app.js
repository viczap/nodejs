const yargs = require('yargs');
const geocode = require('./geocode/geocode');
const weather = require('./weather/weather');

const argv = yargs
    .options({
        a : {
            alias : 'address',
            describe : 'The address you are looking for',
            string: true,
            demandOption: true
        }
    })
    .help().alias('h', 'help')
    .argv;

geocode.geocodeAddress(argv.address, (errorMessage, results) => {
    if(errorMessage) {
        console.log(errorMessage);
    } else {
        console.log(`Address: ${results.address}`);
        weather.getWeather(results.latitude, results.longitude, (errorMessage, results) => {
            if(errorMessage) {
                console.log(errorMessage);
            } else {
                console.log(`It's currently ${results.temperature} ºC and it feels like ${results.apparentTemperature} ºC`);
            }
        });
    }
});