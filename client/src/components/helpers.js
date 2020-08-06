/** @format */

import axios from 'axios';

const API_URL = 'https://arcane-hamlet-89622.herokuapp.com/api/todos/';

export const createTodo = async (task) => {
	const { data: newTodo } = await axios.post(API_URL, {
		task,
	});
	return newTodo;
};

export const deleteTodo = async (id) => {
	const message = await axios.delete(`${API_URL}${id}`);
	return message;
};

export const toggleTodo = async (id, payload) => {
	const { data: newTodo } = await axios.put(`${API_URL}${id}`, payload);
	return newTodo;
};

export const getAllTodos = async () => {
	const { data: todos } = await axios.get(API_URL);
	return todos;
};
