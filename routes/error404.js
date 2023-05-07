// Load modules below.
const { router } = require('../config/dependencies');

router.get("*", (req, res) => {
    res.status(404);
    res.render("404");
});

module.exports = router;