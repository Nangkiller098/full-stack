const db = require("../config/db");

// const getList = (req, res) => {
//   db.query("SELECT * FROM role;", (error, row) => {
//     if (error) {
//       res.json({
//         error: true,
//         message: error,
//       });
//     } else {
//       res.json({
//         list: row,
//       });
//     }
//   });
// };
const getList = async (req, res) => {
  try {
    const [list] = await db.query("SELECT * FROM role where Id=:Id", { Id: 1 });
    res.json({
      list: list,
    });
  } catch (err) {
    res.status(500).send("Internal Server Error");
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
const update = (req, res) => {
  res.send("Your have Request Update User");
};
const remove = (req, res) => {
  res.send("Yor have request Delte User");
};
module.exports = { getList, create, update, remove };
