const db = require("../config/db");
const { logError, validation } = require("../config/helper");

const getList = async (req, res) => {
  try {
    var { txt_search, status } = req.query;
    var param = {};
    var sql = "SELECT * FROM role WHERE 1=1";
    if (!validation(txt_search)) {
      sql += " AND (NAME LIKE :txt_search OR Code LIKE :txt_search)";
      param["txt_search"] = "%" + txt_search + "%";
    }
    if (!validation(status)) {
      sql += " AND Status =:status";
      param["status"] = status;
    }
    const [list] = await db.query(sql, param);
    res.json({
      list: list,
    });
  } catch (err) {
    logError("user.getlist", err, res);
  }
};

const create = async (req, res) => {
  var Name = req.body.Name;
  var Code = req.body.Code;
  var Status = req.body.Status;
  try {
    var sql =
      "INSERT INTO role (Name,Code,Status) values (:Name,:Code,:Status)";
    var param = {
      Name: Name,
      Code: Code,
      Status: Status,
    };
    const [data] = await db.query(sql, param);
    res.json({
      data: data,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};
const update = async (req, res) => {
  try {
    var sql =
      "UPDATE ROLE SET Name= :Name,Code= :Code,Status= :Status WHERE Id= :Id";
    var param = {
      Id: req.body.Id,
      Name: req.body.Name,
      Code: req.body.Code,
      Status: req.body.Status,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: data.affectedRows != 0 ? "Update success" : "Not Found",
      data: data,
    });
  } catch (error) {
    logError("user.update", error, res);
  }
};
const remove = async (req, res) => {
  try {
    var sql = "DELETE FROM role WHERE Id= :Id";
    var param = {
      Id: req.body.Id,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: "Remove success",
      data: data,
    });
  } catch (error) {
    res.status(500).send("Internal Server Error");
    console.log(error);
    ``;
  }
};
module.exports = { getList, create, update, remove };
