const getList = (req, res) => {
  res.send("You have request customer List");
};
const create = (req, res) => {
  res.send("You have request create customer");
};
const update = (req, res) => {
  res.send("You have request update customer");
};
const remove = (req, res) => {
  res.send("You have request delete Customer");
};

module.exports = { getList, create, update, remove };
