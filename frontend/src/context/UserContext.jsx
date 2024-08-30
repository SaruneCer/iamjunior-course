import { createContext } from "react";
import useLocalStorage from "use-local-storage";

const UserContext = createContext(null);

const UserProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);

  const login = async (userData) => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      if (!response.ok) {
        throw new Error('Login failed');
      }
  
      const data = await response.json();
      setUser(data);
      localStorage.setItem('token', data.token);
      return data;
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