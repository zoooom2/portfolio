import { useEffect } from 'react';
import { products_url as url } from '../utils/constants';
import styled from 'styled-components';

import { setClicked } from '../features/userFeature/userSlice';
import {
  fetchOrderStats,
  fetchVisitorStats,
  getTopProducts,
  closeAdminModal,
  deleteProduct,
} from '../features/adminFeature/adminSlice';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import {
  AdminOrders,
  AdminOverview,
  AdminProduct,
  AdminSideMenu,
} from '../features/adminFeature/admin';
import AdminProductForm from '../features/adminFeature/admin/AdminProducts/AdminProductForm';
import Modal from '../features/adminFeature/admin/Layout/Modal';
import AdminOrderDetail from '../features/adminFeature/admin/AdminOrders/AdminOrderDetail';
import {
  fetchProducts,
  removeProduct,
} from '../features/productFeature/productSlice';

import { Navbar, Sidebar } from '../global_components';
import AdminMenuButtons from '../features/adminFeature/admin/AdminMenuButtons';
import { adminLinks } from '../utils/constants';
import AdminTopProducts from '../features/adminFeature/admin/AdminBestSellers.tsx/AdminTopProducts';

const AdminPages = ({
  page,
}: {
  page:
    | 'overview'
    | 'product'
    | 'order'
    | 'bestSeller'
    | 'productDetail'
    | 'productCreate'
    | 'orderDetail';
}) => {
  const dispatch = useAppDispatch();
  const { period, openModal, modalRef, modalTitle } = useAppSelector(
    (state) => state.admin
  );
  const { clicked } = useAppSelector((state) => state.user);
  const { single_product } = useAppSelector((state) => state.product);

  useEffect(() => {
    document.title = 'Admin | Baz Official Store';
    if (clicked) dispatch(setClicked(false));
    dispatch(fetchProducts(url));
    dispatch(getTopProducts(period));
    dispatch(fetchOrderStats(period));
    dispatch(fetchVisitorStats(period));
  }, [period]);

  return (
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
          <AdminSideMenu
            page={
              page === 'productDetail'
                ? 'product'
                : page === 'productCreate'
                ? 'product'
                : page === 'orderDetail'
                ? 'order'
                : page
            }
          />
        </div>
        <div className='laptop:pl-[220px] mainContent w-full pt-[120px] px-2'>
          {page === 'overview' && <AdminOverview />}
          {page === 'product' && <AdminProduct />}
          {page === 'productDetail' && (
            <AdminProductForm type={'detail'} product={single_product} />
          )}
          {page === 'productCreate' && <AdminProductForm type={'create'} />}
          {page === 'order' && <AdminOrders />}
          {page === 'orderDetail' && <AdminOrderDetail />}
          {page === 'bestSeller' && <AdminTopProducts />}
        </div>
      </main>
    </Wrapper>
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
export default AdminPages;
