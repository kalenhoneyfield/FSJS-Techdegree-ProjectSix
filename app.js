const express = require('express');
const data = require('./data.json');
const os = require('os'); //to get hostname
const path = require('path'); 
const logger = require('morgan')


const app = express();
const PORT = 3000;
app.use(logger('dev'))

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')))


app.listen(PORT, ()=> {
    console.log(`Server running on ${os.hostname()}:${PORT}`)
})