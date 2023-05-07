/**
 * Enable admin authorization as middleware to use in route handlers requiring admin. 
 * The code is more modular and easier to maintain.
 * 
 * @author Ebod Shojaei
 * @version 1
 * 
 * @credit greencodecomments
 * @see https://github.com/greencodecomments/COMP2537_Demo_Code_2/blob/main/index.js
 */
const { isValidSession } = require('./sessionValidation');

function isAdmin(req) {
    if (req.session.user_type == 'admin') {
        console.log('Admin authorized.');
        return true;
    }
    console.log('User not authorized.');
    return false;
};

function adminAuthorization(req, res, next) {
    if (!isValidSession(req)) {
        res.redirect('/login');
        return;
    }

    if (!isAdmin(req)) {
        res.status(403);
        const statusCode = '403';
        const errorMessage = 'Access denied.';

        res.render("error", { errorMessage: errorMessage, statusCode: statusCode });
        return;
    } 
    
    next();
};

module.exports = { isAdmin, adminAuthorization };