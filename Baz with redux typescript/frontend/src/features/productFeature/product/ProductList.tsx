import GridView from './GridView';
import ListView from './ListView';
import { useAppSelector } from '../../../App/hooks';

const ProductList = () => {
  const { filtered_product: products, grid_view } = useAppSelector(
    (state) => state.filter
  );

  if (products.length < 1)
    return (
      <h5
        style={{
          textTransform: 'none',
          fontFamily: 'Bell MT',
          marginTop: '5em',
          display: 'flex',
          justifyContent: 'center',
        }}>
        Sorry, no product match your search
      </h5>
    );
  if (grid_view === false) return <ListView products={products} />;
  return <GridView products={products} />;
};

export default ProductList;