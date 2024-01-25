const { logError } = require("../config/helper");
const db = require("../config/db");

const getList = async (req, res) => {
  try {
    const [list] = await db.query("SELECT * FROM category ");
    res.json({
      list: list,
    });
  } catch (error) {
    logError("category.getList", error, res);
  }
};

const create = async (req, res) => {
  var param = {
    Name: req.body.Name,
    Description: req.body.Description,
    Status: req.body.Status,
  };
  var sql =
    "INSERT INTO category (Name,Description,Status) values(:Name,:Description,:Status)";
  const [data] = await db.query(sql, param);
  res.json({
    message: "Insert success",
    data: data,
  });
  try {
  } catch (error) {
    logError("category.create", error, res);
  }
};

const update = async (req, res) => {
  try {
    var sql =
      "UPDATE category SET Name= :Name,Description= :Description,Status= :Status WHERE Id= :Id";
    var param = {
      Id: req.body.Id,
      Name: req.body.Name,
      Description: req.body.Description,
      Status: req.body.Status,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: data.affectedRows != 0 ? "Update success" : "Not Found",
      data: data,
    });
  } catch (error) {
    logError("category.update", error, res);
  }
};

const remove = async (req, res) => {
  try {
    var sql = "DELETE FROM category WHERE Id= :Id";
    var param = {
      Id: req.body.Id,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: "Remove success",
      data: data,
    });
  } catch (error) {
    logError("category.remove", error, res);
  }
};
module.exports = { getList, create, update, remove };
