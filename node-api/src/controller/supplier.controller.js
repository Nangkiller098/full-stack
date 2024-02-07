const { logError, validation } = require("../config/helper");
const db = require("../config/db");

const getList = async (req, res) => {
  try {
    const [list] = await db.query("SELECT * FROM supplier ");
    res.json({
      list: list,
    });
  } catch (error) {
    logError("supplier.getList", error, res);
  }
};
const getById = async (req, res) => {
  try {
    var param = {
      Id: req.body.Id,
    };
    var sql = "SELECT * FROM supplier WHERE Id=:Id";
    const data = await db.query(sql, param);
    res.json({
      data: data,
    });
  } catch (error) {
    logError("supplier.getList", error, res);
  }
};

const create = async (req, res) => {
  try {
    var { Name, Tel, Email, Address, WebsiteUrl, Status } = req.body;
    var message = {};
    if (validation(Name)) {
      message.Name = "Name required!";
    } else if (validation(Tel)) {
      message.Tel = "Tel required!";
    } else if (validation(Email)) {
      message.Email = "Email required!";
    }

    if (Object.keys(message).length > 0) {
      res.json({
        error: true,
        message: message,
      });
      return false;
    }
    var param = {
      Name,
      Tel,
      Email,
      Address,
      WebsiteUrl,
      Status,
    };
    var sql = `INSERT INTO supplier( Name,Tel, Email, Address, WebsiteUrl, Status)
     VALUES(:Name, :Tel, :Email, :Address, :WebsiteUrl, :Status) `;
    const [data] = await db.query(sql, param);
    res.json({
      message: "Insert success",
      data: data,
    });
  } catch (error) {
    logError("supplier.create", error, res);
  }
};

const update = async (req, res) => {
  try {
    var { Id, Name, Tel, Email, Address, WebsiteUrl, Status } = req.body;
    var message = {};
    if (validation(Name)) {
      message.Name = "Name required!";
    } else if (validation(Tel)) {
      message.Tel = "Tel required!";
    } else if (validation(Email)) {
      message.Email = "Email required!";
    }

    if (Object.keys(message).length > 0) {
      res.json({
        error: true,
        message: message,
      });
      return false;
    }
    var sql =
      "UPDATE supplier SET  Name=:Name,Tel=:Tel, Email=:Email, Address=:Address, WebsiteUrl=:WebsiteUrl, Status=:Status WHERE Id=:Id";
    var param = {
      Id,
      Name,
      Tel,
      Email,
      Address,
      WebsiteUrl,
      Status,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: data.affectedRows != 0 ? "Update success" : "Not Found",
      data: data,
    });
  } catch (error) {
    logError("supplier.update", error, res);
  }
};

const remove = async (req, res) => {
  try {
    var sql = "DELETE FROM supplier WHERE Id= :Id";
    var param = {
      Id: req.body.Id,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: "Remove success",
      data: data,
    });
  } catch (error) {
    logError("supplier.remove", error, res);
  }
};
module.exports = { getList, create, update, remove, getById };
