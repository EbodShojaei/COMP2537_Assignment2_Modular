// Load modules below.
const { router } = require('../config/dependencies');

router.get('/', (req, res) => {
    req.session.destroy();

    var html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta http-equiv="refresh" content="3;url=/">
      </head>
      <body>
        <p>Logged out successfully. Redirecting to homepage...</p>
      </body>
    </html>
  `;

    res.send(html);
});

module.exports = router;