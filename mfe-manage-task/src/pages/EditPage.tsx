import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/page.css";
import TaskForm from "../components/TaskForm/TaskForm";
import { Task } from "../types/Task";
import { getTaskById } from "../services/getById";
import { useAction } from "../hooks/useAction";

interface Props {
  onNavigate: (path: string) => void;
}

export default function EditPage({ onNavigate }: Props) {
  const { id } = useParams();
  const { executeAction, loading, error } = useAction<Task, string>();
  const [task, setTask] = useState<Task | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      if (!id) {
        console.error("Task ID is missing.");
        return;
      }
      try {
        const fetchedTask = await executeAction(getTaskById, id);
        setTask(fetchedTask || null);
      } catch (err) {
        console.error("Failed to fetch task:", err);
      }
    };
    fetchTask();
  }, [id, executeAction]);

  if (loading) {
    return <div className="loading-message">Loading task data...</div>;
  }

  if (error || !task) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <button onClick={() => onNavigate("/task-page")} className="back-button">
        ←
      </button>
      <div className="task-form-container">
        <h2 className="task-form-title">Edit Task</h2>
        <TaskForm editMode task={task} onNavigate={onNavigate} />
      </div>
    </div>
  );
}
