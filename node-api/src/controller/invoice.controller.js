const { logError, validation } = require("../config/helper");
const db = require("../config/db");

const getList = async (req, res) => {
  try {
    var sql = "",
      param;
    sql =
      "SELECT" +
      " i.Id," +
      " i.TotalQty ," +
      " i.TotalAmount," +
      " i.TotalPaid," +
      " i.Note ," +
      " i.Status ," +
      " i.CreateAt," +
      " c.Firstname," +
      " c.Lastname," +
      " CONCAT(c.Firstname,'-',c.Lastname) CustomerName," +
      " CONCAT(e.Firstname,'-',e.Lastname) EmployeeName," +
      " pm.Name PaymentMethod," +
      " os.Name OrderStatus" +
      " FROM `invoice` i " +
      " INNER JOIN customer c on(i.CustomerId=c.Id)" +
      " INNER JOIN employee e on (i.EmployeeId=e.id)" +
      " INNER JOIN order_payment_method pm on (i.OrderPaymentMethodId=pm.Id)" +
      " INNER JOIN order_status os on (i.OrderStatusId=os.Id)";
    const [list] = await db.query(sql, param);
    res.json({
      list: list,
    });
  } catch (error) {
    logError("invoice.getList", error, res);
  }
};
const invoice_details = () => {};
module.exports = { getList, invoice_details };
