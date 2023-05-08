# COMP2537_Assignment2

Part 2 of Node.js COMP 2537 web series, adding an authorization-gated admin webpage using MongoDB. The web app now features ejs integration and refactoring of routes using express.Router().

##### Part Two:
    > Video: **[Link](https://www.youtube.com/watch?v=28Dz8hnGeKA)**
##### Part One: **[Link](https://github.com/EbodShojaei/COMP2537_Assignment1)**
    > Video: **[Link](https://www.youtube.com/watch?v=naQQbh4W8V8&t=0s)**

<br>

	 Author: Ebod Shojaei
	 Version: 2.0


## Features:
### New
- The /admin page redirects to the /login page if not logged in.
    > - The /admin page shows an error message if logged in, but not an admin
    > - The /admin page shows a list of all users
    > - The /admin page allows for promoting and demoting users to/from admin type
    > - All pages use a CSS Framework like Bootstrap (incorporates a header, footer, responsive grid, forms, buttons)
- The site uses EJS as a templating engine
- Common headers and footers are shared across all pages
- Code used within loop is templated using EJS (ex: list of users in admin page)
- The members page has a responsive grid of 3 images.

### Part One
- A home page links to signup and login, if not logged in; and links to members and signout, if logged in.
	>  **Includes**:
	> - use of parametrized query searches for protection against nosql-injection attacks
	> - use of collation option for case insensitive querying of 'name' in user info to prevent writing duplicate names into the database
	> - use of lowercase method for submitted emails to prevent writing duplicates into the database.

- A members page that displays 1 of 3 random images stored on the server.
	> The members page will redirect to the home page if no valid session is found.

- The signout buttons end the session.

- All secrets, encryption keys, database passwords are stored in a .env file.
	> The .env file is NOT in the git repo for obvious security reasons.

- Password is BCrypted in the MongoDB database.

- The site is hosted on Cyclic, a hosting service.

- A 404 page "catches" all invalid page hits and that sets the status code to 404.

- Session information is stored in an encrypted MongoDB session database. Sessions expire after 1 hour.

<br>

## Resources
- **[COMP2537_Demo_Code_2](https://github.com/greencodecomments/COMP2537_Demo_Code_2/tree/main)** by greencodecomments
	- Used for part 2 setup
<br>

- **[COMP2537_Demo_Code_1](https://github.com/greencodecomments/COMP2537_Demo_Code_1)** by greencodecomments
	- Used for part 1 setup
<br>

- **[ChatGPT-4](https://chat.openai.com/)** by OpenAI
	- Used for debugging