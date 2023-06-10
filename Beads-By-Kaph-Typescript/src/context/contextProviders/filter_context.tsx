import {
  useEffect,
  useReducer,
  createContext,
  ChangeEvent,
  MouseEvent,
  useCallback,
  useMemo,
} from 'react';
import reducer from '../../reducers/filter_reducer';
import {
  LOAD_PRODUCTS,
  SET_GRIDVIEW,
  SET_LISTVIEW,
  UPDATE_SORT,
  SORT_PRODUCTS,
  UPDATE_FILTERS,
  FILTER_PRODUCTS,
  CLEAR_FILTERS,
} from '../../actions';

import useProductsContext from '../contextHooks/useProductContext';
import { ChildrenProps, FilterContextStatetype } from '../../types';
import {
  defaultValue,
  FilterContextValue,
  initialState,
} from '../defaultContextValue/filterDefault';

export const FilterContext = createContext<FilterContextValue>(defaultValue);

export const FilterProvider = ({ children }: ChildrenProps) => {
  const { products } = useProductsContext();
  const [state, dispatch] = useReducer(reducer, initialState);

  const loadProducts = useCallback(() => {
    dispatch({ type: LOAD_PRODUCTS, payload: { products } });
  }, [products]);

  const filterProducts = useCallback(
    () => dispatch({ type: FILTER_PRODUCTS }),
    []
  );
  const sortProducts = useCallback(() => dispatch({ type: SORT_PRODUCTS }), []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts, products]);

  useEffect(() => {
    filterProducts();
    sortProducts();
    dispatch({ type: SORT_PRODUCTS });
  }, [products, state.sort, state.filters, filterProducts, sortProducts]);

  const setGridView = () => {
    dispatch({ type: SET_GRIDVIEW });
  };
  const setListView = () => {
    dispatch({ type: SET_LISTVIEW });
  };

  const updateSort = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch({ type: UPDATE_SORT, payload: { value } });
  }, []);
  const updateFilters = useCallback(
    (event: ChangeEvent<HTMLInputElement> | MouseEvent<HTMLButtonElement>) => {
      if (event.target instanceof HTMLInputElement) {
        const name = event.target.name;
        let value: string | null | boolean = event.target.value;
        if (name === 'category') {
          value = event.target.textContent;
        }
        if (name === 'color') {
          value = event.target.dataset.color as string;
        }
        if (name === 'shipping') {
          value = event.target.checked;
        }
        dispatch({ type: UPDATE_FILTERS, payload: { name, value } });
      }
    },
    []
  );
  const clearFilters = useCallback(() => {
    dispatch({ type: CLEAR_FILTERS });
  }, []);

  const value = useMemo(
    () => ({
      ...state,
      setGridView,
      setListView,
      updateSort,
      updateFilters,
      clearFilters,
    }),
    [clearFilters, state, updateFilters, updateSort]
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
// make sure use
