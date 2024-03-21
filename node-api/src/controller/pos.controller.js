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
    var { Name, CategoryId, Description, Qty, Price, Discount, Status } =
      req.body;

    var Image = null;
    if (req.file) {
      Image = req.file.filename;
    }

    var message = {};
    if (validation(Name)) {
      message.Name = "Name is require.";
    }
    if (validation(Qty)) {
      message.Qty = "Qty is require.";
    }
    if (validation(Price)) {
      message.Price = "Price is require.";
    }

    if (Object.keys(message).length > 0) {
      res.json({
        error: true,
        message: message,
      });
      return false;
    }
    var sql =
      "INSERT INTO product (CategoryId, Name ,Description, Qty, Price, Discount, Image, Status) VALUES (:CategoryId, :Name, :Description, :Qty, :Price, :Discount, :Image, :Status)";
    var param = {
      CategoryId,
      Name,
      Description,
      Qty,
      Price,
      Discount,
      Image,
      Status,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: "Create successfully",
      data,
    });
  } catch (err) {
    logError("product.create", err, res);
  }
};

module.exports = { initInfo, checkout, searchProduct };
