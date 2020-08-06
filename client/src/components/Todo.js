/** @format */

import React, { useState, useEffect } from 'react';
import { createTodo, deleteTodo, toggleTodo, getAllTodos } from './helpers.js';

const Todo = () => {
	const [todos, setTodos] = useState([]);
	const [todo, setTodo] = useState('');

	const getTodos = async () => {
		const data = await getAllTodos();
		console.log(data);
		if (todos) setTodos(data.todos);
	};

	useEffect(() => {
		getTodos();
	}, []);

	const create = async (e) => {
		e.preventDefault();
		const newTodo = await createTodo(todo);
		setTodos([newTodo.todo, ...todos]);
		setTodo('');
	};

	const del = async (e, id) => {
		e.stopPropagation();
		await deleteTodo(id);
		setTodos(todos.filter(({ _id }) => id !== _id));
	};

	const toggle = async (e, id) => {
		const data = {
			completed: !todos.find((todo) => todo._id === id).completed,
		};
		const newTodo = await toggleTodo(id, data);
		setTodos(todos.map((todo) => (todo._id === id ? newTodo.todo : todo)));
	};

	return (
		<>
			<h1>To-Do List</h1>

			<input
				type="text"
				placeholder="add your Todo"
				value={todo}
				onChange={(e) => setTodo(e.target.value)}
				onKeyDown={(e) => (e.which === 13 ? create(e) : null)}
			/>
			<ul>
				{todos.map(({ _id, task, completed }, i) => (
					<li
						key={i}
						onClick={(e) => toggle(e, _id)}
						className={completed ? 'completed' : ''}
					>
						<span onClick={(e) => del(e, _id)}>
							<i className="fas fa-trash-alt"></i>
						</span>
						{task}
					</li>
				))}
			</ul>
		</>
	);
};

export default Todo;
