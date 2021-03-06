import { useState, useEffect, useContext, useRef } from "react";
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
  const [displayErrorMessage, setDisplayErrorMessage] = useState(false);

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
      const username = response?.data?.name;
      setAuth({ username, email, password, userRole, accessToken });
      setIsSuccess(true);
      clearFields();
    } catch (error) {
      console.error(error);
      setDisplayErrorMessage(true);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [isSuccess]);

  useEffect(() => {
    setDisplayErrorMessage(false);
  }, [email, password]);

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
          placeholder="email@company.com"
          onChange={onChange}
          required
        />
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
        <div className="err-msg-container">
          {displayErrorMessage ? (
            <div className="err-msg-wrapper">
              <i className="fa-solid fa-circle-exclamation"></i>
              <p>Your email or password is invalid</p>
            </div>
          ) : (
            ""
          )}
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
