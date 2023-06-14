import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styled from 'styled-components';

import { setClicked } from '../features/userFeature/userSlice';
import {
  fetchOrderStats,
  fetchVisitorStats,
  fetchRecentOrder,
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

const AdminPages = () => {
  const { page = 'overview' } = useParams() as {
    page: 'overview' | 'product' | 'order' | 'users';
  };
  const dispatch = useAppDispatch();
  const { period } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(fetchRecentOrder());
    dispatch(fetchBestSeller());
    dispatch(fetchOrderStats(period));
    dispatch(fetchVisitorStats(period));
  }, [period]);

  useEffect(() => {
    dispatch(setClicked(false));
  }, []);

  return (
    <Wrapper>
      <AdminNav />
      <main>
        <AdminSidebar page={page} />
        {page === 'overview' && <AdminOverview />}
        {page === 'product' && <AdminProduct />}
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
      height: calc(100vh - 2.8em);
    }
  }
`;
export default AdminPages;
