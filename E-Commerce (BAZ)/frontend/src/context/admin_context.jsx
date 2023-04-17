import axios from 'axios';
import { useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import reducer from '../reducers/admin_reducer';

const AdminContext = createContext();

const initialState = {
  totalRevenue: 0,
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchTotalRevenue = async () => {
    const response = axios.get('/order/revenue');
    console.log(response);
  };
  return (
    <AdminContext.Provider value={{ ...state, fetchTotalRevenue }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
