/////////////////////////////////
///// START CONFIG SECTION //////
/////////////////////////////////

// Load modules below.
require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoDBSession = require('connect-mongodb-session')(session);
const bcrypt = require('bcrypt');
const saltRounds = 12;
const Joi = require('joi');


// Function declarations
const sessionValidation = require('./public/js/sessionValidation');
const adminAuthorization = require('./public/js/adminAuthorization');

// Encrypt the session ID via GUID.
const node_session_secret = process.env.NODE_SESSION_SECRET;

// Max session time set to expire after 1 hour in milliseconds (n = 3600000).
const expireTime = 60 * 60 * 1000;

// Port declaration below. Defaults to 3020 if system variable PORT not set.
const port = process.env.PORT || 3020;

// Calling Express.
const app = express();

// Enable ejs middleware.
app.set('view engine', 'ejs');

// Defining directory to serve image files.
app.use(express.static(__dirname + '/public'));

// The express.urlencoded middleware is used to parse incoming request bodies.
app.use(express.urlencoded({ extended: true }));

/////////////////////////////////
////// END CONFIG SECTION ///////
/////////////////////////////////


// Declare database connections.
const { sessionStore, userCollection, sessionCollection, connectDB } = require('./config/databaseConnection');

// Once connectDB is resolved by connecting to the MongoDB databases, start the server.
connectDB.then(() => {
    app.listen(port, () => {
        console.log('Node application listening on port ' + port);
    });
});

// Setup session support to enable storing session data.
app.use(session({
    secret: node_session_secret,
    store: sessionStore,
    saveUninitialized: false,
    resave: true
}
));


////////////////////////////////
///// START ROUTES SECTION /////
////////////////////////////////

// Declare modular route paths.
const routes = require('./config/routes');

const homeRoute = routes.homeRoute;
const signupRoute = routes.signupRoute;
const signupSubmitRoute = routes.signupSubmitRoute;
const loginRoute = routes.loginRoute;
const loginSubmitRoute = routes.loginSubmitRoute;
const logoutRoute = routes.logoutRoute;
const membersRoute = routes.membersRoute;
const adminRoute = routes.adminRoute;
const error404Route = routes.error404Route;

app.use('/', homeRoute);
app.use('/signup', signupRoute);
app.use('/signupSubmit', signupSubmitRoute);
app.use('/login', loginRoute);
app.use('/loginSubmit', loginSubmitRoute);
app.use('/logout', logoutRoute);
app.use('/members', membersRoute);
app.use('/admin', adminRoute);
app.use('*', error404Route);
