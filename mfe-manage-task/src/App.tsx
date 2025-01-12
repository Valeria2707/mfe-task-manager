import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<EditPage />} />
      </Routes>
    </Router>
  );
}

export default App;
