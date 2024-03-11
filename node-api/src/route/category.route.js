const category_controller = require("../controller/category.controller");
const category = (app) => {
  app.get("/api/category", category_controller.getList);
  app.get("/api/category", category_controller.getById);
  app.post("/api/category", category_controller.create);
  app.put("/api/category", category_controller.update);
  app.delete("/api/category", category_controller.remove);
};
module.exports = category;
