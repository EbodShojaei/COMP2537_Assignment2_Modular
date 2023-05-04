/**
 * All the routes for each webpage goes here.
 * 
 * @author Ebod Shojaei
 * @version 2
 */

// Modular route paths declared below.
// @credit PedroTech 'Separating Routes into Different Files'
// @see https://www.youtube.com/watch?v=0Hu27PoloYw
const adminRoute = require('../routes/admin');
const homeRoute = require('../routes/home');
const membersRoute = require('../routes/members');
const loginRoute = require('../routes/login');
const loginSubmitRoute = require('../routes/loginSubmit');
const logoutRoute = require('../routes/logout');
const signupRoute = require('../routes/signup');
const signupSubmitRoute = require('../routes/signupSubmit');
const error404Route = require('../routes/error404')

module.exports = { adminRoute, homeRoute, membersRoute, loginRoute, loginSubmitRoute, logoutRoute, signupRoute, signupSubmitRoute, error404Route };