const user_controller = require("../controller/role.controller");
const user = (app) => {
  app.get("/api/role/getList", user_controller.getList);
  app.post("/api/role/create", user_controller.create);
  app.put("/api/role/update", user_controller.update);
  app.delete("/api/role/delete", user_controller.remove);
};
module.exports = user;
