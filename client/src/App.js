/** @format */

import React from 'react';
import Todo from './components/Todo';
import './App.css';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const options = {
	position: 'top-center',
	autoClose: 3000,
	hideProgressBar: false,
	closeOnClick: true,
	pauseOnHover: true,
	draggable: true,
	progress: undefined,
};

axios.interceptors.response.use(null, (error) => {
	console.log(error.response.data.message);
	if (error && error.response && error.response.data)
		toast.error(error.response.data.message, options);
	return Promise.reject(error);
});

function App() {
	return (
		<div id="container">
			<header className="App-header">
				<ToastContainer {...options} />
				<Todo />
			</header>
		</div>
	);
}

export default App;
