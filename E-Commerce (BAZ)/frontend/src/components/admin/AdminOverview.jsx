import React from 'react';
import styled from 'styled-components';

const AdminOverview = () => {
  return (
    <Wrapper>
      <div className='hero'></div>
      <div className='hero_body'>
        <div className='analysis'></div>
        <div className='order-sales'></div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default AdminOverview;
