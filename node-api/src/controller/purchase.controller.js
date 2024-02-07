const { logError, validation } = require("../config/helper");
const db = require("../config/db");

const getList = async (req, res) => {
  try {
    const [list] = await db.query("SELECT * FROM purchase ");
    res.json({
      list: list,
    });
  } catch (error) {
    logError("purchase.getList", error, res);
  }
};
const getById = async (req, res) => {
  try {
    var param = {
      Id: req.body.Id,
    };
    var sql = "SELECT * FROM purchase WHERE Id=:Id";
    const data = await db.query(sql, param);
    res.json({
      data: data,
    });
  } catch (error) {
    logError("purchase.getList", error, res);
  }
};

const create = async (req, res) => {
  try {
    var { EmployeeId, SupplierId, PurchaeStatus, Status } = req.body;
    var message = {};
    if (validation(EmployeeId)) {
      message.EmployeeId = "Employee required!";
    } else if (validation(SupplierId)) {
      message.SupplierId = "Supplier required!";
    } else if (validation(PurchaeStatus)) {
      message.PurchaeStatus = "PurchaeStatus required!";
    }

    if (Object.keys(message).length > 0) {
      res.json({
        error: true,
        message: message,
      });
      return false;
    }
    var param = {
      EmployeeId,
      SupplierId,
      PurchaeStatus,
      Status,
    };
    var sql = `INSERT INTO purchase(EmployeeId, SupplierId, PurchaeStatus, Status)
     VALUES(:EmployeeId,:SupplierId, :PurchaeStatus, :Status) `;
    const [data] = await db.query(sql, param);
    res.json({
      message: "Insert success",
      data: data,
    });
  } catch (error) {
    logError("purchase.create", error, res);
  }
};

const update = async (req, res) => {
  try {
    var { Id, EmployeeId, SupplierId, PurchaeStatus, Status } = req.body;
    var message = {};
    if (validation(EmployeeId)) {
      message.EmployeeId = "Employee required!";
    } else if (validation(SupplierId)) {
      message.SupplierId = "Supplier required!";
    } else if (validation(PurchaeStatus)) {
      message.PurchaeStatus = "PurchaeStatus required!";
    }

    if (Object.keys(message).length > 0) {
      res.json({
        error: true,
        message: message,
      });
      return false;
    }
    var sql =
      "UPDATE purchase SET EmployeeId=:EmployeeId, SupplierId=:SupplierId,PurchaeStatus=:PurchaeStatus, Status=:Status WHERE Id=:Id";
    var param = {
      Id,
      EmployeeId,
      SupplierId,
      PurchaeStatus,
      Status,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: data.affectedRows != 0 ? "Update success" : "Not Found",
      data: data,
    });
  } catch (error) {
    logError("purchase.update", error, res);
  }
};

const remove = async (req, res) => {
  try {
    var sql = "DELETE FROM purchase WHERE Id= :Id";
    var param = {
      Id: req.body.Id,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: "Remove success",
      data: data,
    });
  } catch (error) {
    logError("purchase.remove", error, res);
  }
};
module.exports = { getList, create, update, remove, getById };
