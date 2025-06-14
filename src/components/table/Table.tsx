import React from "react";
import "./Table.css";

function Table() {
	const toggleComplete = (event: React.ChangeEvent<HTMLInputElement>) => {
		const checkbox = event.target;
		const row = checkbox.closest("tr");
		if (checkbox.checked) {
			row?.classList.add("completed");
		} else {
			row?.classList.remove("completed");
		}
	};

	return (
		<table className="task-table">
			<thead>
				<tr>
					<th>✔️ Завершено</th>
					<th>📝 Назва Задачі</th>
					<th>⚡ Пріоритет</th>
				</tr>
			</thead>
			<tbody>
				<tr className="task-row">
					<td>
						<input
							type="checkbox"
							className="task-checkbox"
							onChange={toggleComplete}
						/>
					</td>
					<td className="task-name">Зробити дизайн сайту</td>
					<td>
						<select className="task-priority">
							<option>Високий</option>
							<option>Середній</option>
							<option>Низький</option>
						</select>
					</td>
				</tr>
				<tr className="task-row">
					<td>
						<input
							type="checkbox"
							className="task-checkbox"
							onChange={toggleComplete}
						/>
					</td>
					<td className="task-name">Написати статтю в блог</td>
					<td>
						<select className="task-priority">
							<option>Середній</option>
							<option>Високий</option>
							<option>Низький</option>
						</select>
					</td>
				</tr>
			</tbody>
		</table>
	);
}

export default Table;
