const mongoose = require('mongoose');
const mongoosePaginate = require('mongoose-paginate-v2');

const todoSchema = mongoose.Schema(
  {
    title: String,
    done: { type: Boolean, default: false },
    author: { type: Schema.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

todoSchema.plugin(mongoosePaginate);

const Todo = mongoose.model('Todo ', todoSchema);
module.exports = Todo;
