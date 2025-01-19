import React, { useMemo } from "react";
import "./TaskForm.css";
import { Task } from "../../types/Task";
import { PRIORITY } from "../../constants/Task";
import { updateTask } from "../../services/update";
import { addTask } from "../../services/add";
import { useAction } from "../../hooks/useAction";

type Props = {
  editMode?: boolean;
  task?: Task;
  onNavigate: (path: string) => void;
};

export default function TaskForm({ task, editMode, onNavigate }: Props) {
  const { executeAction, loading, error } = useAction<
    void | Omit<Task, "id" | "due_date">,
    FormData
  >();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    try {
      const action = editMode ? updateTask : addTask;
      await executeAction(action, formData);
      onNavigate("/task-page");
    } catch (err) {
      console.error("Failed to submit task:", err);
    }
  };

  const filteredPriorities = useMemo(
    () => Object.values(PRIORITY).filter((p) => p !== PRIORITY.ANY),
    []
  );

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input type="hidden" name="id" defaultValue={task?.id || ""} />

      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          defaultValue={task?.title || ""}
          placeholder="Title"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          defaultValue={task?.description || ""}
          placeholder="Description"
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="due_date">Due Date</label>
        <input
          id="due_date"
          name="due_date"
          type="date"
          defaultValue={task?.due_date || ""}
          required
        />
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          defaultValue={task?.priority || PRIORITY.P4}
          required
        >
          {filteredPriorities.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>
          <input
            type="checkbox"
            name="completed"
            defaultChecked={task?.completed || false}
            value="1"
          />
          Completed
        </label>
        <input type="hidden" name="completed" value="0" />
      </div>

      {error && <div className="error-message">{error}</div>}

      <button type="submit" className="submit-button" disabled={loading}>
        {loading ? "Processing..." : editMode ? "Edit Task" : "Add Task"}
      </button>
    </form>
  );
}
