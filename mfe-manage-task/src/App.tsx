import { Routes, Route, BrowserRouter } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import EditPage from "./pages/EditPage";

interface Props {
  onNavigate: (path: string) => void;
}
function App({ onNavigate }: Props) {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/create"
          element={<CreatePage onNavigate={onNavigate} />}
        />
        <Route
          path="/edit/:id"
          element={<EditPage onNavigate={onNavigate} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
