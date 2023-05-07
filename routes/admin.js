// Load modules below.
const { router } = require('../config/dependencies');

// Function declarations
const { sessionValidation } = require('../public/js/sessionValidation');
const { adminAuthorization } = require('../public/js/adminAuthorization');

router.get('/admin', adminAuthorization, sessionValidation, async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    const result = await userCollection.find().project({ name: 1, user_type: 1, _id: 1 }).toArray();
    res.render("admin", { users: result });
});

module.exports = router;