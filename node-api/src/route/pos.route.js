const ctr_pos = require("../controller/pos.controller");
const { CheckToken } = require("../controller/employee.controller");
const pos = (app) => {
  app.get("/api/pos/initInfo", CheckToken(), ctr_pos.initInfo);
  app.get("/api/pos/searchProduct", CheckToken(), ctr_pos.searchProduct);
  app.post("/api/pos/checkout", CheckToken(), ctr_pos.checkout);
};
module.exports = pos;
