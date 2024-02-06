const db = require("../config/db"); //import db connection funct
const { logError } = require("../config/helper");
const bcrypt = require("bcrypt");
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

    var isCorrectPassword = await bcrypt.compareSync(Password, passwordFromDb);
    if (isCorrectPassword) {
      delete user[0].Password; // remove column password
      res.json({
        message: "Login success",
        user: user[0],
      });
    } else {
      res.json({
        message: "Inccectt Password!",
        error: true,
      });
    }
  } catch (err) {
    logError("employee.login", err, res);
  }
};
const getlist = async (req, res) => {
  try {
    var sql = "SELECT * FROM employee";
    const [list] = await db.query(sql);
    res.json({
      list: list,
    });
  } catch (err) {
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
      RoleId: 1,
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
      "UPDATE employee SET Firstname:=Firstname, Lastname=:Lastname, Gender=:Gender, Dob=:Dob, Tel=:Tel, Email=:Email, Address=:Address, Status=:Status ,CreateBy=:CreateBy ,UpdateBy=:UpdateBy WHERE Id =:Id";
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
};
