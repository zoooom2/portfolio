import logo from '../../../../assets/image 2.svg';
import { Link } from 'react-router-dom';
import { FaTimes } from 'react-icons/fa';

import styled from 'styled-components';
import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import { closeAdminSidebar } from '../../adminSlice';
import AdminMenuButtons from '../AdminMenuButtons';
import { adminLinks } from '../../../../utils/constants';

const AdminSidebar = () => {
  const dispatch = useAppDispatch();
  const { showSidebar } = useAppSelector((state) => state.admin);

  return (
    <SidebarContainer>
      <aside
        className={`${
          showSidebar ? 'sidebar show-sidebar' : 'xl:hidden sidebar'
        }`}>
        <div className='sidebar-header'>
          <img src={logo} className='logo' alt='logo' />
          <button
            type='button'
            className='close-btn'
            onClick={() => {
              dispatch(closeAdminSidebar());
            }}>
            <FaTimes />
          </button>
        </div>
        <ul className='links'>
          {adminLinks.map(({ id, text, url }) => {
            return (
              <li key={id}>
                <Link
                  to={url}
                  onClick={() => {
                    dispatch(closeAdminSidebar());
                  }}>
                  {text}
                </Link>
              </li>
            );
          })}
        </ul>
        <div className='flex justify-center'>
          <AdminMenuButtons />
        </div>
      </aside>
    </SidebarContainer>
  );
};

const SidebarContainer = styled.div`
  text-align: center;
  .sidebar-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 1.5rem;
  }
  .close-btn {
    font-size: 2rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    transition: var(--transition);
    cursor: pointer;
    color: var(--clr-red-dark);
    margin-top: 0.2rem;
  }
  .close-btn:hover {
    color: var(--clr-red-light);
  }
  .logo {
    justify-self: center;
    height: 45px;
  }
  .links {
    margin-bottom: 2rem;
  }
  .links a {
    display: block;
    text-align: left;
    font-size: 1rem;
    text-transform: capitalize;
    padding: 1rem 1.5rem;
    color: var(--clr-grey-3);
    transition: var(--transition);
    letter-spacing: var(--spacing);
  }

  .links a:hover {
    padding: 1rem 1.5rem;
    padding-left: 2rem;
    background: var(--clr-grey-10);
    color: var(--clr-grey-2);
  }

  .sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: var(--clr-white);
    transition: var(--transition);
    transform: translate(-100%);
    z-index: -158;
  }
  .show-sidebar {
    transform: translate(0);
    z-index: 999;
  }
  .cart-btn-wrapper {
    margin: 2rem auto;
  }
  //   @media screen and (min-width: 992px) {
  //     .sidebar {
  //       display: none;
  //     }
  //   }
`;

export default AdminSidebar;
