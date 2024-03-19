const { logError, validation, removeFile } = require("../config/helper");
const db = require("../config/db");

const getList = async (req, res) => {
  try {
    const [list] = await db.query("SELECT * FROM product ");
    const [category] = await db.query("SELECT * FROM category");
    res.json({
      list: list,
      category: category,
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

const update = async (req, res) => {
  try {
    var { Id, CategoryId, Name, Description, Qty, Price, Discount, Status } =
      req.body;
    var Image = null;
    if (req.file) {
      Image = req.file.filename; // change image | new image
    } else {
      Image = req.body.Image; // get Old image
    }

    var message = {};
    if (validation(Id)) {
      message.Id = "Id is require.";
    }
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

    var param = {
      Id,
      CategoryId,
      Name,
      Description,
      Qty,
      Price,
      Discount,
      Status,
      Image,
    };
    if (req.file) {
      Image = req.file.filename;
    }

    const [dataInfo] = await db.query("SELECT * FROM product WHERE Id = :Id", {
      Id: Id,
    });
    if (dataInfo.length) {
      var sql =
        "UPDATE product SET CategoryId=:CategoryId, Name=:Name ,Description=:Description, Qty=:Qty, Price=:Price, Discount=:Discount, Image=:Image, Status=:Status WHERE Id = :Id";
      const [data] = await db.query(sql, param);
      if (data.affectedRows) {
        if (req.file && !validation(req.body.Image)) {
          await removeFile(req.body.Image); // remove old file
        }
      }
      res.json({
        message: data.affectedRows != 0 ? "Update successfully" : "Not found",
        data,
      });
    } else {
      res.json({
        error: true,
        message: "Not found",
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
    if (dataInfo.length > 0) {
      var sql = "DELETE FROM product WHERE Id = :Id";
      const [data] = await db.query(sql, param);

      if (data.affectedRows) {
        if (!validation(dataInfo[0].Image)) {
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
