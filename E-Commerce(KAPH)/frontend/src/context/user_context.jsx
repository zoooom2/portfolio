import React, { useContext, useEffect, useReducer, useState } from 'react';

const UserContext = React.createContext();
// const initialState = { isAuthenticated: false, user: {} };
export const UserProvider = ({ children }) => {
  // const [state, dispatch] = useReducer(reducer, initialState);
  // const [loading,setLoading]=useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);
  return (
    <UserContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </UserContext.Provider>
  );
};
// make sure use
export const useUserContext = () => {
  return useContext(UserContext);
};
