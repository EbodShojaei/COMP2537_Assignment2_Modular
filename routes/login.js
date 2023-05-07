// Load modules below.
const { router } = require('../config/dependencies');

// @credit greencodecomments
// @see https://github.com/greencodecomments/COMP2537_Demo_Code_1/blob/main/index.js
router.get('/login', (req, res) => {
    res.render("login");
});

module.exports = router;