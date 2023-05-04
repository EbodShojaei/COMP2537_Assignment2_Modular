const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    console.log("on members");
    if (!req.session.authenticated) {
        res.redirect("/");
    } else {
        var name = req.session.name;

        // Generate a random number from 0 to 2
        var randomIndex = Math.floor(Math.random() * 3);
        var hero;

        switch (randomIndex) {
            case 0:
                hero = "/img/flamingPie.jpg";
                break;
            case 1:
                hero = "/img/mindGames.jpg";
                break;
            case 2:
                hero = "/img/plasticBeach.jpg";
                break;
        }

        var html = `
        <h1>Hello, ${name}!</h1>
        <img src='${hero}' style='width:320px;'>
        <br>
        <button onclick="location.href = window.location.origin">Home</button>
        <button onclick="location.href = window.location.origin + '/logout'">Logout</button>
        `;

        res.send(html);
    }
});

module.exports = router;