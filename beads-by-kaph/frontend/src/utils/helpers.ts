import axios from 'axios';
export const formatPrice = (number) => {
  return new Intl.NumberFormat('en-us', { style: 'currency', currency: 'USD' });
};

export const getUniqueValues = (data = [], type) => {
  let unique = data.map((item) => item[type]);

  unique = unique.flat();
  let uniqueSet = new Set(unique);

  return ['all', ...uniqueSet];
};

export const axiosInstance = axios.create({ withCredentials: true });

axiosInstance.interceptors.request.use(
  async (req) => {
    if (!req.cookies) {
      const res = await axios.post(`/api/v1/users/refreshToken`, {});
      console.log(res);
    }

    return req;
  },
  (error) => Promise.reject(error)
);
