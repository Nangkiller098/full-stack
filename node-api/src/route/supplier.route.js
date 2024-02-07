const supplier_controller = require("../controller/supplier.controller");
const supplier = (app) => {
  app.get("/api/supplier/getList", supplier_controller.getList);
  app.get("/api/supplier/getById", supplier_controller.getById);
  app.post("/api/supplier/create", supplier_controller.create);
  app.put("/api/supplier/update", supplier_controller.update);
  app.delete("/api/supplier/delete", supplier_controller.remove);
};
module.exports = supplier;
