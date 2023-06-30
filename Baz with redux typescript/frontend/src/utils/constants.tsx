import { MdSell, MdShoppingCart } from 'react-icons/md';
import { FaUsers, FaMoneyCheckAlt } from 'react-icons/fa';

import {
  image1,
  image2,
  image3,
  img,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
} from '../assets/productImage';

export const links = [
  {
    id: 1,
    text: 'Shop',
    url: '/shop',
  },
  {
    id: 2,
    text: 'Thesis',
    url: '/thesis',
  },
  {
    id: 3,
    text: 'Contact',
    url: '/contact',
  },
  {
    id: 4,
    text: 'Delivery',
    url: '/delivery',
  },
];

export const adminLinks = [
  {
    id: 1,
    text: 'Overview',
    url: '/admin/Overview',
  },
  {
    id: 2,
    text: 'Product',
    url: '/admin/product',
  },
  {
    id: 3,
    text: 'Order',
    url: '/admin/order',
  },
  {
    id: 4,
    text: 'User',
    url: '/admin/users',
  },
];

export const checkoutStage = [
  {
    stage: 'information',
    id: 1,
  },
  {
    stage: 'shipping',
    id: 2,
  },
  {
    stage: 'payment',
    id: 3,
  },
];

export const placeholderStyle = {
  fontFamily: 'Poppins',
  fontWeight: 400,
  fontSize: '10px',
  lineHeight: '22px',
  color: 'black',
};

export const selectStyle = {
  fontFamily: 'Poppins',
  fontWeight: 400,
  letterSpacing: '0.05em',
  lineHeight: '22px',
  fontSize: '11px',
  color: 'black',
  border: '1.5px solid #a6a6a6',
  borderRadius: 'none',
  padding: '1em',
};

export const adminSidebarLinks = [
  {
    name: 'Overview',
    tag: 'overview',
    link: '/admin/overview/',
  },
  {
    name: 'Product',
    tag: 'product',
    link: '/admin/product/',
  },
  {
    name: 'Orders',
    tag: 'order',
    link: '/admin/order/',
  },
  {
    name: 'User',
    tag: 'users',
    link: '/admin/users/',
  },
];

export const periodOption = [
  { name: 'today', value: 'daily' },
  { name: 'This week', value: 'weekly' },
  { name: 'This month', value: 'monthly' },
  { name: 'This year', value: 'yearly' },
];

export type AdminAnalyticsType = {
  logo: JSX.Element;
  topic: string;
  value: {
    current: 'totalRevenue' | 'totalOrder' | 'visitor' | 'totalSale';
    previous:
      | 'previousTotalRevenue'
      | 'previousTotalOrder'
      | 'previousVisitor'
      | 'previousTotalSales';
  };
  percentage:
    | 'percentageRevenue'
    | 'percentageOrder'
    | 'percentageVisitor'
    | 'percentageSales';
};

export const adminAnalytics = [
  {
    logo: <FaMoneyCheckAlt />,
    topic: 'Total Revenue',
    value: { current: 'totalRevenue', previous: 'previousTotalRevenue' },
    percentage: 'percentageRevenue',
  },
  {
    logo: <MdShoppingCart />,
    topic: 'Total Orders',
    value: { current: 'totalOrder', previous: 'previousTotalOrder' },
    percentage: 'percentageOrder',
  },
  {
    logo: <FaUsers />,
    topic: 'Total Visitors',
    value: { current: 'visitor', previous: 'previousVisitor' },
    percentage: 'percentageVisitor',
  },
  {
    logo: <MdSell />,
    topic: 'Total Items Sold',
    value: { current: 'totalSale', previous: 'previousTotalSales' },
    percentage: 'percentageSales',
  },
] as AdminAnalyticsType[];

export const priceFormat = (price: number) =>
  `₦${new Intl.NumberFormat('currency').format(price)}`;

export const featuredSlide1 = [image1, image2, image3, img, img2];
export const featuredSlide2 = [img1, img3, img4, img5, img6, img7];

export const products_url = 'https://baz-api.onrender.com/api/v1/products';
export const single_product_url = `https://bazng.vercel.app/api/v1/products/`;
export const auth_url = 'https://baz-api.onrender.com/api/v1/auth/google';
