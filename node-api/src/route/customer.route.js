const customer_controller = require(`../controller/customer.controller`);
const customer = (app) => {
  app.get(`/api/customer/list`, customer_controller.getList);
  app.get(`/api/customer/create`, customer_controller.create);
  app.get(`/api/customer/update`, customer_controller.update);
  app.get(`/api/customer/delete`, customer_controller.remove);
};
module.exports = customer;
