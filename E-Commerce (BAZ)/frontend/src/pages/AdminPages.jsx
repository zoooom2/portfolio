import React, { useEffect } from 'react';
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

import { useUserContext } from '../context/user_context';

const AdminPages = () => {
  const { page } = useParams();
  const { setClicked } = useUserContext();
  useEffect(() => setClicked(false), []);
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
