import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import Hero from '../Layout/Hero';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toggleDelBtn } from '../../adminSlice';
import AdminProductBody from './AdminProductBody';
const AdminProduct = () => {
  const dispatch = useAppDispatch();
  const { showDelBtn } = useAppSelector((state) => state.admin);
  const navigate = useNavigate();

  const handleAddNewProduct = () => {
    navigate('/admin/product/create');
  };

  return (
    <>
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
    </>
  );
};

export default AdminProduct;
