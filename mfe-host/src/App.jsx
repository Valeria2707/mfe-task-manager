import { BrowserRouter as Router } from "react-router-dom";
import RoutesWithNavigate from "./RoutesWithNavigate";

export default function App() {
  return (
    <Router>
      <RoutesWithNavigate />
    </Router>
  );
}
