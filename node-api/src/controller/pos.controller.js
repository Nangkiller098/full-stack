const { logError, validation } = require("../config/helper");
const db = require("../config/db");

const initInfo = async (req, res) => {
  try {
    const [order_payment_method] = await db.query(
      "SELECT * FROM order_payment_method"
    );

    const [customer] = await db.query("SELECT * FROM customer");
    res.json({
      order_payment_method: order_payment_method,
      customer: customer,
    });
  } catch (error) {
    logError("order_payment_method.checkout", error, res);
  }
};

const searchProduct = async (req, res) => {
  try {
    var { txt_search } = req.query;
    var sql = "SELECT * FROM product WHERE 1=1";

    var param = {};

    if (validation(txt_search)) {
      res.json({
        list: [],
      });
      return;
    }

    if (!validation(txt_search)) {
      sql += " AND Name LIKE :txt_search";
      param["txt_search"] = "%" + txt_search + "%";
    }
    const [list] = await db.query(sql, param);
    const [category] = await db.query("SELECT * FROM category");
    res.json({
      list: list,
      category: category,
    });
  } catch (error) {
    logError("order_payment_method.searchProduct", error, res);
  }
};

const checkout = async (req, res) => {
  try {
    var { CustomerId, PaymentMetodId, Product, TotalPaid } = req.body;

    var message = {};
    if (validation(CustomerId)) {
      message.CustomerId = "CustomerId is require.";
    }
    if (validation(PaymentMetodId)) {
      message.PaymentMetodId = "PaymentMetodId is require.";
    }
    if (Product.length == 0) {
      message.Product = "Product is require Please Add Product.";
    }

    if (Object.keys(message).length > 0) {
      res.json({
        error: true,
        message: message,
      });
      return false;
    }

    //find invoice
    var sqlInvoice =
      "INSERT INTO invoice" +
      " (CustomerId,EmployeeId,OrderStatusId,PaymentMethodId,TotalQty,TotalAmount,TotalPaid)" +
      "VALUES" +
      "(:CustomerId,:EmployeeId,:OrderStatusId,:PaymentMethodId,:TotalQty,:TotalAmount,:TotalPaid)";

    var TotalQty, TotalAmmount, TotalPaid;
    var IdProducts = "(1,2,3,4)";

    //find productsorder by product id
    var sqlFIndProductOrder = "SELECT * FROM Product WHERE Id IN :IdProducts";
    const [data] = await db.query(sqlFIndProductOrder, { IdProducts });
    res.json({
      data: data,
    });
    Product.map((item, index) => {});
    var sqlInvoiceParam = {
      CustomerId: CustomerId,
      PaymentMetodId: PaymentMetodId,
      EmployeeId: 1,
      OrderStatusId: 4,
      TotalQty: TotalQty,
      TotalAmount: TotalAmmount,
      TotalPaid: TotalPaid,
    };
    //insert invoice
    //inser invoice_delete
    //re stock in product
    //checkout sucess
  } catch (err) {
    logError("product.create", err, res);
  }
};

module.exports = { initInfo, checkout, searchProduct };
