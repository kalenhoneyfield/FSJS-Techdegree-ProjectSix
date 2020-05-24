const express = require('express');
const data = require('./data.json');
const os = require('os'); //to get hostname
const path = require('path'); 
const logger = require('morgan');
const projectRoute = require('./routes/index')


const app = express();
const PORT = 3000; //so we can dynamically set this in the future

app.use(logger('dev')) // morgan does a nicer job logging than a simple console log

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')))

app.get('/', (req, res) => {
    res.render('index', data)
})

app.get('/about', (req, res) => {
    res.render('about', data)
})

app.use('/projects', projectRoute);

app.listen(PORT, ()=> {
    console.log(`Server running on ${os.hostname()}:${PORT}`)
})