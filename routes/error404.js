const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.status(404);
    res.send("Error 404: Page not found!");
});

module.exports = router;