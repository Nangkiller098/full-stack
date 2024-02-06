const order_status_controller = require(`../controller/order_status.controller`);
const order_status = (app) => {
  app.get(`/api/order_status/list`, order_status_controller.getList);
  app.get(`/api/order_status/getone`, order_status_controller.getById);
  app.post(`/api/order_status/create`, order_status_controller.create);
  app.put(`/api/order_status/update`, order_status_controller.update);
  app.delete(`/api/order_status/delete`, order_status_controller.remove);
};
module.exports = order_status;
