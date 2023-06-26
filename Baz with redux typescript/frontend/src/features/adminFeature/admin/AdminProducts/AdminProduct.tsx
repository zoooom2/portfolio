import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import Hero from '../Layout/Hero';
import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { MdKeyboardArrowUp } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getUniqueValues } from '../../../../utils/helpers';
import { priceFormat } from '../../../../utils/constants';
import { Link } from 'react-router-dom';
import Modal from '../Layout/Modal';
import { closeAdminModal, openAdminModal } from '../../adminSlice';
import { useState } from 'react';
const AdminProduct = () => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { openModal } = useAppSelector((state) => state.admin);
  const [showDelBtn, setShowDelBtn] = useState(false);

  const collection = getUniqueValues(products, 'collectionName');
  const navigate = useNavigate();

  const handleAddNewProduct = () => {
    navigate('/admin/product/create');
  };
  const handleDeleteProduct = (id: string) => {
    console.log(openModal);
    console.log(id);
    dispatch(openAdminModal());
    console.log('handleDeleteProduct');
  };

  const body = collection.map((collectionName, index) => {
    const collectionProduct = products.filter(
      (product) => product.collectionName === collectionName
    );
    const collectionBody = collectionProduct.map((product) => {
      return (
        <Link
          to={showDelBtn ? '#' : `/admin/product/detail/${product._id}`}
          key={product._id}
          className='border border-solid border-[#b6b6b6] px-[15px] w-[280px] h-[300px] relative'>
          <div className='h-[230px] flex justify-center items-center'>
            <img
              src={product.images[0]}
              alt='productImage'
              className='object-contain'
            />
          </div>
          <div className='flex justify-between items-start'>
            <div className='flex flex-col'>
              <div className='text-black font-baz1 text-[18px]'>
                {product.productName}
              </div>
              <div className='text-[#2A2A2A] text-[14px] font-baz1'>sizes</div>
            </div>
            <div className='text-[#2A2A2A] text-[18px] font-baz1'>
              {priceFormat(product.price)}
            </div>
          </div>
          {showDelBtn && (
            <button
              className='absolute right-3 top-3 text-black rounded-lg border border-black p-1'
              onClick={() => handleDeleteProduct(product._id)}>
              <AiOutlineClose size={18} />
            </button>
          )}
        </Link>
      );
    });

    return (
      <div key={index} className='px-[48px] '>
        <div className='flex items-end justify-between  border-b border-solid border-[#9b9b9b] pb-[20px] pt-[33px]'>
          <div className='font-medium text-[28px] leading-[42px] font-baz1'>
            {collectionName}
          </div>
          <div>
            <MdKeyboardArrowUp size={'30px'} />
          </div>
        </div>
        <section className='flex justify-start flex-shrink-0 flex-wrap  gap-[40px] py-[40px]'>
          {collectionBody}
        </section>
      </div>
    );
  });

  return (
    <>
      <section className='flex flex-col'>
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
              action: () => setShowDelBtn(!showDelBtn),
            },
          ]}
        />
        {body}
      </section>
    </>
  );
};

export default AdminProduct;
