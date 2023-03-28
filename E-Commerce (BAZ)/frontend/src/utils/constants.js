import React from 'react';
import { GiCompass, GiDiamondHard, GiStabbedNote } from 'react-icons/gi';
import {
  image1,
  image2,
  image3,
  img,
  img2,
  img1,
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

export const featuredSlide1 = [image1, image2, image3, img, img2];
export const featuredSlide2 = [img1, img3, img4, img5, img6, img7];

export const products_url = 'http://127.0.0.1:2705/api/v1/products';
export const single_product_url = `http://127.0.0.1:2705/api/v1/products/`;
export const auth_url = 'http://localhost:2705/api/v1/auth/google';
