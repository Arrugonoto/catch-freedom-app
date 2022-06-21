import "./App.scss";
import { useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";

// components
import Home from "./pages/Home";
import RegisterForm from "./components/RegisterForm";
import Dashboard from "./pages/Dashboard";

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
        </Routes>
        {/* {isSuccess ? <Navigate to="/dashboard" /> : <Navigate to="/register" />} */}
      </main>
    </>
  );
}

export default App;
