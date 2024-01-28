import { createContext, useState } from "react";
export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [isUserLogged, setIsUserLogged] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [userId, setUserId] = useState(null);
  const [userRole, setUserRole] = useState(null);

  return (
    <AppContext.Provider
      value={{
        isUserLogged,
        setIsUserLogged,
        userInfo,
        setUserInfo,
        userRole,
        setUserRole,
        userId,
        setUserId,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;
