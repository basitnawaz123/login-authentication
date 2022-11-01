import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DashboardScreen from "./components/dashboardScreen";
import LoginScreen from "./components/loginScreen";
import RegistrationScreen from "./components/registerScreen";
import ProtectedRoute from "./protectedRoute";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<RegistrationScreen />} />
          <Route path="/login" element={<LoginScreen />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute redirectTo="/login">
                <DashboardScreen />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
