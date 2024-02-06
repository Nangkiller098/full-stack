const controller = require("../controller/employee.controller");
const employee = (app) => {
  app.get("/api/employee/getlist", controller.getlist);
  app.get("/api/employee/getone", controller.getOne);
  app.post("/api/employee/create", controller.create);
  app.post("/api/employee/setPassword", controller.setPassword);
  app.post("/api/employee/login", controller.login);
  app.put("/api/employee/update", controller.update);
  app.delete("/api/employee/delete", controller.remove);
};

module.exports = employee;
