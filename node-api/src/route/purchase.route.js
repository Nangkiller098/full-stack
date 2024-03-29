const product_controller = require("../controller/product.controller");
const product = (app) => {
  app.get("/api/product/getList", product_controller.getList);
  app.get("/api/product/getById", product_controller.getById);
  app.post("/api/product/create", product_controller.create);
  app.put("/api/product/update", product_controller.update);
  app.delete("/api/product/delete", product_controller.remove);
};
module.exports = product;
