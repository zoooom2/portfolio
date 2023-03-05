import React, { useContext, useEffect, useReducer, useState } from 'react';

const UserContext = React.createContext();
const initialState = {};
export const UserProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value="user context">{children}</UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
