import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../assets/image 2.svg';
import { CiSearch, CiUser, CiLogout } from 'react-icons/ci';
import { useDispatch } from 'react-redux';
import { logOut } from '../../features/userFeature/userSlice';

const AdminNav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  return (
    <Wrapper>
      <Link to='/admin/overview'>
        <img src={logo} alt='logo' className='logo' />
      </Link>

      <div className='home-search'>
        <button>
          <CiSearch />
        </button>
        <button>
          <CiUser />
        </button>

        <button
          type='button'
          className='auth-btn'
          onClick={() => {
            dispatch(logOut());
            navigate('/login');
          }}>
          <CiLogout />
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
  border-bottom: 1px solid #b6b6b6;
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
