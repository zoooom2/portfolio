import { ChangeEvent, MouseEvent } from 'react';
import { FilterContextStatetype } from '../../types';

export const initialState: FilterContextStatetype = {
  filtered_product: [],
  all_products: [],
  grid_view: true,
  sort: 'price-lowest',
  filters: {
    text: '',
    category: 'all',
    color: 'all',
    min_price: 0,
    max_price: 0,
    price: 0,
    shipping: false,
  },
};
export interface FilterContextValue extends FilterContextStatetype {
  setGridView: () => void;
  setListView: () => void;
  updateSort: (e: ChangeEvent<HTMLSelectElement>) => void;
  updateFilters: (
    e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>
  ) => void;
  clearFilters: () => void;
}
export const defaultValue: FilterContextValue = {
  setGridView: function (): void {
    throw new Error('Function not implemented.');
  },
  setListView: function (): void {
    throw new Error('Function not implemented.');
  },
  updateSort: function (_e: ChangeEvent<HTMLSelectElement>): void {
    throw new Error('Function not implemented.');
  },
  updateFilters: function (
    e: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>
  ): void {
    throw new Error('Function not implemented.');
  },
  clearFilters: function (): void {
    throw new Error('Function not implemented.');
  },
  ...initialState,
};
