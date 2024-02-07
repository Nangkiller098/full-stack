const { logError, validation } = require("../config/helper");
const db = require("../config/db");

const getList = async (req, res) => {
  try {
    const [list] = await db.query("SELECT * FROM product ");
    res.json({
      list: list,
    });
  } catch (error) {
    logError("product.getList", error, res);
  }
};
const getById = async (req, res) => {
  try {
    var param = {
      Id: req.body.Id,
    };
    var sql = "SELECT * FROM product WHERE Id=:Id";
    const data = await db.query(sql, param);
    res.json({
      data: data,
    });
  } catch (error) {
    logError("product.getList", error, res);
  }
};

const create = async (req, res) => {
  // CategoryId,Name ,Description, Qty, Price, Discount, Image, Status
  try {
    var { Name, Description, Qty, Price, Discount, Status } = req.body;
    var Image = null;
    if (req.file) {
      Image = req.file.filename;
    }
    var message = {}; // empty object
    if (isEmptyOrNull(Name)) {
      message.Name = "Name required!";
    }
    if (isEmptyOrNull(Qty)) {
      message.Qty = "Qty required!";
    }
    if (isEmptyOrNull(Price)) {
      message.Price = "Price required!";
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
      data: data,
    });
  } catch (err) {
    logError("product.create", err, res);
  }
};

const update = async (req, res) => {
  try {
    var {
      Id,
      CategoryId,
      Name,
      Description,
      Qty,
      Price,
      Discount,
      Image,
      Status,
    } = req.body;
    var message = {};
    if (validation(Name)) {
      message.Name = "Name required!";
    } else if (validation(Qty)) {
      message.Qty = "Qty required!";
    } else if (validation(Price)) {
      message.Price = "Price required!";
    }

    if (Object.keys(message).length > 0) {
      res.json({
        error: true,
        message: message,
      });
      return false;
    }
    var sql =
      "UPDATE product SET CategoryId=:CategoryId, Name=:Name,Description=:Description, Qty=:Qty, Price=:Price, Discount=:Discount, Image=:Image, Status=:Status WHERE Id=:Id";
    var param = {
      Id,
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
      message: data.affectedRows != 0 ? "Update success" : "Not Found",
      data: data,
    });
  } catch (error) {
    logError("product.update", error, res);
  }
};

const remove = async (req, res) => {
  try {
    var sql = "DELETE FROM product WHERE Id= :Id";
    var param = {
      Id: req.body.Id,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: "Remove success",
      data: data,
    });
  } catch (error) {
    logError("product.remove", error, res);
  }
};
module.exports = { getList, create, update, remove, getById };
