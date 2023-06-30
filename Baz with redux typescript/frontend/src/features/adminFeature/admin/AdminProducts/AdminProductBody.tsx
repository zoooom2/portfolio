import { MdKeyboardArrowUp } from 'react-icons/md';
import { useAppSelector } from '../../../../App/hooks';
import { getUniqueValues } from '../../../../utils/helpers';
import AdminProductCollectionBody from './AdminProductCollectionBody';

const AdminProductBody = () => {
  const { products } = useAppSelector((state) => state.product);
  const collection = getUniqueValues(products, 'collectionName');

  const body = collection.map((collectionName, index) => {
    return (
      <div key={index} className='px-[48px] '>
        <div className='flex items-end justify-between  border-b border-solid border-[#9b9b9b] pb-[20px] pt-[33px]'>
          <div className='font-medium text-[28px] leading-[42px] font-baz1 capitalize'>
            {collectionName}
          </div>
          <div>
            <MdKeyboardArrowUp size={'30px'} />
          </div>
        </div>
        <section className='flex justify-start flex-shrink-0 flex-wrap  gap-[40px] py-[40px]'>
          <AdminProductCollectionBody collectionName={collectionName} />
        </section>
      </div>
    );
  });
  return <>{body}</>;
};

export default AdminProductBody;
