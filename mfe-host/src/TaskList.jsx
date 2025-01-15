/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function TaskList() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleAngularNavigate = (event) => {
      const path = event.detail;
      navigate(path);
    };

    window.addEventListener("angularNavigate", handleAngularNavigate);

    import("angularApp/AngularTaskApp")
      .then((module) => {
        console.log("Angular module loaded!");
      })
      .catch((e) => {
        console.error(e);
      });

    return () => {
      window.removeEventListener("angularNavigate", handleAngularNavigate);
    };
  }, [navigate]);

  return <app-root></app-root>;
}

export default TaskList;
