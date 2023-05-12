import { Link } from 'react-router-dom';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { adminSidebarLinks } from '../../utils/constants';

const AdminSidebar = ({ page }) => {
  const links = adminSidebarLinks.map((link, index) => (
    <li key={index} className={page === link.tag ? 'active' : null}>
      <Link to={link.link}>{link.name}</Link>
    </li>
  ));
  return (
    <Wrapper>
      <ul className='flex-column'>{links}</ul>
    </Wrapper>
  );
};

AdminSidebar.propTypes = {
  page: PropTypes.oneOf(['overview', 'product', 'order', 'users']).isRequired,
};

AdminSidebar.defaultProps = {
  page: 'overview',
};

const Wrapper = styled.aside`
  height: calc(100vh - 7em);
  border-right: 1px solid #b6b6b6;
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
  li > a {
    font-family: 'Zilla Slab';
    font-size: 28px;
    line-height: 34px;
    color: #2a2a2a;
  }
`;
export default AdminSidebar;
