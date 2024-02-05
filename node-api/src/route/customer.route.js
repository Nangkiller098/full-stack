const controller = require("../controller/customer_controller");
const customer = (app) => {
  app.get("/api/customer/getlist", controller.getlist);
  app.post("/api/customer/create", controller.create);
  app.put("/api/customer/update", controller.update);
  app.delete("/api/customer/delete", controller.remove);
};

module.exports = customer;
