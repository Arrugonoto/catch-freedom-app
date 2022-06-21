import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { name, email, password, confirmPassword } = formData;

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const registerUser = (e) => {
    e.preventDefault();
  };

  return (
    <div className="center-container">
      <section className="form-container">
        <form onSubmit={registerUser} className="register-form">
          <h1>Nice to see You here 🤝</h1>
          <label htmlFor="">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="username"
            onChange={onChange}
          />
          <label htmlFor="">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            placeholder="username@company.com"
            onChange={onChange}
          />
          <label htmlFor="">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={onChange}
          />
          <label htmlFor="">Confirm password</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={confirmPassword}
            placeholder="confirm password"
            onChange={onChange}
          />
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
