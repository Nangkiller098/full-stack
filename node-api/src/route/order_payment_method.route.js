const order_payment_method_controller = require(`../controller/order_payment_method.controller`);
const order_payment_method = (app) => {
  app.get(
    `/api/order_payment_method/list`,
    order_payment_method_controller.getList
  );
  app.get(
    `/api/order_payment_method/getone`,
    order_payment_method_controller.getById
  );
  app.post(
    `/api/order_payment_method/create`,
    order_payment_method_controller.create
  );
  app.put(
    `/api/order_payment_method/update`,
    order_payment_method_controller.update
  );  
  app.delete(
    `/api/order_payment_method/delete`,
    order_payment_method_controller.remove
  );
};
module.exports = order_payment_method;
