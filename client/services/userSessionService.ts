export interface User {
  id: string;
  name: string;
}

const parseJwt = (token: string): User => {
  try {
    return JSON.parse(atob(token.split(".")[1]));
  } catch (e) {
    return null;
  }
};

export const signIn = (accessToken: string) => {
  window.localStorage.setItem("accessToken", accessToken);
};

export const getAccessToken = () => window.localStorage.getItem("accessToken");

export const getUser = () => {
  return parseJwt(getAccessToken());
};

export const signOut = () => {
  window.localStorage.removeItem("accessToken");
};
