import axios from 'axios';
import { useEffect, useReducer } from 'react';
import { useContext } from 'react';
import { createContext } from 'react';
import {
  LOAD_BEST_SELLER,
  LOAD_RECENT_ORDERS,
  SET_ORDER_STATS,
  SET_PERIOD,
  SET_VISITOR_STATS,
} from '../actions';
import reducer from '../reducers/admin_reducer';
import { priceFormat } from '../utils/constants';

const AdminContext = createContext();

const initialState = {
  period: 'monthly',
  totalRevenue: 0,
  previousTotalRevenue: 0,
  totalOrder: 0,
  previousTotalOrder: 0,
  visitor: 0,
  previousVisitor: 0,
  totalSale: 0,
  previousTotalSales: 0,
  percentageRevenue: priceFormat(0),
  percentageOrder: 0,
  percentageVisitor: 0,
  percentageSales: 0,
  recentOrders: [],
  bestSeller: [],
};

export const AdminProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const fetchOrderStats = async () => {
    const response = await axios.get(
      `/api/v1/order/pctchange?time=${state.period}`
    );
    dispatch({ type: SET_ORDER_STATS, payload: response.data.stats });
  };

  const fetchVisitorStats = async () => {
    const response = await axios.get(
      `/api/v1/visitor/pctchange?time=${state.period}`
    );
    dispatch({ type: SET_VISITOR_STATS, payload: response.data.stats });
  };

  const fetchRecentOrder = async () => {
    const response = await axios.get('/api/v1/order?limit=5');
    dispatch({ type: LOAD_RECENT_ORDERS, payload: response.data.data });
  };

  const changeTimeRange = (time) => {
    dispatch({ type: SET_PERIOD, payload: time });
  };
  const fetchBestSeller = async () => {
    const response = await axios.get(
      '/api/v1/products?sort=quantitySold&limit=3'
    );
    dispatch({ type: LOAD_BEST_SELLER, payload: response.data.data });
  };
  useEffect(() => {
    fetchOrderStats();
    fetchVisitorStats();
    fetchRecentOrder();
    fetchBestSeller();
  }, [state.period]);
  return (
    <AdminContext.Provider value={{ ...state, changeTimeRange }}>
      {children}
    </AdminContext.Provider>
  );
};

export const useAdminContext = () => useContext(AdminContext);
