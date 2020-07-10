export interface User {
  id: string;
  name: string;
}

let onUserSignedIn: (user: User) => void;

const parseJwt = (token: string): User => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

export const signIn = (accessToken: string) => {
  window.localStorage.setItem("accessToken", accessToken);
  const user = parseJwt(accessToken);
  window.localStorage.setItem("user", JSON.stringify(user));
  accessToken = accessToken;

  if (onUserSignedIn)
    onUserSignedIn(user);
}

export const subscribeUserSignedIn = (callback: (user: User) => void) => {
  onUserSignedIn = callback;
}

export const getAccessToken = () => window.localStorage.getItem("accessToken");
export const getUser = () => {
  return parseJwt(getAccessToken());
}

export const signOut = () => {
  window.localStorage.removeItem("accessToken");
}