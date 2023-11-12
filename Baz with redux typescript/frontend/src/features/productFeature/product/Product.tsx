import { Link } from 'react-router-dom';
import { priceFormat } from '../../../utils/constants';
import { SingleProductType } from '../../../types';

const Product = ({
  images,
  _id: id,
  productName: name,
  price,
  stock,
}: SingleProductType) => {
  return (
    <Link
      to={`/shop/${id}`}
      className='flex flex-col px-7 py-2 border-b border-r border-black'>
      <div className='w-full h-full flex items-center justify-center'>
        <img
          src={images && images[0]}
          alt={name}
          loading='lazy'
          className='object-contain'
        />
      </div>

      <footer className='flex-column gap-[10.426px]'>
        <h5 className='text-[20.926px] font-baz2 tracking-[2.093px] text-black '>
          {name}
        </h5>

        <p
          className={`${
            stock > 0 ? '' : 'line-through'
          }text-black font-normal leading-normal text-[20.926px] font-baz1`}>
          {`${priceFormat(price)} ${stock > 0 ? '' : ' Sold-Out'}`}
        </p>
      </footer>
    </Link>
  );
};

export default Product;
