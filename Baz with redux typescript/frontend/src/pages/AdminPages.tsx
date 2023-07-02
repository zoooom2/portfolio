import { useEffect } from 'react';

import styled from 'styled-components';

import { setClicked } from '../features/userFeature/userSlice';
import {
  fetchOrderStats,
  fetchVisitorStats,
  fetchOrders,
  fetchBestSeller,
  closeAdminModal,
  deleteProduct,
} from '../features/adminFeature/adminSlice';
import { useAppDispatch, useAppSelector } from '../App/hooks';
import {
  AdminNav,
  AdminOrders,
  AdminOverview,
  AdminProduct,
  AdminSideMenu,
  AdminUser,
} from '../features/adminFeature/admin';
import AdminProductForm from '../features/adminFeature/admin/AdminProducts/AdminProductForm';
import Modal from '../features/adminFeature/admin/Layout/Modal';
import AdminOrderDetail from '../features/adminFeature/admin/AdminOrders/AdminOrderDetail';
import { removeProduct } from '../features/productFeature/productSlice';
import AdminSidebar from '../features/adminFeature/admin/Layout/AdminSidebar';

const AdminPages = ({
  page,
}: {
  page:
    | 'overview'
    | 'product'
    | 'order'
    | 'users'
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
    dispatch(fetchOrders());
    dispatch(fetchBestSeller());
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
      <AdminNav />
      <div className='h-[100px]'></div>
      <AdminSidebar />
      <main className='relative'>
        <div className='fixed '>
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
        <div className='invisible '>
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

        {page === 'overview' && <AdminOverview />}
        {page === 'product' && <AdminProduct />}
        {page === 'productDetail' && (
          <AdminProductForm type={'detail'} product={single_product} />
        )}
        {page === 'productCreate' && <AdminProductForm type={'create'} />}
        {page === 'order' && <AdminOrders />}
        {page === 'orderDetail' && <AdminOrderDetail />}
        {page === 'users' && <AdminUser />}
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  overflow-y: none;
  main {
    display: flex;
    // grid-template-columns: auto 1fr;

    section {
      font-size: 40px;
      // height: fit-content;
    }
  }
`;
export default AdminPages;
