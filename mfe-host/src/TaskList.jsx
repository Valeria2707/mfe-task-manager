/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect } from "react";

function TaskList() {
  useEffect(() => {
    import("angularApp/AppComponent")
      .then((module) => {
        console.log("loaded !");
      })
      .catch((e) => {
        console.error(e);
      });
  });

  return <app-root></app-root>;
}

export default TaskList;
