const { logError, validation, removeFile } = require("../config/helper");
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

    if (Object.keys(message).length)
      return res.json({
        error: true,
        message,
      });

    var sql = `INSERT INTO product
          (Name, CategoryId, Description, Qty, Price, Discount, Image, Status)
          VALUES (:Name, :CategoryId, :Description, :Qty, :Price, :Discount, :Image, :Status)`;
    var param = {
      Name,
      CategoryId,
      Description,
      Qty,
      Price,
      Image,
      Discount,
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
    var { Id, Name, Description, Qty, Price, Discount, Status } = req.body;

    var Image = null;
    if (req.file) {
      Image = req.file.filename; // change image | new image
    } else {
      Image = req.Image; // get old image
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

    if (Object.keys(message).length)
      return res.json({
        error: true,
        message,
      });

    var param = {
      Id,
      Name,
      Description,
      Qty,
      Price,
      Discount,
      Image,
      Status,
    };

    const [dataInfo] = await db.query("SELECT * FROM product WHERE Id = :Id", {
      Id: Id,
    });
    if (dataInfo.length) {
      // TODO: Update
      var sql = `UPDATE product
              SET Name = :Name, Description = :Description, Qty = :Qty, Price = :Price, Discount = :Discount, Image = :Image, Status = :Status
              WHERE Id = :Id`;
      const [data] = await db.query(sql, param);

      if (data.affectedRows) {
        if (req.file && !validation(req.body.Image)) {
          // TODO: Remove old file from dir
          await removeFile(req.body.Image);
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
    // TODO: find product
    const [dataInfo] = await db.query(
      "SELECT * FROM product WHERE Id = :Id",
      param
    );
    if (dataInfo.length > 0) {
      // TODO: delete
      var sql = "DELETE FROM product WHERE Id = :Id";
      const [data] = await db.query(sql, param);

      if (data.affectedRows) {
        if (!validation(dataInfo[0].Image)) {
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
