import { MdKeyboardArrowUp } from 'react-icons/md';
import { useAppSelector } from '../../../../App/hooks';

import AdminTopProductCollectionBody from './AdminTopProductCollectionBody';

const AdminTopProductBody = () => {
  const { aggregateOrder } = useAppSelector((state) => state.admin);

  const body = aggregateOrder.map((collection, index) => {
    return (
      <div key={index} className='tablet:px-[48px] px-[16px]'>
        <div className='flex items-end justify-between  border-b border-solid border-[#9b9b9b] pb-[10px] tablet:pb-[20px] pt-[33px]'>
          <div className='font-medium text-[18px] tablet:text-[28px] leading-[42px] font-baz1 capitalize'>
            {`${collection._id} (${collection.totalItemsSold})`}
          </div>
          <div>
            <MdKeyboardArrowUp size={'30px'} />
          </div>
        </div>
        <section className='flex justify-start flex-shrink-0 flex-wrap tablet:gap-[40px] tablet:py-[40px]'>
          <AdminTopProductCollectionBody products={collection.products} />
        </section>
      </div>
    );
  });

  return body;
};
export default AdminTopProductBody;
