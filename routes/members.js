// Load modules below.
const { router } = require('../config/dependencies');
const { sessionValidation } = require('../public/js/sessionValidation');

router.get('/members', sessionValidation, (req, res) => {
    const name = req.session.name;
    res.render("members", { name: name })
});

module.exports = router;