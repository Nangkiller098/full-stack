const db = require("../config/db"); //import db connection funct
const { logError, validation } = require("../config/helper");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } = require("../config/token_key");

const setPassword = async (req, res) => {
  try {
    var { Tel, Password, ConfirmPassword } = req.body;
    // var Tel = req.body.Tel;
    // var Password = req.body.Password;
    // var ConfirmPassword = req.body.ConfirmPassword;
    //Check Tel is exist ?
    const [user] = await db.query("SELECT * FROM employee WHERE Tel=:Tel", {
      Tel: Tel,
    });
    if (user.length == 0) {
      res.json({
        error: true,
        message: "User doesn't exist!",
      });
      return false;
    } else if (Password != ConfirmPassword) {
      //Chech Password and ConfirmPassword
      res.json({
        error: true,
        message: "Password and confirm password not match!",
      });
      return false;
    }
    //set password after hash to db
    const passHash = await bcrypt.hashSync(Password, 10); //hash password => 12345 => #$@JLKDJF:LSJFLSKDJFSLF
    const [data] = await db.query(
      "UPDATE employee SET Password=:Password WHERE Tel = :Tel",
      { Password: passHash, Tel: Tel }
    );
    res.json({
      message: data.affectedRows
        ? "Password set successfully"
        : "Somthing wrong!",
    });
  } catch (err) {
    logError("employee.setPassword", err, res);
  }
};

const login = async (req, res) => {
  try {
    var { Username, Password } = req.body;
    const [user] = await db.query("SELECT * FROM employee WHERE Tel=:Tel", {
      Tel: Username,
    });
    if (user.length == 0) {
      res.json({
        error: true,
        message: "User doesn't exist!",
      });
      return false;
    }
    var passwordFromDb = user[0].Password; //o302upowu4ilj;lfkja3irjoe

    var isCorrectPassword = bcrypt.compareSync(Password, passwordFromDb);
    if (isCorrectPassword) {
      delete user[0].Password; // remove column password
      var access_token = jwt.sign({ data: user[0] }, ACCESS_TOKEN_KEY, {
        expiresIn: "20h",
      });
      var refresh_token = jwt.sign({ data: user[0] }, REFRESH_TOKEN_KEY);
      res.json({
        message: "Login success",
        user: user[0],
        access_token: access_token,
        refresh_token: refresh_token,
      });
    } else {
      res.json({
        message: "Incorrect Password!",
        error: true,
      });
    }
  } catch (err) {
    logError("employee.login", err, res);
  }
};

const CheckToken = () => {
  // call this function in middleware
  return (req, res, next) => {
    var authorization = req.headers.authorization; // token from client
    var token_from_client = null;
    if (authorization != null && authorization != "") {
      token_from_client = authorization.split(" "); // authorization : "Bearer lkjsljrl;kjsiejr;lqjl;ksjdfakljs;ljl;r"
      token_from_client = token_from_client[1]; // get only access_token
    }
    if (token_from_client == null) {
      res.status(401).send({
        message: "Unauthorized",
      });
    } else {
      jwt.verify(token_from_client, ACCESS_TOKEN_KEY, (error, result) => {
        if (error) {
          res.status(401).send({
            message: "Unauthorized",
            error: error,
          });
        } else {
          req.user = result.data; // write user property
          req.user_id = result.data.Id; // write user property
          next();
        }
      });
    }
  };
};

const refresh_token = async (req, res) => {
  try {
    var refresh_token = req.body.refresh_token;
    if (validation(refresh_token)) {
      res.status(401).send({
        message: "Unauthorized-Refresh-Token",
      });
    } else {
      jwt.verify(refresh_token, REFRESH_TOKEN_KEY, async (error, result) => {
        if (error) {
          res.status(401).send({
            message: "Unauthorized-Refresh-Token",
            error: error,
          });
        } else {
          // new access && refresh
          var access_token = await jwt.sign(
            { data: result.data },
            ACCESS_TOKEN_KEY,
            { expiresIn: "60s" }
          );
          var refesh_token = await jwt.sign(
            { data: result.data },
            REFRESH_TOKEN_KEY
          );
          res.json({
            access_token: access_token,
            refesh_token: refesh_token,
          });
        }
      });
    }
  } catch (err) {
    logError("employee.refreshtoken", err, res);
  }
};

const getlist = async (req, res) => {
  try {
    var { txt_search, status, role_id } = req.query;
    var param = {};
    var sql =
      "SELECT e.*,r.Name as RoleName FROM employee e INNER JOIN role r ON e.RoleId = r.Id WHERE 1=1 ";

    if (!validation(txt_search)) {
      sql +=
        "AND (e.Firstname LIKE :txt_search OR e.Lastname LIKE :txt_search) ";
      param["txt_search"] = "%" + txt_search + "%";
    }
    if (!validation(status)) {
      sql += " AND e.Status =:status";
      param["status"] = status;
    }
    if (!validation(role_id)) {
      if (role_id == "All") {
        param["role_id"] = role_id;
      } else {
        sql += " AND e.RoleId =:role_id";
        param["role_id"] = role_id;
      }
    }
    sql += " ORDER BY Id DESC";
    const [list] = await db.query(sql, param);
    const [role] = await db.query("SELECT * FROM role");
    res.json({
      list: list,
      role: role,
      user_id: req.user,
    });
  } catch (err) {
    console.log(sql);
    logError("employee.getlist", err, res);
  }
};
const getOne = async (req, res) => {
  try {
    var param = {
      Id: req.body.Id,
    };
    var sql = "SELECT * FROM employee WHERE Id=:Id";
    const data = await db.query(sql, param);
    res.json({
      data: data,
    });
  } catch (error) {
    logError("employee.getList", error, res);
  }
};

const create = async (req, res) => {
  try {
    var sql = `
      INSERT INTO employee  (RoleId,Firstname, Lastname, Gender, Dob, Tel, Email, Address, Status,Image,Salary) 
      VALUES (:RoleId,:Firstname, :Lastname, :Gender, :Dob, :Tel, :Email, :Status, :Address,:Image,:Salary)`;
    var param = {
      RoleId: req.body.RoleId,
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Gender: req.body.Gender,
      Dob: req.body.Dob,
      Tel: req.body.Tel,
      Email: req.body.Email,
      Address: req.body.Address,
      Status: req.body.Status,
      Image: null,
      Salary: req.body.Salary,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: "Create success",
      data: data,
    });
  } catch (err) {
    logError("employee.create", err, res);
  }
};

const update = async (req, res) => {
  try {
    var sql =
      "UPDATE employee SET RoleId=:RoleId ,Firstname=:Firstname, Lastname=:Lastname, Gender=:Gender, Dob=:Dob, Tel=:Tel, Email=:Email, Address=:Address, Status=:Status,Salary=:Salary ,CreateBy=:CreateBy ,UpdateBy=:UpdateBy WHERE Id =:Id";
    var param = {
      Id: req.body.Id,
      RoleId: req.body.RoleId,
      Firstname: req.body.Firstname,
      Lastname: req.body.Lastname,
      Gender: req.body.Gender,
      Dob: req.body.Dob,
      Tel: req.body.Tel,
      Email: req.body.Email,
      Address: req.body.Address,
      Status: req.body.Status,
      Salary: req.body.Salary,
      CreateBy: req.body.CreateBy,
      UpdateBy: req.body.UpdateBy,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: data.affectedRows != 0 ? "Update success" : "Not found",
      data: data,
    });
  } catch (err) {
    logError("employee.update", err, res);
  }
};

const remove = async (req, res) => {
  try {
    var sql = "DELETE FROM employee WHERE Id = :Id";
    var param = {
      Id: req.body.Id,
    };
    const [data] = await db.query(sql, param);
    res.json({
      message: data.affectedRows != 0 ? "Remove success" : "Not found",
      data: data,
    });
  } catch (err) {
    logError("employee.remove", err, res);
  }
};

module.exports = {
  getlist,
  create,
  update,
  remove,
  getOne,
  setPassword,
  login,
  CheckToken,
  refresh_token,
};
