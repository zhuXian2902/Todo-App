/** @format */

const express = require('express');
const mongoose = require('mongoose');
const app = express();
app.use(express.json());
const todoRouter = require('./routes/todoRoutes');
const cors = require('cors');
app.use(cors());

mongoose
	.connect(
		`mongodb+srv://Sandy:Tb0ELKaTlJD1IysI@cluster0.itw4z.mongodb.net/todo-app?retryWrites=true&w=majority`,
		{
			useNewUrlParser: true,
			useUnifiedTopology: true,
			useCreateIndex: true,
			useFindAndModify: false,
		}
	)
	.then((con) => {
		console.log('database connected');
	})
	.catch(() => {
		console.log('server is down');
	});

app.use('/api/todos', todoRouter);

app.use((err, req, res, next) => {
	if (err.code === 11000) err.message = `value already exists`;
	else {
		for (let errorName in err.errors) {
			if (err.errors[errorName].message)
				err.message = err.errors[errorName].message;
			// console.log(err.message, errorName);
		}
	}
	return res.status(err.status || 400).json({
		status: 'fail',
		message: err.message ? err.message : 'something went wrong.',
	});
});

const PORT = process.env.PORT || 2902;

app.listen(PORT, () => {
	console.log(`server running on port ${PORT}`);
});
