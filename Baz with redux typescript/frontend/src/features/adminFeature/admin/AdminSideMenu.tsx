import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { AdminPageType } from '../../../types';

import { adminSidebarLinks } from '../../../utils/constants';

const AdminSideMenu = ({ page = 'overview' }: { page: AdminPageType }) => {
  const links = adminSidebarLinks.map((link, index) => (
    <li key={index} className={page === link.tag ? 'active' : ''}>
      <Link
        to={link.link}
        className='font-baz2 text-[28px] leading-[34px] text-[#2a2a2a] font-medium'>
        {link.name}
      </Link>
    </li>
  ));
  return (
    <Wrapper className='h-[calc(100vh-6.5em)] border-r border-[#666060] max-xl:hidden'>
      <ul className='flex-column'>{links}</ul>
    </Wrapper>
  );
};

const Wrapper = styled.aside`
  // height: calc(100vh - 7em);
  // border-right: 1px solid #b6b6b6;
  ul {
    padding: 2em;
    gap: 1em;
  }
  li {
    padding: 1em;
  }
  .active {
    border: 1px solid #a4a4a4;
  }
  // li > a {
  //   font-family: 'Zilla Slab';
  //   font-size: 28px;
  //   line-height: 34px;
  //   color: #2a2a2a;
  // }
`;
export default AdminSideMenu;
