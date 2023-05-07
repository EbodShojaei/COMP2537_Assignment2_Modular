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

/////////////////////////////////
////// END CONFIG SECTION ///////
/////////////////////////////////


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
const { adminRoute, homeRoute, membersRoute, loginRoute, loginSubmitRoute, logoutRoute, signupRoute, signupSubmitRoute, error404Route } = require('./config/routes');

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

// Route declarations below.
app.use('/', homeRoute);
app.use('/signup', signupRoute);
app.use('/signupSubmit', signupSubmitRoute);
app.use('/login', loginRoute);
app.use('/loginSubmit', loginSubmitRoute);
app.use('/logout', logoutRoute);
app.use('/members', membersRoute);
app.use('/admin', adminRoute);
app.use('*', error404Route);

// Once connectDB is resolved by connecting to the MongoDB databases, start the server.
connectDB.then(() => {
    app.listen(port, () => {
        console.log('Node application listening on port ' + port);
    });
});