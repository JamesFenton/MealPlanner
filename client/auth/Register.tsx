import React, { useState } from 'react';
import {register} from "../services/authService";

export default function Login() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [requesting, setRequesting] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    setRequesting(true);
    try {
      await register({name, email, password});
      window.location.href = "#/";
    } finally {
      setRequesting(false);
    }
  }

  const submitButton = requesting
      ? <button type="submit" className="btn btn-dark" disabled>Working...</button>
      : <button type="submit" className="btn btn-dark">Register</button>

  return (
    <div className="container">
      <br />
      <div className="row">
        <div className="card col-6 offset-3">
          <div className="card-body">
            <h4>Create an Account</h4>
            <form onSubmit={submit}>
              <div className="form-group">
                <label>Name</label>
                <input type="text" onChange={(e) => setName(e.target.value)} className="form-control" />
              </div>
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
      </div>
    </div>
  )
}
