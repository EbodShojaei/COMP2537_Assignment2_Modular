const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    if (!req.session.authenticated) {
        var html = `
        <button onclick="location.href = window.location.origin + '/login'">Login</button>
        <button onclick="location.href = window.location.origin + '/signup'">Sign Up</button>
        `;
    } else {
        var name = req.session.name;
        var html = `
        <p>Hello, ${name}!</p>
        <button onclick="location.href = window.location.origin + '/members'">Go to Members Area</button>
        <button onclick="location.href = window.location.origin + '/logout'">Logout</button>
        `;
    }

    res.send(html);
});

module.exports = router;