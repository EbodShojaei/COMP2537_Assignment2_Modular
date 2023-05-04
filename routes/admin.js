const express = require('express');
const router = express.Router();

// Function declarations
const sessionValidation = require('../public/js/sessionValidation');
const adminAuthorization = require('../public/js/adminAuthorization');

router.get('/', sessionValidation, adminAuthorization, async (req, res) => {
    const result = await userCollection.find().project({username: 1, _id: 1}).toArray();
 
    res.render("admin", {users: result});
});

module.exports = router;