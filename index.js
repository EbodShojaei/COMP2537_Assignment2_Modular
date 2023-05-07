/////////////////////////////////
///// START CONFIG SECTION //////
/////////////////////////////////

// Load modules below.
require('dotenv').config();
const { express, session, url } = require('./config/dependencies');

// Declare database connections.
const { connectDB, sessionStore } = require('./config/databaseConnection');

// Function declarations
const { isValidSession } = require('./public/js/sessionValidation');
const { isAdmin } = require('./public/js/adminAuthorization');

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

// Setup session support to enable storing session data.
app.use(session({
    secret: node_session_secret,
    store: sessionStore,
    saveUninitialized: false,
    resave: true
}
));

/////////////////////////////////
////// END CONFIG SECTION ///////
/////////////////////////////////


/////////////////////////////////
////// MIDDLEWARE SECTION ///////
/////////////////////////////////

// Navlinks and currentURL are used to determine which navlinks to display in the header.
app.use('/', (req, res, next) => {
    const navLinks = (isAdmin(req) && isValidSession(req)) ? // Is an admin with a valid session logged in?
        [
            { route: "Home", link: "/" },
            { route: "Members", link: "/members" },
            { route: "Admin", link: "/admin" },
            { route: "Logout", link: "/logout" }
        ]
        : (!isAdmin(req) && isValidSession(req)) ? // Else, is a user with a valid session logged in?
            [
                { route: "Home", link: "/" },
                { route: "Members", link: "/members" },
                { route: "Logout", link: "/logout" }
            ]
            : [
                { route: "Home", link: "/" },
                { route: "Login", link: "/login" },
                { route: "Sign Up", link: "/signup" }
            ]; // No user here, go home.

    app.locals.navLinks = navLinks;
    app.locals.currentURL = url.parse(req.url).pathname;
    next();
});

// Modular route paths declared below.
// @credit PedroTech 'Separating Routes into Different Files'
// @see https://www.youtube.com/watch?v=0Hu27PoloYw
app.use('/', require('./routes/home'));
app.use('/signup', require('./routes/signup'));
app.use('/signupSubmit', require('./routes/signupSubmit'));
app.use('/login', require('./routes/login'));
app.use('/loginSubmit', require('./routes/loginSubmit'));
app.use('/logout', require('./routes/logout'));
app.use('/members', require('./routes/members'));
app.use('/admin', require('./routes/admin'));
app.use('/admin/promote', require('./routes/adminPromote'));
app.use('/admin/demote', require('./routes/adminDemote'));
app.use('*', require('./routes/error404'));

// Once connectDB is resolved by connecting to the MongoDB databases, start the server.
connectDB.then(() => {
    app.listen(port, () => {
        console.log('Node application listening on port ' + port);
    });
});
