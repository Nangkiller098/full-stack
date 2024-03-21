const ctr_pos = require("../controller/pos.controller");
const pos = (app) => {
  app.get("/api/pos/initInfo", ctr_pos.initInfo);
  app.get("/api/pos/searchProduct", ctr_pos.searchProduct);
  app.post("/api/pos/checkout", ctr_pos.checkout);
};
module.exports = pos;
