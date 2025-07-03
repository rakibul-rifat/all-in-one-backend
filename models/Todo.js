const mongoose = require('mongoose');

const TodoSchema = new mongoose.Schema({
  text: { type: String, required: true },
  color: { type: String, default: '#ffffff' },
}, { timestamps: true }); // this adds createdAt & updatedAt

module.exports = mongoose.model('Todo', TodoSchema);
