import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";

const ProtectedRoute = ({ children }) => {
  const stored =
    sessionStorage.getItem("currentUser") ||
    localStorage.getItem("rememberedUser");

  if (!stored) return <Navigate to="/signin" />;
  return children;
};
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
