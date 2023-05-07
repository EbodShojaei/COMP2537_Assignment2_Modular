// Load modules below.
const { router } = require('../config/dependencies');

// @credit greencodecomments
// @see https://github.com/greencodecomments/COMP2537_Demo_Code_1/blob/main/index.js
router.get('/', (req, res) => {
    var html = `
    log in
    <form action='/loginSubmit' method='post'>
        <input name='email' type='email' placeholder='email'>
        <input name='password' type='password' placeholder='password'>
        <button>Submit</button>
    </form>
    `;
    res.send(html);
});

module.exports = router;