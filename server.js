// Dependencies 
// ============================================
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const log = console.log;

// Setting up Express App
// ============================================
const app = express();
const PORT = process.env.PORT || 4030;

// Allow Express to handle data parsing
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(bodyParser.text());

app.use(express.static("app/public"));

require("./app/routing/apiRoutes.js")(app);
require("./app/routing/htmlRoutes.js")(app);

// Start our server so that it can begin listening to client requests.
app.listen(PORT, function() {
  // Log (server-side) when our server has started
  log("Server listening on: http://localhost:" + PORT);
});