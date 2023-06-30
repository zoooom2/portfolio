import { CiLogout, CiSearch, CiUser } from 'react-icons/ci';
import { useAppDispatch } from '../../../App/hooks';
import { useNavigate } from 'react-router-dom';
import { logOut } from '../../userFeature/userSlice';

const AdminMenuButtons = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  return (
    <div className='gap-4 flex'>
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
  );
};

export default AdminMenuButtons;
