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
        className='tablet:border tablet:border-[#b6b6b6] px-[15px] tablet:aspect-[306/328] tablet:w-[280px] tablet:h-[300px] items-center gap-[15px] w-full relative flex tablet:flex-col'>
        <div className='tablet:h-[230px] flex justify-center items-center tablet:p-3 aspect-[51/48] max-tablet:w-[60px]'>
          <img
            src={product.images[0]}
            alt='productImage'
            className='object-contain w-full h-full'
          />
        </div>
        <div className='flex justify-between items-start max-tablet:border-b border-[#b6b6b6] w-full max-tablet:py-[24px]'>
          <div className='flex flex-col'>
            <div className='text-black font-baz1 text-[14px] tablet:text-[18px] capitalize'>
              {product.productName}
            </div>
            <div className='text-[#2A2A2A] text-[14px] font-baz1'>sizes</div>
          </div>
          <div className='text-[#2A2A2A] text-[14px] tablet:text-[18px] font-baz1'>
            {priceFormat(product.price)}
          </div>
        </div>
        {showDelBtn && (
          <button
            className='absolute right-3 max-tablet:bottom-3  tablet:top-3 text-black rounded-lg border border-black p-1 text-[14px] tablet:text-[18px]'
            onClick={() => handleDeleteProduct(product._id as string)}>
            <AiOutlineClose />
          </button>
        )}
      </Link>
    );
  });
  return <>{collectionBody}</>;
};

export default AdminProductCollectionBody;
