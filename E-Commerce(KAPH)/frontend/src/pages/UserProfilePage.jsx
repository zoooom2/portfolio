import { useState } from 'react';
import styled from 'styled-components';
import { MenuDetails, ProfileMenu } from '../components';
import { useUserContext } from '../context/user_context';

const UserProfilePage = () => {
  const { user } = useUserContext();
  const [imageFile, setImageFile] = useState({ file: [], filePreview: null });
  const handleImage = (e) => {
    const fileData = e.target.files[0];
    setImageFile({ ...imageFile, filePreview: URL.createObjectURL(fileData) });
  };
  const removeImage = () => {
    setImageFile({ file: [], filePreview: null });
  };
  console.log(user);
  return (
    <Wrapper>
      <div className="page-header">
        <div className="userInfo">
          <div className="userName"></div>
          <div className="useraddress"></div>
        </div>
        <button className="signOutBtn">SIGN OUT</button>
      </div>
      <main className="profileDetailsContainer">
        <ProfileMenu />
        <MenuDetails />
      </main>
      <div className="menuInfo"></div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default UserProfilePage;
