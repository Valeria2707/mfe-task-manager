import { useNavigate } from "react-router-dom";
import "../styles/page.css";
import TaskForm from "../components/TaskForm/TaskForm";

export default function CreatePage() {
  const navigate = useNavigate();

  return (
    <div>
      <button onClick={() => navigate("/")} className="back-button">
        ←
      </button>
      <div className="task-form-container">
        <h2 className="task-form-title">Add Task</h2>
        <TaskForm />
      </div>
    </div>
  );
}
