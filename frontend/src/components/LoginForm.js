import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authProvider";
import axios from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

const LOGIN_URL = "/users/login";

const LoginForm = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const clearFields = () => {
    setFormData({
      email: "",
      password: "",
    });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ email, password }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );

      const accessToken = response?.data?.token;
      const userRole = response?.data?.role;
      const name = response?.data?.name;
      setAuth({ name, email, password, userRole, accessToken });
      setIsSuccess(true);
      clearFields();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [isSuccess]);

  return (
    <section className="form-container">
      <form onSubmit={loginUser} className="login-form">
        <h1>Welcome back 👋</h1>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="username@company.com"
          onChange={onChange}
          required
        />
        <div className="error">
          <p className="wrong-email"></p>
        </div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={onChange}
          required
        />
        <div className="error">
          <p className="wrong-password"></p>
        </div>
        <button type="submit" className="btn btn-login">
          Login
        </button>
      </form>
      <Link to="/register" className="register-user">
        <p>
          First time? <span>Create free acoount here</span>
        </p>
      </Link>
    </section>
  );
};

export default LoginForm;
