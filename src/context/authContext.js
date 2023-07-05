import React, { createContext, useContext, useState } from 'react';
import Auth from '../components/Auth';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);

  // You can provide any additional values or functions related to authentication

  const authContextValue = {
    currentUser,
    setCurrentUser
  };

  return (
    <AuthContext.Provider value={authContextValue}>
      {children}
    </AuthContext.Provider>
  );
};
