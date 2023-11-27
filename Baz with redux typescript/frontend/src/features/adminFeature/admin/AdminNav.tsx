import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../assets/image 2.svg';

import { useAppDispatch } from '../../../App/hooks';
import AdminMenuButtons from './AdminMenuButtons';
import { FaBars } from 'react-icons/fa';
import { openAdminSidebar } from '../adminSlice';

const AdminNav = () => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper className='fixed w-full flex pt-4 pb-3 border-b border-solid border-[#b6b6b6] items-center justify-between px-8 bg-white z-10'>
      <Link to='/admin/overview'>
        <img src={logo} alt='logo' className='logo' />
      </Link>
      <div className='max-tablet:hidden'>
        <AdminMenuButtons />
      </div>

      <div className='tablet:hidden'>
        <button
          onClick={() => {
            dispatch(openAdminSidebar());
          }}>
          <FaBars />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  button {
    border: none;
    background-color: transparent;
    font-size: 2em;
    cursor: pointer;
  }
`;
export default AdminNav;
