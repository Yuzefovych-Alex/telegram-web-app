import React from "react";
import "./Panel.css";

function Panel() {
	return (
	<div className="add-task-panel">
		<input type="text" className="input-task-name" placeholder="Нова задача..." />
		<select className="task-priority">
			<option>Високий</option>
			<option>Середній</option>
			<option>Низький</option>
		</select>
		<button className="add-task-button">➕ Додати</button>
	</div>
	);
}

export default Panel;