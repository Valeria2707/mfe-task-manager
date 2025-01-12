import { createLazyFileRoute } from "@tanstack/react-router";
import "../page-styles/index.css";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return (
    <div className="home-container">
      <h1 className="home-title">Task Manager</h1>
      <p className="home-description">
        A simple yet powerful tool to manage your daily tasks and boost your
        productivity.
      </p>
      <div className="home-link-container">
        <a href="/tasks" className="home-link">
          Go to Tasks
        </a>
      </div>
    </div>
  );
}
