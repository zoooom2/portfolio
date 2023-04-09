import React from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { AdminNav, AdminSidebar } from '../components';

const AdminPages = () => {
  const { page } = useParams();
  return (
    <Wrapper>
      <AdminNav />
      <main>
        <AdminSidebar />
        <section></section>
      </main>
    </Wrapper>
  );
};

const Wrapper = styled.main``;
export default AdminPages;
