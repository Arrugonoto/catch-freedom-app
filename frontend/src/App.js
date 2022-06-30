import "./App.scss";
import "./styles/loaders.scss";
import { Route, Routes, Navigate } from "react-router-dom";

// components
import Home from "./pages/Home";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./pages/Dashboard";
import RentedDevices from "./pages/RentedDevices";
import AdminPanel from "./pages/AdminPanel";

function App() {
  // const [isSuccess, setIsSuccess] = useState(false);

  return (
    <>
      <main className="App">
        <Routes>
          <Route path="/" caseSensitive={false} element={<Home />} />
          <Route
            path="/register"
            caseSensitive={false}
            element={<RegisterForm />}
          />
          <Route
            path="/dashboard"
            caseSensitive={false}
            element={<Dashboard />}
          ></Route>
          <Route
            path="/devices/rented"
            caseSensitive={false}
            element={<RentedDevices />}
          ></Route>
          <Route
            path="/manage"
            caseSensitive={false}
            element={<AdminPanel />}
          ></Route>
        </Routes>
        {/* {isSuccess ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} */}
      </main>
    </>
  );
}

export default App;
