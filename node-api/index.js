const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("Hello Express is Node js");
});

const user = require("./src/route/user.route");
user(app);


const port = 8081;
app.listen(port, () => {
  console.log("http://localhost:" + port);
});
