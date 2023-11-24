import { Link } from 'react-router-dom';
import { JAMLogo, MAILLogo, PhoneLogo } from '../../assets';

const Navbar = () => {
  return (
    <div className='flex px-[70px] py-[10px] justify-between h-[80px] w-full fixed top-0 items-center z-[99] bg-white'>
      <div className='flex gap-[40px] h-full items-center'>
        <div className='aspect-[81/58] h-full'>
          <img src={JAMLogo} alt='' className='h-full' />
        </div>
        <ul className='flex gap-[40px] font-inter text-[16px] font-semibold leading-[24px]'>
          <li>
            <Link
              to={'/'}
              className='text-[#01248c] hover:underline hover:text-[#01248c] hover:underline-offset-[16px]'>
              Home
            </Link>
          </li>
          <li>
            <Link
              to={'/about'}
              className='text-[#01248c] hover:underline hover:text-[#01248c] hover:underline-offset-[16px]'>
              About Us
            </Link>
          </li>
        </ul>
      </div>
      <div className='flex items-end gap-[20px]'>
        <div className='flex items-center gap-[10px]'>
          <div className='aspect-square w-[24px]'>
            <img src={PhoneLogo} alt='' className='h-full' />
          </div>
          <div className='font-satoshi text-[16px] font-medium leading-[28px]'>
            <a
              href='tel:+234803462901'
              className='text-[#01248c] hover:text-[#01248c] hover:underline hover:underline-offset-8'>
              +234803462901
            </a>
          </div>
        </div>
        <div className='flex items-center gap-[10px]'>
          <div className='aspect-square w-[24px]'>
            <img src={MAILLogo} alt='' className='h-full' />
          </div>
          <div className='font-satoshi text-[16px] font-medium leading-[28px]'>
            <a
              href='mailto:Jamfoundation@info.com'
              className='text-[#01248c] hover:text-[#01248c] hover:underline hover:underline-offset-8'>
              Jamfoundation@info.com
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
