const user_controller = require("../controller/user.controller");
const user = (app) => {
  app.get("/api/user/getList", user_controller.getList);
  app.post("/api/user/create", user_controller.create);
  app.put("/api/user/update", user_controller.update);
  app.delete("/api/user/delete", user_controller.remove);
};
module.exports = user;
