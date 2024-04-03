const controller = require("../controller/customer.controller");
const { CheckToken } = require("../controller/employee.controller");
const customer = (app) => {
  app.get("/api/customer/getlist", CheckToken(), controller.getlist);
  app.get("/api/customer/getById", CheckToken(), controller.getById);
  app.post("/api/customer/create", CheckToken(), controller.create);
  app.put("/api/customer/update", CheckToken(), controller.update);
  app.delete("/api/customer/delete", CheckToken(), controller.remove);
};

module.exports = customer;
