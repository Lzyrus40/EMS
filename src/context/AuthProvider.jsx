import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  // localStorage.clear(); // Uncomment only if you want to reset all data

  const [userData, setUserData] = useState(null);
  const [adminData, setAdminData] = useState(null);

  useEffect(() => {
    // Initialize localStorage only if it is empty
    setLocalStorage();

    // Get data from localStorage
    const { employees, admin } = getLocalStorage();

    // Update state
    setUserData(employees);
    setAdminData(admin);
  }, []);

  return (
    <AuthContext.Provider
      value={[userData, setUserData, adminData, setAdminData]}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
