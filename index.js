/////////////////////////////////
///// START CONFIG SECTION //////
/////////////////////////////////

// Load modules below.
require('dotenv').config();
const { express, session } = require('./config/dependencies');


// Function declarations
const sessionValidation = require('./public/js/sessionValidation');
const adminAuthorization = require('./public/js/adminAuthorization');

// Encrypt the session ID via GUID.
const node_session_secret = process.env.NODE_SESSION_SECRET;

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
var { sessionStore, connectDB } = require('./config/databaseConnection');

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

let userCollection = connectDB.userCollection;
let sessionCollection = connectDB.sessionCollection;

////////////////////////////////
///// START ROUTES SECTION /////
////////////////////////////////

// Declare modular route paths.
const { adminRoute, homeRoute, membersRoute, loginRoute, loginSubmitRoute, logoutRoute, signupRoute, signupSubmitRoute, error404Route } = require('./config/routes');

app.use('/', homeRoute);
app.use('/signup', signupRoute);
app.use('/signupSubmit', signupSubmitRoute);
app.use('/login', loginRoute);
app.use('/loginSubmit', loginSubmitRoute);
app.use('/logout', logoutRoute);
app.use('/members', membersRoute);
app.use('/admin', adminRoute);
app.use('*', error404Route);
