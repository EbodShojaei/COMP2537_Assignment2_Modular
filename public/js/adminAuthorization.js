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
function isAdmin(req) {
    if (req.session.user_type == 'admin') {
        return true;
    }
    return false;
}

function adminAuthorization(req, res, next) {
    if (!isAdmin(req)) {
        res.status(403);
        res.send("Error 403: Access denied!");
        return;
    }
    else {
        next();
    }
}

module.exports = adminAuthorization;