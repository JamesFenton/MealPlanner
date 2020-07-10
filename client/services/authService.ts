import axios from "axios";
import {signIn} from "./userSessionService";

export interface LoginCommand {
  email: string;
  password: string;
}

export interface RegisterCommand {
  name: string;
  email: string;
  password: string;
}

export function login(command: LoginCommand) {
  return axios.post("/api/auth/login", command).then(handleLoggedIn);
}

export function register(command: RegisterCommand) {
  return axios.post("/api/auth/register", command).then(handleLoggedIn);
}

const handleLoggedIn = (res) => {
  const accessToken = res.headers["x-access-token"];
  signIn(accessToken);
};