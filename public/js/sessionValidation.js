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
        return true;
    }
    return false;
}

function sessionValidation(req,res,next) {
    if (isValidSession(req)) {
        next();
    }
    else {
        res.redirect('/');
    }
}

module.exports = { isValidSession, sessionValidation };