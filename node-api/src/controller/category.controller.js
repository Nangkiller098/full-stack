const { logError, validation } = require("../config/helper");
const db = require("../config/db");

const getList = async (req, res) => {
  try {
    var { txt_search, status } = req.query;
    var param = {};
    var sql = " SELECT * FROM category WHERE 1=1 ";
    if (!validation(txt_search)) {
      sql += " AND (Name LIKE :txt_search OR Description LIKE :txt_search) ";
      param["txt_search"] = "%" + txt_search + "%";
    }
    if (!validation(status)) {
      sql += " AND status =:status";
      param["status"] = status;
    }
    sql += " ORDER BY Id DESC";
    const [list] = await db.query(sql, param);
    const [count] = await db.query("SELECT COUNT(Id) as total FROM category");
    res.json({
      count,
      list,
    });
  } catch (err) {
    logError("category.getList", err, res);
  }
};

const create1 = async (req, res) => {
  let con = await db.getConnection();
  try {
    await con.beginTransaction();
    var sql =
      "INSERT INTO category (Name,Description,Status) VALUES (:Name,:Description,:Status)";
    var sql1 =
      "INSERT1 INTO category (Name,Description,Status) VALUES (:Name,:Description,:Status)";
    var param = {
      Name: req.body.Name,
      Description: req.body.Description,
      Status: req.body.Status,
    };
    const [data] = await con.query(sql, param);
    const [data1] = await con.query(sql1, param);
    await con.commit();
    res.json({
      message: "Insert success",
      data: data,
    });
  } catch (err) {
    await con.rollback();
    logError("category.create", err, res);
  }
};
const getById = async (req, res) => {
  try {
    var param = {
      Id: req.body.Id,
    };
    var sql = "SELECT * FROM category WHERE Id=:Id";
    const data = await db.query(sql, param);
    res.json({
      data: data,
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
module.exports = { getList, create, update, remove, getById, create1 };
