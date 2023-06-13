"use client";

import { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState()

  const logOut = () => {
    // ログアウトのロジックを実装する
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, currentUser, setIsLoggedIn, setCurrentUser }}>
      {children}
    </AuthContext.Provider>
  );
};