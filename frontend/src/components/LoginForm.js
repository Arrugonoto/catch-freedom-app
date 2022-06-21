import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const loginUser = (e) => {
    e.preventDefault();
  };

  return (
    <section className="form-container">
      <form onSubmit={loginUser} className="login-form">
        <h1>Welcome back 👋</h1>
        <label htmlFor="">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={email}
          placeholder="username@company.com"
          onChange={onChange}
        />
        <div className="error">
          <p className="wrong-email">wrong email</p>
        </div>
        <label htmlFor="">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          value={password}
          placeholder="password"
          onChange={onChange}
        />
        <div className="error">
          <p className="wrong-password">wrong password</p>
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
