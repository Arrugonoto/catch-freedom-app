import "./App.scss";
import { Route, Routes } from "react-router-dom";

// components
import Home from "./components/Home";
import RegisterForm from "./components/RegisterForm";

function App() {
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
        </Routes>
      </main>
    </>
  );
}

export default App;
