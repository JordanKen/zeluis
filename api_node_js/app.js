require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');
const errorHandler = require('./helpers/errorHandler.helpers');
const path = require('path')

// ADMIN Routes
const userRoutes = require('./api/routes/user.route');
const walletRoutes = require('./api/routes/wallet.route');
const certifRoutes = require('./api/routes/certif.route');
const cors = require('cors');

// App initialization
const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ limit: '50mb' }));
app.use(bodyParser.urlencoded({extended:true,limit:'50mb'}))
app.use(morgan('dev'))

app.use(errorHandler);
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}))

//app public route
app.use('/api/v1/auth/users', userRoutes);
app.use('/api/v1/wallet', walletRoutes);
app.use('/api/v1/certification', certifRoutes);

app.use(express.static('public'));
app.get(express.static(__dirname+'/public'));
app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error)
})

app.use((error, req, res, next) => {
    res.status(error.status || 500)
    res.json({
        error: {
            message: error.message
        }
    })
})


// Start the app
let port = process.env.PORT || 3000
console.log(port)
app.listen(3000, function() {
    console.log(`Server Started on port: 3000`)
})
