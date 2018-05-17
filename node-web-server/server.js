const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('currentYear', () => {
    return new Date().getFullYear();
});

app.set('view engine', 'hbs');

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log, (err) => {
        if(err) {
            console.log(err.message);
        }
    });
    next();
});

app.use((req, res, next) => {
    res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle : 'Home Page',
        welcomeMessage : 'Welcome to my website'
    });
});

app.get('/some-data', (req, res) => {
    res.send({
        firstName : 'Victor',
        lastName: 'Zapata',
        age: 31
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMenssage : 'Something is wrong.'
    });    
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle : 'About Page'
    });
});

app.listen(3000, () => {
    console.log('Application started at port 3000....');
});