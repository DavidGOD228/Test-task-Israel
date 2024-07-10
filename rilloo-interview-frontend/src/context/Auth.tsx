import { createContext, useState } from "react";
import { User, LoginForm } from "../types/app";
import { login as loginApi } from "../api/index";

export interface AuthContext {
  user: User | null;
  login: (loginForm: LoginForm) => User;
  logout: () => void;
}

const authContext = createContext<AuthContext>({} as AuthContext);

const AuthContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = async (loginForm: LoginForm) => {
    let resData: User;

    try {
      resData = await loginApi(loginForm.username, loginForm.password);

      setUser(resData);
      return resData;
    } catch (error) {
      console.log("error: ", error);
      return error;
    }
  };

  const logout = async () => {
    setUser(null);
  };

  return (
    <authContext.Provider value={{ user, login, logout }}>
      {children}
    </authContext.Provider>
  );
};

export { AuthContextProvider };
export default authContext;
