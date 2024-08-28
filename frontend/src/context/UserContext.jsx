import { createContext } from "react";
import useLocalStorage from "use-local-storage";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = (user) => setUser(user);
  const logout = () => {
    setUser(null);
    localStorage.clear(); 
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserProvider, UserContext };