/** @format */
const router = require('express').Router();
const Todo = require('../modals/todoModal');

router.get('/', async (req, res, next) => {
	try {
		const todos = await Todo.find();
		res.status(200).json({
			status: 'success',
			todos,
		});
	} catch (err) {
		next({ status: 400, message: 'server is down' });
	}
});

router.post('/', async (req, res, next) => {
	try {
		const todo = await Todo.create(req.body);
		res.status(201).json({
			status: 'success',
			todo,
		});
	} catch (err) {
		next(err);
	}
});

router.put('/:id', async (req, res, next) => {
	try {
		const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
		});
		return res.status(200).json({
			status: 'success',
			todo,
		});
	} catch (err) {
		next(err);
	}
});

router.delete('/:id', async (req, res, next) => {
	try {
		await Todo.findByIdAndRemove(req.params.id);
		res.status(200).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		next({ status: 400, message: 'failed to delete todo' });
	}
});

module.exports = router;
