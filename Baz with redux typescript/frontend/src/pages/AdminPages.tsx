import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
  AdminSidebar,
  AdminUser,
} from '../features/adminFeature/admin';
import AdminProductForm from '../features/adminFeature/admin/AdminProducts/AdminProductForm';
import Modal from '../features/adminFeature/admin/Layout/Modal';

const AdminPages = ({
  page,
}: {
  page:
    | 'overview'
    | 'product'
    | 'order'
    | 'users'
    | 'productDetail'
    | 'productCreate';
}) => {
  const dispatch = useAppDispatch();
  const { period, openModal, modalRef, modalTitle } = useAppSelector(
    (state) => state.admin
  );
  const { clicked } = useAppSelector((state) => state.user);
  const { single_product: product } = useAppSelector((state) => state.product);
  useEffect(() => {
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
              },
            },
            { name: 'Cancel', action: () => dispatch(closeAdminModal()) },
          ]}
        />
      )}
      <AdminNav />
      <div className='h-[100px]'></div>
      <main>
        <AdminSidebar
          page={
            page === 'productDetail'
              ? 'product'
              : page === 'productCreate'
              ? 'product'
              : page
          }
        />
        {page === 'overview' && <AdminOverview />}
        {page === 'product' && <AdminProduct />}
        {page === 'productDetail' && (
          <AdminProductForm type={'detail'} product={product} />
        )}
        {page === 'productCreate' && <AdminProductForm type={'create'} />}
        {page === 'order' && <AdminOrders />}
        {page === 'users' && <AdminUser />}
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  overflow-y: none;
  main {
    display: grid;
    grid-template-columns: auto 1fr;

    section {
      font-size: 40px;
      // height: fit-content;
    }
  }
`;
export default AdminPages;
