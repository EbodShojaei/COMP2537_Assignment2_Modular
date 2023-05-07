// Load modules below.
const { Joi, router } = require('../config/dependencies');

router.post('/admin/promote', async (req, res) => {
    const { userCollection } = await require('../config/databaseConnection');
    const name = req.body.name;
    const schema = Joi.object(
        {
            // Name represents 'username' so it will be alphanumerical (letters/numbers) 
            name: Joi.string().alphanum().max(20).required()
        });

    const validationResult = schema.validate({ name });

    if (validationResult.error != null) {
        console.log(validationResult.error);

        // Loop through the validation errors and check the context property
        validationResult.error.details.forEach((error) => {

            switch (error.context.key) {
                case "name":
                    console.log('Invalid name.');
                    break;
                case "user_type":
                    console.log('Invalid user type.')
                    break;
                default:
                    // Error 400 for bad request if the validation error is other than 'name' or 'user_type'.
                    res.status(400);
                    const statusCode = '400';
                    const errorMessage = 'Bad request.';

                    res.render("error", { errorMessage: errorMessage, statusCode: statusCode });
                    return;
            }
        })
    } else {
        await userCollection.updateOne({ name: { $eq: name } }, { $set: { user_type: 'admin' } });
        console.log('Member promoted to admin.');

        res.redirect('/admin');
    }
});

module.exports = router;