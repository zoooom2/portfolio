import styled from 'styled-components';
import { CiMail } from 'react-icons/ci';
import { MenuDetails, Lists } from '../components';
import { useUserContext } from '../context/contextHooks';

const UserProfilePage = () => {
  const { user, handleImage, removeImage, imageFile } = useUserContext();
  const { firstname, lastname, username, email, role, photo } = user;
  // const { file, filePreview } = imageFile;

  return (
    <Wrapper className='page-100 section section-center'>
      <div className='profile-picture-container'>
        <div className='profile-picture-background'>
          <img
            src={photo || 'default.png'}
            alt=''
            className='profile-picture'
          />
        </div>
        <h5 className='username'>{username}</h5>
        <p className='contact-details'>
          <CiMail />
          <span>{email}</span>
        </p>
      </div>

      <main className='profileDetailsContainer'>
        <ul className='menu'>
          <Lists />
        </ul>
        <MenuDetails />
      </main>
      <div className='menuInfo'></div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  .profile-picture-container {
    width: 100%;
    height: 15rem;
    border-radius: 5px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    margin-inline: auto;
  }
  .profile-picture-background {
    position: relative;
    border-radius: 5px;
    background: black;
    height: 60%;
    margin: 0.2rem;
    display: flex;
    flex-direction: column;
  }

  .profile-picture {
    position: absolute;
    height: 100%;
    margin: 0.5rem;
    border: 4px solid white;
    border-radius: 50%;
    background: white;
  }
  .username {
    font-weight: 500;
    letter-spacing: 0.5px;
    margin-left: 1.1rem;
    margin-block: 1em;
    text-transform: capitalize;
  }
  .contact-details {
    margin-left: 1.1rem;
    color: grey;
  }
  span {
    margin-left: 0.5rem;
  }
  .profileDetailsContainer {
    display: flex;
    margin-block: 1rem;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 5px;
  }
  .menu {
    border-radius: 5px;
    padding: 0.4rem 1.5rem;
  }
`;

export default UserProfilePage;
