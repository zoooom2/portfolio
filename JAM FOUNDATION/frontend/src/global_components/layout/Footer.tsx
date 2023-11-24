import { Link } from 'react-router-dom';
import { Facebook, Instagram, JAMLogo, Twitter } from '../../assets';

const Footer = () => {
  return (
    <div className='w-full h-[371px]'>
      <div className='px-[60px] flex justify-between border-b h-[291px] py-2'>
        <div className='flex flex-col justify-around'>
          <div className='text-[#303b7e] text-[16px] font-poppins font-semibold'>
            Navigate
          </div>
          <ul className='flex flex-col justify-between h-[201px] items-start font-poppins text-[14px] font-medium text-[#9296b2]'>
            <li>
              <Link to={'/'} className='hover:text-inherit'>
                Home
              </Link>
            </li>
            <li>
              <Link to={'/articles'} className='hover:text-inherit'>
                Blog
              </Link>
            </li>
            <li>
              <Link to={'/about'} className='hover:text-inherit'>
                About
              </Link>
            </li>
            <li>
              <Link to={'/contact'} className='hover:text-inherit'>
                Contact
              </Link>
            </li>
          </ul>
        </div>
        <div className='aspect-[127/91] w-[127px]'>
          <img src={JAMLogo} alt='' className='w-full' />
        </div>
      </div>
      <div className='flex justify-between w-full px-[125px] h-[80px] items-center'>
        <div className='text-[#303b7e] font-poppins text-[12px] font-medium'>
          &copy; {new Date().getFullYear()} All rights reserved
        </div>
        <ul className='flex gap-[25px]'>
          <li>
            <img src={Instagram} alt='' />
          </li>
          <li>
            <img src={Facebook} alt='' />
          </li>
          <li>
            <img src={Twitter} alt='' />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
