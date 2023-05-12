import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import {
  AdminNav,
  AdminSidebar,
  AdminOverview,
  AdminProduct,
  AdminOrders,
  AdminUsers,
} from '../components';
import { setClicked } from '../features/userFeature/userSlice';
import {
  fetchOrderStats,
  fetchVisitorStats,
  fetchRecentOrder,
  fetchBestSeller,
} from '../features/adminFeature/adminSlice';
import { useSelector, useDispatch } from 'react-redux';
const AdminPages = () => {
  const { page } = useParams();
  const dispatch = useDispatch();
  const { period } = useSelector((state) => state.admin);

  useEffect(() => {
    async () => {
      dispatch(fetchRecentOrder());
      dispatch(fetchBestSeller());
      dispatch(fetchOrderStats(period));
      dispatch(fetchVisitorStats(period));
    };
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
        {page === 'users' && <AdminUsers />}
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
