import GridView from './GridView';
import ListView from './ListView';
import { useSelector } from 'react-redux';

const ProductList = () => {
  const { filtered_product: products, grid_view } = useSelector(
    (state) => state.filter
  );

  if (products.length < 1)
    return (
      <h5
        style={{
          textTransform: 'none',
          fontFamily: 'Bell MT',
          marginTop: '5em',
        }}>
        Sorry, no product match your search
      </h5>
    );
  if (grid_view === false) return <ListView products={products} />;
  return <GridView products={products} />;
};

export default ProductList;
