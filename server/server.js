// initialize Express in project
const express = require('express');
const app = express();

// NEW CODE
// when the server receives a GET request to '/'
app.get('/', (req, res) => {
    // send some text back as a response
    res.send('Express is running!');
});
// END OF NEW CODE

// start Express on port 8080
app.listen(8080, () => {
    console.log('Server Started on http://localhost:8080');
    console.log('Press CTRL + C to stop server');
});