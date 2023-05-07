// Load modules below.
const { router } = require('../config/dependencies');

router.get("/", (req, res) => {
    res.status(404);
    res.send("Error 404: Page not found!");
});

module.exports = router;