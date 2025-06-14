import React, { useState } from "react";
import "./Panel.css";
import axios from "axios";

function Panel() {
	const [taskName, setTaskName] = useState("");
	const [priority, setPriority] = useState("todo");

	const handleAddTask = async () => {
		if (!taskName.trim()) {
			alert("Введіть назву задачі");
			return;
		}

		const taskData = {
			name: taskName,
			priority: priority,
		};

		try {
			const response = await axios.post("http://localhost:3001/api/tasks", taskData);
			console.log("Відповідь сервера:", response.data);
			alert("Задачу додано успішно");
			setTaskName("");
			setPriority("todo");
		} catch (error) {
			console.error("Помилка при надсиланні задачі:", error);
			alert("Помилка при надсиланні");
		}
	};

	return (
		<div className="add-task-panel">
			<input
				type="text"
				className="input-task-name"
				placeholder="Нова задача..."
				value={taskName}
				onChange={(e) => setTaskName(e.target.value)}
			/>
			<select
				className="task-priority"
				value={priority}
				onChange={(e) => setPriority(e.target.value)}
			>
				<option value="todo">todo</option>
				<option value="in progress">in progress</option>
				<option value="done">done</option>
			</select>
			<button className="add-task-button" onClick={handleAddTask}>
				➕ Додати
			</button>
		</div>
	);
}

export default Panel;
