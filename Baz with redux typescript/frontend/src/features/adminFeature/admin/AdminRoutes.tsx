import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';
import { fetchProfile } from '../../userFeature/userSlice';

import {
  closeAdminModal,
  deleteProduct,
  fetchOrders,
  setAdminRoute,
} from '../adminSlice';
import { removeProduct } from '../../productFeature/productSlice';
import { Navbar, Sidebar } from '../../../global_components';
import AdminMenuButtons from './AdminMenuButtons';
import { adminLinks } from '../../../utils/constants';
import AdminSideMenu from './AdminSideMenu';
import styled from 'styled-components';
import Modal from './Layout/Modal';

const AdminRoutes = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { openModal, modalRef, modalTitle, singleOrder, sideMenuValue } =
    useAppSelector((state) => state.admin);

  useEffect(() => {
    if (!isAuthenticated) dispatch(fetchProfile());
  }, [dispatch, isAuthenticated]);

  useEffect(() => {
    dispatch(setAdminRoute(true));
  }, []);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [singleOrder.orderStatus]);

  return isAuthenticated ? (
    <Wrapper className='relative'>
      {openModal && (
        <Modal
          title={modalTitle}
          buttons={[
            {
              name: 'Yes, Confirm',
              action: async () => {
                dispatch(deleteProduct(modalRef));
                dispatch(removeProduct(modalRef));
              },
            },
            { name: 'Cancel', action: () => dispatch(closeAdminModal()) },
          ]}
        />
      )}
      <Navbar buttons={<AdminMenuButtons />} admin={true} />

      <Sidebar navLinks={adminLinks} footerButtons={<AdminMenuButtons />} />
      <main className='relative'>
        <div className='fixed sideMenu pt-[120px]'>
          <AdminSideMenu page={sideMenuValue} />
        </div>
        <div className='laptop:pl-[220px] mainContent w-full pt-[120px] px-2'>
          <Outlet />
        </div>
      </main>
    </Wrapper>
  ) : (
    <Navigate to={`/login?redirectTo=${location.pathname}`} />
  );
};

const Wrapper = styled.section`
  overflow-y: none;
  nav {
    position: fixed;
  }
  main {
    display: flex;
    // grid-template-columns: auto 1fr;

    section {
      font-size: 40px;
      // height: fit-content;
    }
    .sideMenu {
      @media (max-width: 1024px) {
        display: none;
      }
    }
    .mainContent {
      @media (max-width: 992px) {
        margin-left: 0px;
      }
    }
  }
`;
export default AdminRoutes;
