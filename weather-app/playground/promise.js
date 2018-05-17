var request = require('request');

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const encodedAddress = encodeURIComponent(address);
        const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}$&key=AIzaSyD-LtIMl7TRcaFH2Atfy2z_hgKoqLZSKRs`; 
        console.log(url);
        
        request({
            url: url,
            json: true
        }, (error, response, body) => {
            if(error) {
                reject('Unable to connect to the Google Servers.');
            } else if(body.status === 'ZERO_RESULTS') {
                reject('Unable to fetch data with the current address.');
            } else if(body.status === 'OK') {
                resolve({
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng
                });
            }
        });
    });
};

geocodeAddress('Donato Alvarez 8200 Cordoba')
    .then((location) => {
        console.log(JSON.stringify(location, undefined, 2)); 
    }).catch((errorMessage) => {
        console.log(errorMessage);
    });