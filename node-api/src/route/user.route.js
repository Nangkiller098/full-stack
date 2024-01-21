const user_controller = require("../controller/user.controller");
const user = (app) => {
  app.get("/api/user/getList", user_controller.getList);
  app.get("/api/user/create", user_controller.create);
  app.get("/api/user/update", user_controller.update);
  app.get("/api/user/remove", user_controller.remove);
  app.get("/api/user/blockUser", user_controller.blockUser);
};
module.exports = user;
