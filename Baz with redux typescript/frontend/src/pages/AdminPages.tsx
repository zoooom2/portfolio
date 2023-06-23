import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { setClicked } from '../features/userFeature/userSlice';
import {
  fetchOrderStats,
  fetchVisitorStats,
  fetchOrders,
  fetchBestSeller,
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
  const { period } = useAppSelector((state) => state.admin);
  const { clicked } = useAppSelector((state) => state.user);
  useEffect(() => {
    if (clicked) dispatch(setClicked(false));
    dispatch(fetchOrders());
    dispatch(fetchBestSeller());
    dispatch(fetchOrderStats(period));
    dispatch(fetchVisitorStats(period));
  }, [period]);

  return (
    <Wrapper>
      <AdminNav />
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
        {page === 'productDetail' && <AdminProductForm type={'detail'} />}
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
