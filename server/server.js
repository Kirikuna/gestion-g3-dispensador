const express = require("express");
const routes = require('./routes/index');
const cors = require('cors');
const app = express();

app.use(express.json());

app.use(cors())

// Configuring port
const port = process.env.PORT || 9000;

// respond with "hello world" when a GET request is made to the homepage
app.get("/", (req, res) => {
  res.send("hello world trigger");
});
routes(app);

// Listening to port
app.listen(port);
console.log(`Listening On http://localhost:${port}`);

module.exports = app;
