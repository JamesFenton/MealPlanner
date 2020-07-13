import React, { useState } from "react";
import { login } from "../services/authService";
import { NavLink } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requesting, setRequesting] = useState(false);
  const [error, setError] = useState(null);

  const submit = async e => {
    e.preventDefault();
    setRequesting(true);
    try {
      await login({ email, password });
      window.location.href = "/";
    } catch (ex) {
      if (ex.message) setError(ex.message);
    } finally {
      setRequesting(false);
    }
  };

  const submitButton = requesting ? (
    <button type="submit" className="btn btn-dark" disabled>
      Logging in...
    </button>
  ) : (
    <button type="submit" className="btn btn-dark">
      Sign In
    </button>
  );

  const renderEmail = () => {
    let inputClasses = "form-control";
    if (error) inputClasses += " is-invalid";
    return (
      <div className="form-group">
        <label>Email address</label>
        <input
          type="email"
          onChange={e => setEmail(e.target.value)}
          className={inputClasses}
        />
      </div>
    );
  };

  const renderPassword = () => {
    let inputClasses = "form-control";
    if (error) inputClasses += " is-invalid";
    return (
      <div className="form-group">
        <label>Password</label>
        <input
          type="password"
          onChange={e => setPassword(e.target.value)}
          className={inputClasses}
        />
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    );
  };

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-6">
          <div className="card-body">
            <h4>Login</h4>
            <form onSubmit={submit}>
              {renderEmail()}
              {renderPassword()}
              {submitButton}
            </form>
          </div>
        </div>

        <div className="card col-6">
          <div className="card-body">
            <h4>New Customer?</h4>
            <br />
            <NavLink to="register" className="btn btn-dark">
              Create an Account
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}
