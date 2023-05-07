// Load modules below.
const { bcrypt, saltRounds, Joi, router } = require('../config/dependencies');

// @credit greencodecomments
// @see https://github.com/greencodecomments/COMP2537_Demo_Code_1/blob/main/index.js
router.post('/', async (req, res) => {
    var name = req.body.name;

    // Store the email in lowercase to avoid duplicate emails capitalized differently.
    var email = req.body.email.toLowerCase();
    var password = req.body.password;

    const schema = Joi.object(
        {
            // Name represents 'username' so it will be alphanumerical (letters/numbers) 
            name: Joi.string().alphanum().max(20).required(),
            email: Joi.string().email().max(20).required(),
            password: Joi.string().max(20).required()
        });

    const validationResult = schema.validate({ name, email, password });

    if (validationResult.error != null) {
        console.log(validationResult.error);

        // Loop through the validation errors and check the context property
        validationResult.error.details.forEach((error) => {

            switch (error.context.key) {
                case "name":
                    if (name.trim() == "") {
                        var html = `
                        <p>Name required.</p>
                        <a href="/signup">Try again</a>
                        `;
                    } else {
                        var html = `
                        <p>Invalid name.</p>
                        <a href="/signup">Try again</a>
                        `;
                    }
                    break;
                case "email":
                    if (email.trim() == "") {
                        var html = `
                        <p>Email required.</p>
                        <a href="/signup">Try again</a>
                        `;
                    } else {
                        var html = `
                        <p>Email must be 20 characters or less and not contain any illegal characters.</p>
                        <a href="/signup">Try again</a>
                        `;
                    }
                    break;
                case "password":
                    if (password.trim() == "") {
                        var html = `
                        <p>Password required.</p>
                        <a href="/signup">Try again</a>
                        `;
                    } else {
                        var html = `
                        <p>Password must be 20 characters or less and not contain any illegal characters.</p>
                        <a href="/signup">Try again</a>
                        `;
                    }
                    break;
                default:
                    // Error 400 for bad request if the validation error is other than 'name', 'email', and 'password'.
                    var html = "Error 400: Invalid request!"
                    res.status(400);
            }

            res.send(html);
        })

        return;
    }

    // Parametrized query treats user input as plain data and not code, so as to defend against injection attacks.
    // $eq looks for an exact match and requires collation for case-insensitive query. 
    //
    // The user input values are passed as parameters. They can no longer contain an executable code since the 
    // parameter is treated as a literal value and checked for the type and length (NOTE: 'name' is being treated 
    // as a username, so it must be unique).
    //
    // @credit Debugged by ChatGPT-4
    // @see https://www.sqlshack.com/using-parameterized-queries-to-avoid-sql-injection/
    const nameResult = await userCollection.find({ name: { $eq: name } }, { collation: { locale: 'en_US', strength: 2 } }).project({ name: 1, email: 1, password: 1, _id: 1 }).toArray();

    const emailResult = await userCollection.find({ email: { $eq: email } }).project({ name: 1, email: 1, password: 1, _id: 1 }).toArray();

    if (nameResult.length == 1) {
        console.log("Name already in use.");

        var html = `
        <p>Name already in use.</p>
        <a href="/signup">Try again</a>
        `;

        res.send(html);
        return;
    } else if (emailResult.length == 1) {
        console.log("Email already in use.");

        var html = `
        <p>Email already in use.</p>
        <a href="/signup">Try again</a>
        `;

        res.send(html);
        return;
    } else {
        // Encrypt the password of the new account to store.
        var hashedPassword = await bcrypt.hash(password, saltRounds);

        var html = `
                <!DOCTYPE html>
                <html>
                  <head>
                    <meta http-equiv="refresh" content="3;url=/members">
                  </head>
                  <body>
                    <p>User created successfully. Redirecting to members page...</p>
                  </body>
                </html>
              `;

        // Create a unique index with a case-insensitive collation on the name field
        await userCollection.createIndex(
            { name: 1 },
            { unique: true, collation: { locale: "en_US", strength: 2 } }
        );

        // Set user_type to 'user' by default on sign-up (NOTE: No need to sanitize a hard-coded explicit literal).
        await userCollection.insertOne({ name: name, email: email, password: hashedPassword, user_type: 'user' });

        console.log("Inserted user");

        req.session.authenticated = true;
        req.session.name = name;
        req.session.cookie.maxAge = expireTime;

        res.send(html);
    }
});

module.exports = router;