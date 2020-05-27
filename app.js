const express = require('express');
const cookieParser = require('cookie-parser')
const data = require('./data.json');
const os = require('os'); //to get hostname
const path = require('path')
const colors = require('colors') //to help make our console logged errors fun
const logger = require('morgan'); //for logging, while right now this only logs to the console, this could help in logging to /var/log/www or some other
const projectRoute = require('./routes/index')
const error404Handler = require('./routes/errorHandler')


const app = express();
const PORT = 3000; //so we can dynamically set this in the future

app.use(logger('dev')) // morgan does a nicer job logging than a simple console log
app.use(cookieParser())

app.set('view engine', 'pug');

app.use(express.static(path.join(__dirname, 'public')))

app.use((req, res, next)=>{
    res.locals.cookies = req.cookies
    next()
})

app.get('/', (req, res) => {
    res.render('index', data)
})

app.get('/about', (req, res) => {
    res.render('about', data)
})

app.use('/projects', projectRoute);

app.use('*', error404Handler)

app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500
    data.error = err
    //I'm adding the following console log to make sure I hit meets expectations here, I would think the logger added above would be sufficient, just covering my bases
    console.log(`User attempted to get page ${req.originalUrl.underline.red} but received this message in the browser: ${err.message.red}`)
    res.status(err.statusCode).render('error', data)
})


app.listen(PORT, ()=> {
    console.log(`Server running on ${os.hostname()}:${PORT}`)
})