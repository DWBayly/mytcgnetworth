const PORT          = 8080;
const express       = require("express");
const bodyParser    = require("body-parser");
const app           = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

//home page GET(/)
app.get("/", (req, res) => {
  res.send('MAIN PAGE');
});

//Login  page GET(/login)
app.get("/", (req, res) => {
  res.send('LOGIN');
});

//Login POST(/login)
//Create Profile Page GET(/register)
//user profile GET(/:userid)
//user collection POST(/:userid/collection)
//add to collection Post(/:userid/collection)
