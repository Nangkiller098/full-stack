const db = require("../config/db"); //import db connection funct
const { logError, validation } = require("../config/helper");
const getlist = async (req, res) => {
  try {
    var { txt_search, status } = req.query;
    var param = {};
    var sql = "SELECT * FROM customer WHERE 1=1";

    if (!validation(txt_search)) {
      sql += " AND (Firstname LIKE :txt_search OR Lastname LIKE :txt_search) ";
      param["txt_search"] = "%" + txt_search + "%";
    }

    if (!validation(status)) {
      sql += " AND Status =:status";
      param["status"] = status;
    }

    sql += " ORDER BY Id DESC";
    const [list] = await db.query(sql, param);
    res.json({
      list: list,
      user_id: req.user_id,
    });
  } catch (err) {
    console.log(sql);
    logError("customer.getlist", err, res);
  }
};
const getById = async (req, res) => {
  try {
    var param = {
      Id: req.body.Id,
    };
    var sql = "SELECT * FROM customer WHERE Id=:Id";
    const data = await db.query(sql, param);
    res.json({
      data: data,
    });
  } catch (error) {
    logError("category.getList", error, res);
  }
};

const create = async (req, res) => {
  try {
    var sql =
      "INSERT INTO customer  (Firstname, Lastname, Gender, Dob, Tel, Email, Address, Status, CreateBy, UpdateBy) VALUES (:Firstname, :Lastname, :Gender, :Dob, :Tel, :Email, :Status, :Address, :CreateBy ,:UpdateBy)";
    var param = {
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Gender: req.body.Gender,
      Dob: req.body.Dob,
      Tel: req.body.Tel,
      Email: req.body.Email,
      Address: req.body.Address,
      Status: req.body.Status,
      CreateBy: req.user.Id,
      UpdateBy: req.body.UpdateBy,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: "Create success",
      data: data,
    });
  } catch (err) {
    logError("customer.create", err, res);
  }
};

const update = async (req, res) => {
  try {
    var sql =
      "UPDATE customer SET Firstname:=Firstname, Lastname=:Lastname, Gender=:Gender, Dob=:Dob, Tel=:Tel, Email=:Email, Address=:Address, Status=:Status ,CreateBy=:CreateBy ,UpdateBy=:UpdateBy WHERE Id =:Id";
    var param = {
      Id: req.body.Id,
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Gender: req.body.Gender,
      Dob: req.body.Dob,
      Tel: req.body.Tel,
      Email: req.body.Email,
      Address: req.body.Address,
      Status: req.body.Status,
      CreateBy: req.body.CreateBy,
      UpdateBy: req.body.UpdateBy,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: data.affectedRows != 0 ? "Update success" : "Not found",
      data: data,
    });
  } catch (err) {
    logError("customer.update", err, res);
  }
};

const remove = async (req, res) => {
  try {
    var sql = "DELETE FROM customer WHERE Id = :Id";
    var param = {
      Id: req.body.Id,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: data.affectedRows != 0 ? "Remove success" : "Not found",
      data: data,
    });
  } catch (err) {
    logError("customer.remove", err, res);
  }
};

module.exports = { getlist, create, update, remove, getById };
