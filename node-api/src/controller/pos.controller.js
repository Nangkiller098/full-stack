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
        user_request: req.user,
      });
      console.log(user_request);
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
    logError("pos.searchProduct", error, res);
  }
};

const checkout = async (req, res) => {
  var con = await db.getConnection();
  try {
    await con.beginTransaction();
    var {
      CustomerId,
      PaymentMethodId,
      TotalPaid,
      Product, // [{},{}]
    } = req.body;
    var message = {};
    if (validation(CustomerId)) {
      message.CustomerId = "CustomerId required!";
    }
    if (validation(PaymentMethodId)) {
      message.PaymentMethodId = "PaymentMethodId required!";
    }
    if (Product.length == 0) {
      message.Product = "Please Add Product to order!";
    }
    if (Object.keys(message).length > 0) {
      res.json({
        error: true,
        message: message,
      });
      return false;
    }
    var TotalQty = 0;
    var idProduct = [];
    Product.map((item, index) => {
      idProduct.push(item.Id);
      TotalQty += item.QtyOrder;
    });
    idProduct.join(",").toString();
    var sqlFindProductOrder = "SELECT * FROM Product WHERE Id IN (:idProduct) ";
    const [data] = await db.query(sqlFindProductOrder, {
      idProduct: idProduct,
    });

    var TotalAmount = 0;
    data.map((item, index) => {
      var QtyOrderTmp = 0;

      //override
      Product.map((item1, index1) => {
        if (item.Id == item1.Id) {
          QtyOrderTmp = Number(item1.QtyOrder);
          Product[index].Price = Number(item.Price);
          Product[index].QtyOrder = Number(item1.QtyOrder);
          Product[index].Discount = Number(item.Discount);
        }
      });

      //discount price
      var DisPrice =
        (QtyOrderTmp * Number(item.Price) * Number(item.Discount)) / 100;

      TotalAmount += QtyOrderTmp * Number(item.Price) - DisPrice;
    });

    // get data from fronend
    var sqlInvoice =
      "INSERT INTO invoice " +
      " (CustomerId,EmployeeId,OrderStatusId,OrderPaymentMethodId,TotalQty,TotalAmount,TotalPaid) " +
      " VALUES " +
      " (:CustomerId,:EmployeeId,:OrderStatusId,:OrderPaymentMethodId,:TotalQty,:TotalAmount,:TotalPaid) ";
    var OrderStatusId = TotalPaid < TotalAmount ? 3 : 4;
    var sqlInvoiceParam = {
      CustomerId: CustomerId,
      EmployeeId: req.user_id,
      OrderStatusId: OrderStatusId,
      OrderPaymentMethodId: PaymentMethodId,
      TotalQty: TotalQty,
      TotalAmount: TotalAmount,
      TotalPaid: TotalPaid,
    };
    var [dataInvoice] = await db.query(sqlInvoice, sqlInvoiceParam); // create invoice

    Product.map(async (item, index) => {
      // insert data to invoice details
      var sqlInvoiceDetails =
        " INSERT INTO invoice_details " +
        " (InvoiceId,ProductId,Qty,Price,Discount) " +
        " VALUES " +
        " (:InvoiceId,:ProductId,:Qty,:Price,:Discount) ";

      var sqlInvoiceDetailsParam = {
        InvoiceId: dataInvoice.insertId,
        ProductId: item.Id,
        Qty: item.QtyOrder,
        Price: item.Price,
        Discount: item.Discount,
      };

      var [sqlInvoiceDetails] = await db.query(
        sqlInvoiceDetails,
        sqlInvoiceDetailsParam
      );

      // restok in product
      var sqlProductStock =
        " UPDATE product SET Qty=(Qty-:QtyOrder) WHERE Id = :Id ";

      var sqlProductStockParam = {
        QtyOrder: item.QtyOrder,
        Id: item.Id,
      };
      var [sqlProductStock] = await db.query(
        sqlProductStock,
        sqlProductStockParam
      );
    });
    await con.commit();
    res.json({
      message: "Order Success",
    });
    console.log(res.json());
  } catch (err) {
    await con.rollback();
    logError("pos.checkout", err, res);
  }
};
module.exports = { initInfo, checkout, searchProduct };
