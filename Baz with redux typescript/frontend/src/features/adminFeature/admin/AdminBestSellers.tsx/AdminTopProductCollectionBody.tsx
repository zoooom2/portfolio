import { AdminState } from '../../../../types';
import { priceFormat } from '../../../../utils/constants';

const AdminTopProductCollectionBody = ({
  products,
}: {
  products: AdminState['aggregateOrder'][number]['products'];
}) => {
  const collectionBody = products.map((product, index) => {
    return (
      <div
        key={index}
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
      </div>
    );
  });
  return <>{collectionBody}</>;
};

export default AdminTopProductCollectionBody;
