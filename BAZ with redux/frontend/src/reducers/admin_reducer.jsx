import {
  LOAD_BEST_SELLER,
  LOAD_RECENT_ORDERS,
  SET_ORDER_STATS,
  SET_PERIOD,
  SET_VISITOR_STATS,
} from '../actions';
import { priceFormat } from '../utils/constants';

const admin_reducer = (state, action) => {
  switch (action.type) {
    case SET_ORDER_STATS:
      return {
        ...state,
        totalRevenue: priceFormat(action.payload[1].current),
        percentageRevenue: action.payload[1].percentageDifference,
        totalSale: action.payload[0].current,
        percentageSales: action.payload[0].percentageDifference,
        totalOrder: action.payload[2].current,
        percentageOrder: action.payload[2].percentageDifference,
        previousTotalRevenue: priceFormat(action.payload[1].previous),
        previousTotalSales: action.payload[0].previous,
        previousTotalOrder: action.payload[2].previous,
      };
    case SET_VISITOR_STATS:
      return {
        ...state,
        visitor: action.payload[0].current,
        previousVisitor: action.payload[0].previous,
        percentageVisitor: action.payload[0].percentageDifference,
      };
    case SET_PERIOD:
      return { ...state, period: action.payload };
    case LOAD_RECENT_ORDERS:
      return { ...state, recentOrders: action.payload };
    case LOAD_BEST_SELLER:
      return { ...state, bestSeller: action.payload };
    default:
      throw new Error(`No Matching "${action.type}" - action type`);
  }
};

export default admin_reducer;
