import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
import {
  ankletImage,
  beadedbag,
  bodyWear,
  bracelets,
  custom,
  earrings,
  necklace,
  waistbeads,
} from '../assets/categoryPic';
export const links = [
  {
    id: 1,
    text: 'home',
    url: '/',
  },
  {
    id: 2,
    text: 'about',
    url: '/about',
  },
  {
    id: 3,
    text: 'products',
    url: '/products',
  },
];

export const services = [
  {
    id: 1,
    icon: <GiCompass />,
    title: 'mission',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 2,
    icon: <GiDiamondHard />,
    title: 'vision',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
  {
    id: 3,
    icon: <GiStabbedNote />,
    title: 'history',
    text: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptates, ea. Perferendis corrupti reiciendis nesciunt rerum velit autem unde numquam nisi',
  },
];

export const categoryData = [
  { category: 'Necklaces', image: necklace, id: 1 },
  { category: 'Bags', image: beadedbag, id: 2 },
  { category: 'Bracelets', image: bracelets, id: 3 },
  { category: 'Body Jewelry', image: bodyWear, id: 4 },
  { category: 'Anklets', image: ankletImage, id: 5 },
  { category: 'Earrings', image: earrings, id: 6 },
  { category: 'Waistbeads', image: waistbeads, id: 7 },
  { category: 'Custom Accessories', image: custom, id: 8 },
];

export const products_url = 'https://course-api.com/react-store-products';

export const single_product_url = `https://course-api.com/react-store-single-product?id=`;
