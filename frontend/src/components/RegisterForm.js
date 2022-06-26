import { useState, useEffect, useContext } from "react";
import AuthContext from "../context/authProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";

const REGISTER_URL = "/users/register";

const EMAIL_REGEX = /^([a-z\d\._]+)@(company\.com)/;

// const testName = "k.klekot@company.com";

// console.log(EMAIL_REGEX.test(testName));

const RegisterForm = () => {
  const { setAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [emailErrMessage, setEmailErrMessage] = useState(false);
  const [passwordErrMessage, setPasswordErrMessage] = useState(false);

  const { name, email, password, confirmPassword } = formData;

  const clearFields = () => {
    setFormData({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerUser = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      console.error(`Passwords doesn't match`);
      setPasswordErrMessage(true);

      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ name, email, password }),
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
    }
  };

  useEffect(() => {
    if (isSuccess) {
      navigate("/dashboard");
    }
  }, [isSuccess]);

  useEffect(() => {
    setPasswordErrMessage(false);
  }, [password, confirmPassword]);

  return (
    <div className="center-container">
      <section className="form-container">
        <form onSubmit={registerUser} className="register-form">
          <h1>Nice to see You here 🤝</h1>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="username"
            onChange={onChange}
            required
          />
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
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={onChange}
            className={`${passwordErrMessage ? "error-border" : ""}`}
            required
          />
          <label htmlFor="confirmPassword">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="confirm password"
            onChange={onChange}
            className={`${passwordErrMessage ? "error-border" : ""}`}
            required
          />
          <div className="password-error-container">
            {passwordErrMessage ? (
              <div className="password-error-wrapper">
                <i className="fa-solid fa-circle-exclamation"></i>
                <p>Passwords doesn't match each other</p>
              </div>
            ) : (
              ""
            )}
          </div>
          <button type="submit" className="btn btn-login">
            Create account
          </button>
        </form>
        <Link to="/" className="login-user">
          <p>
            Have an account already? <span>Log In here</span>
          </p>
        </Link>
      </section>
    </div>
  );
};

export default RegisterForm;
