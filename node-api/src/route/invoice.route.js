const ctr_invoice = require("../controller/invoice.controller");
const invoice = (app) => {
  app.get("/api/invoice", ctr_invoice.getList);
  app.get("/api/invoice_details/:Id", ctr_invoice.invoice_details);
};

module.exports = invoice;
