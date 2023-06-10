import { useContext } from 'react';
import { ProductsContext } from '../contextProviders/products_context';

const useProductsContext = () => {
  return useContext(ProductsContext);
};

export default useProductsContext;
