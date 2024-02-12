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
    if (validation(Name)) {
      message.Name = "Name required!";
    }
    if (validation(Qty)) {
      message.Qty = "Qty required!";
    }
    if (validation(Price)) {
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
    var { Id, Name, Description, Qty, Price, Discount, Status } = req.body;
    var Image = null;
    if (req.file) {
      Image = req.file.filename; // change image | new image
    } else {
      Image = req.body.Image; // get Old image
    }
    var message = {}; // empty object
    if (isEmptyOrNull(Id)) {
      message.Id = "Id required!";
    }
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
    var param = {
      Id,
      Name,
      Description,
      Qty,
      Price,
      Discount,
      Status,
      Image,
    };
    const [dataInfo] = await db.query("SELECT * FROM product WHERE Id=:Id", {
      Id: Id,
    });
    if (dataInfo.length > 0) {
      var sql =
        "UPDATE product SET CategoryId=:CategoryId, Name=:Name ,Description=:Description, Qty=:Qty, Price=:Price, Discount=:Discount, Image=:Image, Status=:Image WHERE Id = :Id";
      const [data] = await db.query(sql, param);
      if (data.affectedRows) {
        if (req.file && !isEmptyOrNull(req.body.Image)) {
          await removeFile(req.body.Image); // remove old file
        }
      }
      res.json({
        message: data.affectedRows != 0 ? "Update success" : "Not found",
        data: data,
      });
    } else {
      res.json({
        message: "Not found",
        error: true,
      });
    }
  } catch (err) {
    logError("product.update", err, res);
  }
};
const remove = async (req, res) => {
  try {
    var param = {
      Id: req.body.Id,
    };
    const [dataInfo] = await db.query(
      "SELECT * FROM product WHERE Id = :Id",
      param
    );
    if (dataInfo.length) {
      // TODO: delete
      var sql = "DELETE FROM product WHERE Id = :Id";
      const [data] = await db.query(sql, param);

      if (data.affectedRows) {
        if (!isEmptyOrNull(dataInfo[0].Image)) {
          // TODO: else unlink|remove file
          await removeFile(dataInfo[0].Image);
        }
      }
      res.json({
        message: data.affectedRows != 0 ? "Delete successfully" : "Not found",
        data,
      });
    } else {
      res.json({
        error: true,
        message: "Not found",
      });
    }
  } catch (err) {
    logError("product.remove", err, res);
  }
};
module.exports = { getList, create, update, remove, getById };
