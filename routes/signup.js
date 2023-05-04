const express = require('express');
const router = express.Router();

// @credit greencodecomments
// @see https://github.com/greencodecomments/COMP2537_Demo_Code_1/blob/main/index.js
router.get('/', (req, res) => {
    var html = `
    create user
    <form action='/signupSubmit' method='post'>
        <input name='name' type='text' placeholder='name'>
        <input name='email' type='email' placeholder='email'>
        <input name='password' type='password' placeholder='password'>
        <button>Submit</button>
    </form>
    `;
    res.send(html);
});

module.exports = router;