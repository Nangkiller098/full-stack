const getList = (req, res) => {
  res.send("You have Request list user");
};
const create = (req, res) => {
  res.send("Your have Request Create User");
};
const update = (req, res) => {
  res.send("Your have Request Update User");
};
const remove = (req, res) => {
  res.send("Yor have request Delte User");
};
const blockUser = (req, res) => {
  res.send("Your have request block User");
};
module.exports = { getList, create, update, remove, blockUser };
