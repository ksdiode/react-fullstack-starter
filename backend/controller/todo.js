const Todo = require('../models/todo');

exports.getList = async function (req, res) {
  const { page = 1 } = req.query;
  const option = { page };
  let todos = await Todo.paginate(option);
  res.json(todos);
};

exports.getOne = async function (req, res) {
  const { _id } = req.params;
  try {
    const todo = await Todo.findById(_id);
    res.json(todo);
  } catch (e) {
    res.status(404).json(e);
  }
};

exports.create = async function (req, res) {
  const todo = new Todo(req.body);
  try {
    await todo.save();
    res.json(todo);
  } catch (e) {
    res.status(404).json(e);
  }
};

exports.update = async function (req, res) {
  const { _id } = req.params;
  try {
    const todo = await Todo.findByIdAndUpdate(_id, req.body, { new: true });
    res.json(todo);
  } catch (e) {
    res.status(404).json(e);
  }
};

exports.remove = async function (req, res) {
  const { _id } = req.params;
  try {
    const todo = await Todo.findByIdAndDelete(_id);
    res.json(todo);
  } catch (e) {
    res.status(404).json(e);
  }
};
