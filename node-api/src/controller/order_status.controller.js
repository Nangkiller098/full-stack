const { logError } = require("../config/helper");
const db = require("../config/db");

const getList = async (req, res) => {
  try {
    const [list] = await db.query("SELECT * FROM order_status ");
    res.json({
      list: list,
    });
  } catch (error) {
    logError("order_status.getList", error, res);
  }
};
const getById = async (req, res) => {
  try {
    var param = {
      Id: req.body.Id,
    };
    var sql = "SELECT * FROM order_status WHERE Id=:Id";
    const data = await db.query(sql, param);
    res.json({
      data: data,
    });
  } catch (error) {
    logError("order_status.getList", error, res);
  }
};

const create = async (req, res) => {
  var param = {
    Name: req.body.Name,
    Code: req.body.Code,
    Status: req.body.Status,
    CreateBy: req.body.CreateBy,
  };
  var sql =
    "INSERT INTO order_status (Name,Code,Status,CreateBy) values(:Name,:Code,:Status,:CreateBy)";
  const [data] = await db.query(sql, param);
  res.json({
    message: "Insert success",
    data: data,
  });
  try {
  } catch (error) {
    logError("order_status.create", error, res);
  }
};

const update = async (req, res) => {
  try {
    var sql =
      "UPDATE order_status SET Name= :Name,Code=:Code,Status= :Status,CreateBy=:CreateBy WHERE Id= :Id";
    var param = {
      Id: req.body.Id,
      Name: req.body.Name,
      Code: req.body.Code,
      Status: req.body.Status,
      CreateBy: req.body.CreateBy,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: data.affectedRows != 0 ? "Update success" : "Not Found",
      data: data,
    });
  } catch (error) {
    logError("order_status.update", error, res);
  }
};

const remove = async (req, res) => {
  try {
    var sql = "DELETE FROM order_status WHERE Id= :Id";
    var param = {
      Id: req.body.Id,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: "Remove success",
      data: data,
    });
  } catch (error) {
    logError("order_status.remove", error, res);
  }
};
module.exports = { getList, create, update, remove, getById };
