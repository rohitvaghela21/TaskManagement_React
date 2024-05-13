
import { useContext, createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  
  const [user, setUser] = useState([]);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [page, setPage] = useState(1);
  const [ActiveTitle ,setActiveTitle] = useState("siteManagement");

  const navigate = useNavigate();

  useEffect(() => {
    if (page < 1) {
      setPage(1)
    }
  }, [page]);

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
        navigate(`/dashboard/${ActiveTitle}`);
        // setActiveTitle(`siteManagement`)
      }
      throw new Error(res.message);
    } catch (err) {
      console.error(err);
    }
  };

  const [setPanel, setSetPanel] = useState([]);

  const fetchSitePanel = async () => {
    const response = await fetch(
      `https://dev-backend.aquaint.co.uk/api/v1/site-panel/web-app-list?limit=10&page=1`,
      {
        method: "GET",
        headers: {
          Authorization: token,
        },
      }
    );
    const sitePanelResponse = await response.json();
    setSetPanel(sitePanelResponse.data.list);
    
  };

  
  const [showText, setShowText] = useState(true);

  const toggleText = () => {
    setShowText(!showText);
  };

  return (
    <AuthContext.Provider value={{
      page,
      setPage,
      token,
      user,
      loginAction,
      setPanel,
      fetchSitePanel,
      showText,
      toggleText,
      ActiveTitle,
      setActiveTitle
    }}>
      {children}
    </AuthContext.Provider>
  );
};


export const useAuth = () => {
  return useContext(AuthContext);
};
