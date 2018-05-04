const request = require('request');
request({
    url: 'https://maps.googleapis.com/maps/api/geocode/json?address=Pablo%20Pesati%207487%20Cordoba&key=AIzaSyD-LtIMl7TRcaFH2Atfy2z_hgKoqLZSKRs',
    json: true
}, (error, response, body) => {
    console.log(body);
});