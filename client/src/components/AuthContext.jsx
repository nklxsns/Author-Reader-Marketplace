import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  async function loginAction(userData) {
    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const resData = await response.json();
      if (response.ok) {
        setUser(resData.user);
        navigate("/");
        return;
      } else {
        throw new Error(resData.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function logOut() {
    try {
      const response = await fetch("http://localhost:5000/auth/logout");
      const resdata = await response.json();
      if (response.ok) {
        setUser(null);
        navigate("/login");
        return;
      } else {
        throw new Error(resData.message);
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
