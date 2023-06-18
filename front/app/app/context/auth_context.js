"use client";

import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState()

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};