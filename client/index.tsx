import React from 'react';
import ReactDOM from 'react-dom';
import "bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import App from "./App";

import axios from "axios";
axios.defaults.baseURL = "http://localhost:3000"

ReactDOM.render(
  <App />,
  document.getElementById('app')
);
  