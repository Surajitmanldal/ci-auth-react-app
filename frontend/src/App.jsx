import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Users from "./pages/Users";
import Teachers from "./pages/Teachers";
function App() {
  const token = localStorage.getItem("token");

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={token ? <Dashboard /> : <Register />} />
        <Route path="/login" element={!token ? <Login /> : <Dashboard />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Login />} />
        <Route path="/users" element={token ? <Users /> : <Login />} />
        <Route path="/teachers" element={token ? <Teachers /> : <Login />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;