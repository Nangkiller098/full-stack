const express = require(`express`);
const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello world");
});

const user = require("./src/route/role.route");
user(app);

const customer = require("./src/route/customer.route");
customer(app);

const category = require("./src/route/category.route");
category(app);

const order_payment_method = require("./src/route/order_payment_method.route");
order_payment_method(app);

const order_status = require("./src/route/order_status.route");
order_status(app);

const employee = require("./src/route/employee.route");
employee(app);

// const product = require("./src/route/product.route");
// product(app);

const port = 8081;
app.listen(port, () => {
  console.log("http://localhost:" + port);
});
