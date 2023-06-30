import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import { priceFormat } from '../../../../utils/constants';
import { AiOutlineClose } from 'react-icons/ai';
import { openAdminModal } from '../../adminSlice';

const AdminProductCollectionBody = ({
  collectionName,
}: {
  collectionName: string;
}) => {
  const dispatch = useAppDispatch();
  const { products } = useAppSelector((state) => state.product);
  const { showDelBtn } = useAppSelector((state) => state.admin);
  const collectionProduct = products.filter(
    (product) => product.collectionName === collectionName
  );

  const handleDeleteProduct = (id: string) => {
    dispatch(
      openAdminModal({
        id,
        title: 'Are you sure you want to delete this product?',
      })
    );
  };

  const collectionBody = collectionProduct.map((product) => {
    return (
      <Link
        to={showDelBtn ? '#' : `/admin/product/detail/${product._id}`}
        key={product._id}
        className='border border-solid border-[#b6b6b6] px-[15px] w-[280px] h-[300px] relative'>
        <div className='h-[230px] flex justify-center items-center p-3'>
          <img
            src={product.images[0]}
            alt='productImage'
            className='object-contain w-full h-full'
          />
        </div>
        <div className='flex justify-between items-start'>
          <div className='flex flex-col'>
            <div className='text-black font-baz1 text-[18px] capitalize'>
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
  return <>{collectionBody}</>;
};

export default AdminProductCollectionBody;
