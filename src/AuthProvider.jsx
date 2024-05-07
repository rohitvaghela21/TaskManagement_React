
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  const loginAction = async (formData) => {
    try {
      if (!formData.email || !formData.password) {
        throw new Error("Email and password are required");
      }
      const response = await fetch(
        "https://dev-backend.aquaint.co.uk/api/v1/authentication/web-app-login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: formData.email,
            password: formData.password,
          }),
        }
      );
      const res = await response.json();
      if (res.data) {
        setUser(res.data.userDetail);
        setToken(res.data.token.jwtToken);
        localStorage.setItem("token", res.data.token.jwtToken);
        // setUserData(res.data.userDetail.siteID);
        navigate("/dashboard");
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };





  return (
    <AuthContext.Provider value={{
      token,
      user,
      loginAction,
      
    }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
