import React from 'react';
import styled from 'styled-components';
import logo from '../../assets/image 2.svg';
import { CiSearch, CiUser } from 'react-icons/ci';
import { CgProfile } from 'react-icons/cg';

const AdminNav = () => {
  return (
    <Wrapper>
      <img src={logo} alt='logo' className='logo' />
      <div className='home-search'>
        <button>
          <CiSearch />
        </button>
        <button>
          <CiUser />
        </button>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.nav`
  display: flex;
  padding-inline: 2em;
  padding-top: 1em;
  padding-bottom: 1.5em;
  justify-content: space-between;
  align-items: flex-end;
  border-bottom: 1px solid black;
  .home-search {
    display: flex;
    gap: 1em;
    button {
      border: none;
      background-color: transparent;
      font-size: 2em;
      cursor: pointer;
    }
  }
`;
export default AdminNav;
