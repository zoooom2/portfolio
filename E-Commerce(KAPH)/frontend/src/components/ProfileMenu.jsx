import styled from 'styled-components';
import { useUserContext } from '../context/user_context';

const ProfileMenu = () => {
  const { user } = useUserContext();
  const { firstname, lastname, username, email, role, photo } = user;
  return (
    <Wrapper>
      <img src={photo} alt="" />
      <h4 className="name">{username}</h4>
      <div className="useremail">{email}</div>
    </Wrapper>
  );
};

const Wrapper = styled.aside``;

export default ProfileMenu;
