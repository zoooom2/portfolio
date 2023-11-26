import { Link } from 'react-router-dom';
import {
  Facebook,
  FacebookWhite,
  Instagram,
  InstagramWhite,
  JAMLogo,
  Twitter,
  TwitterWhite,
  footerBg,
  logoWhite,
} from '../../assets';

const Footer = () => {
  return (
    <div className='w-full h-[371px] relative overflow-hidden max-laptop:bg-[#01248c]'>
      <div className='absolute h-full bottom-0 max-laptop:hidden -z-[1]'>
        <img
          src={footerBg}
          alt=''
          className='object-none object-right-bottom'
        />
      </div>
      <div className='px-[32px] tablet:px-[60px] flex justify-between border-b h-[291px] py-2'>
        <div className='flex flex-col justify-start mt-[32px] gap-5'>
          <div className='laptop:text-[#303b7e] text-[16px] tablet:text-[20px] laptop:text-[24px] font-poppins font-semibold text-white '>
            Navigate
          </div>
          <ul className='flex flex-col gap-6  font-poppins text-[10px] tablet:text-[16px] font-medium text-white laptop:text-[#9296b2] '>
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
        <div className='laptop:aspect-[127/91] laptop:w-[127px] mt-[31px] aspect-[65/47] w-[65px]'>
          <img src={JAMLogo} alt='' className='w-full max-laptop:hidden' />
          <img src={logoWhite} alt='' className='w-full laptop:hidden' />
        </div>
      </div>
      <div className='flex justify-around w-full laptop:px-[125px] h-[80px] items-center'>
        <div className='laptop:text-[#303b7e] font-poppins text-[12px] font-medium text-white flex max-tablet:flex-col'>
          <div>&copy; {new Date().getFullYear()}</div>
          <div>All rights reserved</div>
        </div>
        <ul className='flex tablet:gap-[25px] gap-[16px]'>
          <li className='aspect-square max-tablet:w-6'>
            <img src={Instagram} alt='' className='max-laptop:hidden' />
            <img src={InstagramWhite} alt='' className='laptop:hidden' />
          </li>
          <li className='aspect-square max-tablet:w-6'>
            <img src={Facebook} alt='' className='max-laptop:hidden' />
            <img src={FacebookWhite} alt='' className='laptop:hidden' />
          </li>
          <li className='aspect-square max-tablet:w-6'>
            <img src={Twitter} alt='' className='max-laptop:hidden' />
            <img src={TwitterWhite} alt='' className='laptop:hidden' />
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
