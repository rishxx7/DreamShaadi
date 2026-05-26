import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AddVendor from "./pages/AddVendor";
import VendorDetails from "./pages/VendorDetails";
import MyBookings from "./pages/MyBookings";
import ProtectedRoute from "./components/ProtectedRoute";
import VendorDashboard from "./pages/VendorDashboard";
import EditVendor from "./pages/EditVendor";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/add-vendor"
        element={
          <ProtectedRoute>
            <AddVendor />
          </ProtectedRoute>
        }
      />
      <Route path="/vendor/:id" element={<VendorDetails />} />
      <Route
        path="/my-bookings"
        element={
          <ProtectedRoute>
            <MyBookings />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor-dashboard"
        element={
          <ProtectedRoute>
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
  path="/edit-vendor/:id"
  element={
    <ProtectedRoute>
      <EditVendor />
    </ProtectedRoute>
  }
/>

    </Routes>
  );
}

export default App;