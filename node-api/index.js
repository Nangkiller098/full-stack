const express = require(`express`);
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});
const port = 8081;
const user = require("./src/route/user.route");
user(app);
const customer = require("./src/route/customer.route");
customer(app);
app.listen(port, () => {
  console.log("http://localhost:" + port);
});
