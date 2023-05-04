const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const Joi = require('joi');
const { userCollection } = require('../config/databaseConnection');

// @author greencodecomments
// @see https://github.com/greencodecomments/COMP2537_Demo_Code_1/blob/main/index.js
router.post('/', async (req, res) => {
    var email = req.body.email.toLowerCase();
    var password = req.body.password;

    // Define the schema (validation criteria) of the user info.
    const schema = Joi.object(
        {
            email: Joi.string().email().max(20).required(),
            password: Joi.string().max(20).required()
        });

    const validationResult = schema.validate({ email, password });

    if (validationResult.error != null) {
        console.log(validationResult.error);

        // Loop through the validation errors and check the context property
        validationResult.error.details.forEach((error) => {

            switch (error.context.key) {
                case "email":
                    if (email.trim() == "") {
                        var html = `
                        <p>Email required.</p>
                        <a href="/login">Try again</a>
                        `;
                    } else {
                        var html = `
                        <p>Email must be 20 characters or less and not contain any illegal characters.</p>
                        <a href="/login">Try again</a>
                        `;
                    }
                    break;
                case "password":
                    if (password.trim() == "") {
                        var html = `
                        <p>Password required.</p>
                        <a href="/login">Try again</a>
                        `;
                    } else {
                        var html = `
                        <p>Password must be 20 characters or less and not contain any illegal characters.</p>
                        <a href="/login">Try again</a>
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
    } else {
        // Search the collection for a matching user.
        const result = await userCollection.find({ email: { $eq: email } }).project({ name: 1, email: 1, password: 1, _id: 1 }).toArray();

        // Check the collection for a matching user. If none, redirect.
        console.log(result);

        if (result.length != 1) {
            console.log("user not found");
            var html = `
            <p>User not found.</p>
            <a href="/login">Try again</a>
            `;

            res.send(html);
            return;
        }

        if (await bcrypt.compare(password, result[0].password)) {
            console.log("correct password");

            req.session.authenticated = true;
            req.session.name = result[0].name;
            req.session.cookie.maxAge = expireTime;

            var html = `
            <!DOCTYPE html>
            <html>
              <head>
                <meta http-equiv="refresh" content="3;url=/members">
              </head>
              <body>
                <p>Logged in successfully. Redirecting to members page...</p>
              </body>
            </html>
          `;

            res.send(html);
            return;
        } else {
            console.log("incorrect password");
            var html = `
            <p>Invalid email/password combination.</p>
            <a href="/login">Try again</a>
            `;

            res.send(html);
            return;
        }
    }
});

module.exports = router;