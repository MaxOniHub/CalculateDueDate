var express = require('express');
require('express-group-routes');
var bodyParser = require('body-parser');
var app = express();
var toolsRouter = require('./routes/toolsRoute')

// add body-parser middleware to be able to read json request body
app.use(bodyParser.urlencoded());
app.use(bodyParser.json());

// add custom routes
app.use('/tools', toolsRouter)

// init port
const PORT = process.env.PORT || 3000


app.listen(PORT, function () {
  console.log(`Server is running on port ${PORT}!`);
});
