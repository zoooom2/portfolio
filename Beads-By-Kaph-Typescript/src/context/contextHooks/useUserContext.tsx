import { useContext } from 'react';
import { UserContext } from '../contextProviders/user_context';

const useUserContext = () => {
  return useContext(UserContext);
};

export default useUserContext;
