import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../../../assets/image 2.svg';
import { CiSearch, CiUser, CiLogout } from 'react-icons/ci';
import { logOut } from '../../userFeature/userSlice';
import { useAppDispatch } from '../../../App/hooks';

const AdminNav = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <Wrapper className='flex pt-4 pb-3 border-b border-solid border-[#b6b6b6] items-center justify-between px-8'>
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
  // display: flex;
  // padding-inline: 2em;
  // padding-top: 1em;
  // padding-bottom: 1.5em;
  // justify-content: space-between;
  // align-items: flex-end;
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
