import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Table.css";

interface Task {
	id: number;
	title: string;
	status: "todo" | "in_progress" | "done";
	completedAt?: string | null;
	createdAt: string;
	updatedAt: string;
}

const Table: React.FC = () => {
	const [tasks, setTasks] = useState<Task[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const res = await axios.get<Task[]>("http://172.20.10.3:5000/api/tasks");
				setTasks(res.data);
			} catch (err) {
				console.error("Помилка при отриманні задач:", err);
				setError("Не вдалося завантажити задачі");
			} finally {
				setLoading(false);
			}
		};

		fetchTasks();
	}, []);

	const updateTask = async (taskId: number, updatedFields: Partial<Task>) => {
		try {
			await axios.patch(`http://172.20.10.3:5000/api/tasks/${taskId}`, updatedFields);
			setTasks(prev =>
				prev.map(task =>
					task.id === taskId ? { ...task, ...updatedFields } : task
				)
			);
		} catch (err) {
			console.error("Помилка оновлення задачі:", err);
			setError("Не вдалося оновити задачу");
		}
	};

	const toggleComplete = (taskId: number) => {
		const task = tasks.find(t => t.id === taskId);
		if (!task) return;

		const newStatus: Task["status"] = task.status === "done" ? "todo" : "done";
		updateTask(taskId, { status: newStatus });
	};

	const handleStatusChange = (taskId: number, newStatus: Task["status"]) => {
		updateTask(taskId, { status: newStatus });
	};

	const formatStatus = (status: Task["status"]) => {
		switch (status) {
			case "todo":
				return "To Do";
			case "in_progress":
				return "In Progress";
			case "done":
				return "Done";
			default:
				return status;
		}
	};

	if (loading) return <p>Завантаження задач...</p>;
	if (error) return <p className="error">{error}</p>;

	return (
		<table className="task-table">
			<thead>
				<tr>
					<th>✔️ Завершено</th>
					<th>📝 Назва Задачі</th>
					<th>⚡ Статус</th>
				</tr>
			</thead>
			<tbody>
				{tasks.map(task => (
					<tr key={task.id} className={`task-row ${task.status === "done" ? "completed" : ""}`}>
						<td>
							<input
								type="checkbox"
								checked={task.status === "done"}
								onChange={() => toggleComplete(task.id)}
							/>
						</td>
						<td className="task-name">{task.title}</td>
						<td>
							<select
								className="task-status"
								value={task.status}
								onChange={(e) => handleStatusChange(task.id, e.target.value as Task["status"])}
							>
								<option value="todo">{formatStatus("todo")}</option>
								<option value="in_progress">{formatStatus("in_progress")}</option>
								<option value="done">{formatStatus("done")}</option>
							</select>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export default Table;
