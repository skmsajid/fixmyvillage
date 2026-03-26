import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AdminDashboard from "./pages/AdminDashboard";
import VillagerDashboard from "./pages/VillagerDashboard";
import WorkerDashboard from "./pages/WorkerDashboard";
import Home from "./pages/Home";
import ScrollTop from "./components/ScrollTop";
import ProtectedRoute from "./components/ProtectedRoute";
import NotFoundPage from "./pages/NotFoundPage";

function App() {

  return (

    <Router>

      {/* 🔥 ADD HERE */}
      <ScrollTop />

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Admin */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        {/* Worker */}
        <Route
          path="/worker"
          element={
            <ProtectedRoute allowedRole="worker">
              <WorkerDashboard />
            </ProtectedRoute>
          }
        />

        {/* Villager */}
        <Route
          path="/villager"
          element={
            <ProtectedRoute allowedRole="villager">
              <VillagerDashboard />
            </ProtectedRoute>
          }
        />

        {/* 404 Fallback Route */}
        <Route path="*" element={<NotFoundPage />} />

      </Routes>

    </Router>
    
  );
}

export default App;