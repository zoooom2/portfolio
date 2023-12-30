import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import Hero from '../Layout/Hero';
import { products_url as url } from '../../../../utils/constants';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { changeSideMenuValue, toggleDelBtn } from '../../adminSlice';
import AdminProductBody from './AdminProductBody';
import { useEffect } from 'react';
import { fetchProducts } from '../../../productFeature/productSlice';
import { SpinnerCircular } from 'spinners-react';
import { Error } from '../../../../global_components';
const AdminProduct = () => {
  const dispatch = useAppDispatch();
  const { single_product, products_loading, products_error } = useAppSelector(
    (state) => state.product
  );
  const { showDelBtn } = useAppSelector((state) => state.admin);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchProducts(url));
  }, [single_product]);

  useEffect(() => {
    dispatch(changeSideMenuValue('product'));
  }, []);

  const handleAddNewProduct = () => {
    navigate('/admin/product/create');
  };

  if (products_loading) {
    return (
      <div className='w-full flex items-center justify-center h-[80vh]'>
        <SpinnerCircular secondaryColor={'#000'} color='white' size={200} />
      </div>
    );
  }

  if (products_error) {
    return <Error />;
  }

  return (
    <section className='flex flex-col w-full'>
      <Hero
        title={'Products'}
        description={'View your availabe products and edit them'}
        button={[
          {
            name: 'Add new product',
            icon: AiOutlinePlus,
            action: handleAddNewProduct,
          },
          {
            name: showDelBtn ? 'Cancel' : 'Delete Product',
            icon: showDelBtn ? AiOutlineClose : AiOutlineMinus,
            action: () => dispatch(toggleDelBtn()),
          },
        ]}
      />
      <AdminProductBody />
    </section>
  );
};

export default AdminProduct;
