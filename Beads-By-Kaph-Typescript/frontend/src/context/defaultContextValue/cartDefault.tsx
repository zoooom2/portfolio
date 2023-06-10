import { CartContextStateType, SingleProductType } from '../../types';

export const initialState = {
  cart: [],
  total_items: 0,
  total_amount: 0,
  shippingInfo: {
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    country: '',
    countryCode: '',
    phoneNumber: '',
    postCode: '',
    email: '',
  },
};
export interface CartContextValue extends CartContextStateType {
  addToCart: (
    id: string,
    color: string,
    amount: number,
    product: SingleProductType,
    size: number
  ) => void;
  removeItem: (id: string) => void;
  toggleAmount: (
    id: string,
    value: string,
    color: string,
    size: number
  ) => void;
  clearCart: () => void;
  updateShipping: (detail: string, info: string) => void;
  clearShipping: () => void;
  handlePayStack: () => void;
  handlePaypal: () => void;
  handleStripe: () => void;
}

export const defaultValue: CartContextValue = {
  addToCart: function (
    id: string,
    color: string,
    amount: number,
    product: SingleProductType,
    size: number
  ): void {
    throw new Error('Function not implemented.');
  },
  removeItem: function (id: string): void {
    throw new Error('Function not implemented.');
  },
  toggleAmount: function (
    id: string,
    value: string,
    color: string,
    size: number
  ): void {
    throw new Error('Function not implemented.');
  },
  clearCart: function (): void {
    throw new Error('Function not implemented.');
  },
  updateShipping: function (detail: string, info: string): void {
    throw new Error('Function not implemented.');
  },
  clearShipping: function (): void {
    throw new Error('Function not implemented.');
  },
  handlePayStack: function (): void {
    throw new Error('Function not implemented.');
  },
  handlePaypal: function (): void {
    throw new Error('Function not implemented.');
  },
  handleStripe: function (): void {
    throw new Error('Function not implemented.');
  },
  ...initialState,
};
