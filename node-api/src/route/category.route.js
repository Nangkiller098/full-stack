const category_controller = require("../controller/category.controller");
const category = (app) => {
  app.get("/api/category/getList", category_controller.getList);
  app.get("/api/category/getById", category_controller.getById);
  app.post("/api/category/create", category_controller.create);
  app.put("/api/category/update", category_controller.update);
  app.delete("/api/category/delete", category_controller.remove);
};
module.exports = category;
