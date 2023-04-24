# commenting_model

Front-end:

The HTML code defines a comment section, including a form with an input field for users to write comments and a button to submit them. There is also an empty unordered list element where the comments will be displayed.
The CSS code adds some basic styling to the comment section and the comment list.
The JavaScript code handles user input, sends requests to the back-end to save comments, and displays comments on the page. When the user submits a comment, the code disables the input field, sends a POST request to the back-end with the comment data, and if the response is successful, adds the comment to the list and clears the input field. The code also uses websockets to listen for new comments from the back-end and add them to the list in real-time.

Back-end:

The script uses Node.js with the Express framework and MongoDB database to handle incoming requests and store comments.
A Mongoose schema is defined for the Comment model with a single required field for the comment itself.
The Express app is set up with a single route to handle POST requests to /comments. When a comment is received, a new Comment object is created and saved to the database. The code then sends a 201 status code to indicate that the request was successful and broadcasts the new comment to all connected clients using websockets.
The websockets server is created using the ws library, and it listens for incoming connections. When a new client connects, the code sends all the existing comments to that client. When a new comment is received from the front-end, the code broadcasts it to all connected clients.
