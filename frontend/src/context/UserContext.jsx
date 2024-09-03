import { createContext } from "react";
import axiosInstance from '../utils/axiosInstance';
import useLocalStorage from "use-local-storage";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = async (userData) => {
    try {
      const response = await axiosInstance.post('/auth/login', userData);
      setUser(response.data.existingUser);
      localStorage.setItem('token', response.data.token);
      return response.data;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };
  
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