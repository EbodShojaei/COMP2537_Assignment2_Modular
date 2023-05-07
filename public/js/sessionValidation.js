/**
 * Enable session validation as middleware to use in route handlers. 
 * The code is more modular and easier to maintain.
 * 
 * @author Ebod Shojaei
 * @version 1
 * 
 * @credit greencodecomments
 * @see https://github.com/greencodecomments/COMP2537_Demo_Code_2/blob/main/index.js
 */ 
function isValidSession(req) {
    if (req.session.authenticated) {
        console.log('Valid session.');
        return true;
    }
    console.log('Invalid session.');
    return false;
};

function sessionValidation(req, res, next) {
    if (isValidSession(req)) {
        console.log('Continuing valid session...');
        next();
    }
    else {
        console.log('Redirecting invalid session...')
        res.redirect('/');
    }
};

module.exports = { isValidSession, sessionValidation };