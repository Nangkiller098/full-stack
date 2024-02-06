const controller = require("../controller/customer.controller");
const customer = (app) => {
  app.get("/api/customer/getlist", controller.getlist);
  app.get("/api/customer/getById", controller.getById);
  app.post("/api/customer/create", controller.create);
  app.put("/api/customer/update", controller.update);
  app.delete("/api/customer/delete", controller.remove);
};

module.exports = customer;
