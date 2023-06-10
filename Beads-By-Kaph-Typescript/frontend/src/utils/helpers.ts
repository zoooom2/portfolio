import axios from 'axios';
import { CategoryType, SingleProductType } from '../types';
export const formatPrice = (number: number) => {
  return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' });
};

export const getUniqueValues = (
  data: SingleProductType[] = [],
  type: 'category' | 'color'
) => {
  const unique = data.map((item) => item[type]).flat();

  const uniqueSet = new Set(unique);

  return ['all', ...uniqueSet];
};

export const axiosInstance = axios.create({ withCredentials: true });

// axiosInstance.interceptors.request.use(
//   async (req) => {
//     if (!req.cookies) {
//       const res = await axios.post(`/api/v1/users/refreshToken`, {});
//       console.log(res);
//     }

//     return req;
//   },
//   (error) => Promise.reject(error)
// );
