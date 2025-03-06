import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Cargar datos del usuario desde localStorage al iniciar la app
    const storedUser = localStorage.getItem("user");
    const storedRole = localStorage.getItem("role");

    if (storedUser && storedRole) {
      setUser({ userName: storedUser, role: storedRole });
    }
  }, []);

  // Función para iniciar sesión
  const login = (userData) => {
    localStorage.setItem("user", userData.userName);
    localStorage.setItem("role", userData.role);
    setUser(userData);
  };

  // Función para cerrar sesión
  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para acceder a la autenticación
export const useAuth = () => useContext(AuthContext);
