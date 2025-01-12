import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/page.css";
import TaskForm from "../components/TaskForm/TaskForm";
import { Task } from "../types/Task";
import { getTaskById } from "../services/getById";

export default function EditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        if (!id) {
          setError("Task ID is missing.");
          setLoading(false);
          return;
        }
        const fetchedTask = await getTaskById(id);
        setTask(fetchedTask);
      } catch (err) {
        setError((err as string) || "Failed to fetch task data.");
      } finally {
        setLoading(false);
      }
    };

    fetchTask();
  }, [id, navigate]);

  if (loading) {
    return <div className="loading-message">Loading task data...</div>;
  }

  if (error || !task) {
    return <div className="error-message">{error}</div>;
  }

  return (
    <div>
      <button onClick={() => navigate("/")} className="back-button">
        ←
      </button>
      <div className="task-form-container">
        <h2 className="task-form-title">Edit Task</h2>
        <TaskForm editMode task={task} />
      </div>
    </div>
  );
}
