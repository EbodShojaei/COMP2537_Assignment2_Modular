// Load modules below.
const { router } = require('../config/dependencies');

// @credit greencodecomments
// @see https://github.com/greencodecomments/COMP2537_Demo_Code_1/blob/main/index.js
router.get('/signup', (req, res) => {
    res.render("signup");
});

module.exports = router;