const request = require('request');

var geocodeAddress = (address, callback) => {
    const encodedAddress = encodeURIComponent(address);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}$&key=AIzaSyD-LtIMl7TRcaFH2Atfy2z_hgKoqLZSKRs`; 
    console.log(url);
    
    request({
        url: url,
        json: true
    }, (error, response, body) => {
        if(error) {
            callback('Unable to connect to the Google Servers.');
        } else if(body.status === 'ZERO_RESULTS') {
            callback('Unable to fetch data with the current address.');
        } else if(body.status === 'OK') {
            //To prettyfy the results:
            //console.log(JSON.stringify(body, undefined, 2));
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
}

module.exports = {
    geocodeAddress
};