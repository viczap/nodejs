const yargs = require('yargs');
const axios = require('axios');
const DARK_SKY_API_KEY = 'bfd39daca233d538e84deebb497bd333';

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

const encodedAddress = encodeURIComponent(argv.address);
const locationUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}$&key=AIzaSyD-LtIMl7TRcaFH2Atfy2z_hgKoqLZSKRs`; 

axios.get(locationUrl).then((response) => {
    var latitude = response.data.results[0].geometry.location.lat;
    var longitude = response.data.results[0].geometry.location.lng;
    console.log(response.data.results[0].formatted_address);
    const weatherUrl = `https://api.darksky.net/forecast/${DARK_SKY_API_KEY}/${latitude},${longitude}?units=si`;
    return axios.get(weatherUrl);
}).then((response) => {
    var temp = response.data.currently.temperature
    var apparentTemp = response.data.currently.apparentTemperature
    console.log(`It's currently ${temp} ºC and it feels like ${apparentTemp} ºC`);
});