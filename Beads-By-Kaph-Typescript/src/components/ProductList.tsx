import { useFilterContext } from '../context/contextHooks';

import GridView from './GridView';
import ListView from './ListView';

const ProductList = () => {
  const { filtered_product: products, grid_view } = useFilterContext();
  if (products.length < 1)
    return (
      <h5 style={{ textTransform: 'none' }}>
        Sorry, no products match your search
      </h5>
    );
  if (grid_view === false) return <ListView products={products} />;
  return <GridView products={products} />;
};

export default ProductList;
