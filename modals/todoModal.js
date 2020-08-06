/** @format */

const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
	task: {
		type: String,
		unique: [true, 'this todo already exists.'],
		required: true,
	},
	completed: {
		type: Boolean,
		default: false,
	},
});

const todoModel = mongoose.model('Todo', todoSchema);

module.exports = todoModel;
