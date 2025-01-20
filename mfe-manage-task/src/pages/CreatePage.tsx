import "../styles/page.css";
import TaskForm from "../components/TaskForm/TaskForm";

interface Props {
  onNavigate: (path: string) => void;
}

export default function CreatePage({ onNavigate }: Props) {
  return (
    <div>
      <button onClick={() => onNavigate("/task-page")} className="back-button">
        ←
      </button>
      <div className="task-form-container">
        <h2 className="task-form-title">Add Task</h2>
        <TaskForm onNavigate={onNavigate} />
      </div>
    </div>
  );
}
