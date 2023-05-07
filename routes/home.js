// Load modules below.
const { router } = require('../config/dependencies');

router.get('/', (req, res) => {
    res.render("index", { authenticated: req.session.authenticated, name: req.session.name });
});

module.exports = router;