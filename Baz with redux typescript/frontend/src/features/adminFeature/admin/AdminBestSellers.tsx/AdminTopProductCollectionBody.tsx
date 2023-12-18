import { AdminState } from '../../../../types';
import { priceFormat, sizeAbbr } from '../../../../utils/constants';

const AdminTopProductCollectionBody = ({
  products,
}: {
  products: AdminState['aggregateOrder'][number]['products'];
}) => {
  const collectionBody = products.map((product, index) => {
    let total = 0;
    for (let i = 0; i < product.sizes.length; i++) {
      total += product.sizes[i].quantity;
    }
    return (
      <div
        key={index}
        className='tablet:border tablet:border-[#b6b6b6] px-[15px] tablet:aspect-[306/351] tablet:w-[280px] tablet:h-[351px] items-center gap-[15px] w-full relative flex tablet:flex-col'>
        <div className='tablet:h-[250px] flex justify-center items-center tablet:p-3 aspect-[51/48] max-tablet:w-[60px]'>
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
            <div className='text-[#2A2A2A] text-[14px] font-baz1 flex gap-2 '>
              {/* <div></div> */}
              {product.sizes.map(({ size, quantity }, index) => {
                return (
                  <div key={index} className='flex'>
                    <span>{quantity}</span>
                    <span> {sizeAbbr[size]}</span>
                  </div>
                );
              })}
            </div>
            <div className='text-[#2A2A2A] text-[14px] font-baz1'>
              {priceFormat(product.price)}
            </div>
          </div>
          <div className='text-[#2A2A2A] text-[14px] tablet:text-[16px] font-baz1'>
            <div>{priceFormat(total * product.price)}</div>
            <div>{total} pieces</div>
          </div>
        </div>
      </div>
    );
  });
  return <>{collectionBody}</>;
};

export default AdminTopProductCollectionBody;
