import React, { useState } from 'react';
import {login} from "../services/authService";
import { NavLink } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requesting, setRequesting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setRequesting(true);
    try {
      await login({email, password});
      window.location.href = "#/";
    } finally {
      setRequesting(false);
    }
  }

  const submitButton = requesting
      ? <button type="submit" className="btn btn-dark" disabled>Logging in...</button>
      : <button type="submit" className="btn btn-dark">Sign In</button>

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-6">
          <div className="card-body">
            <h4>Login</h4>
            <form onSubmit={submit}>
              <div className="form-group">
                <label>Email address</label>
                <input type="email" onChange={(e) => setEmail(e.target.value)} className="form-control" />
              </div>
              <div className="form-group">
                <label>Password</label>
                <input type="password" onChange={(e) => setPassword(e.target.value)} className="form-control" />
              </div>
              {submitButton}
            </form>
          </div>
        </div>

        <div className="card col-6">
          <div className="card-body">
            <h4>New Customer?</h4>
            <br />
            <NavLink to="register" className="btn btn-dark">Create an Account</NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}
