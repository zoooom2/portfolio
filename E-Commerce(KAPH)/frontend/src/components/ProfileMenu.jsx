import styled from 'styled-components';
const ProfileMenu = () => {
  const profileMenu = [
    { name: 'Personal Information', value: 'PI', id: 1 },
    { name: 'Manage Password', value: 'MP', id: 2 },
    { name: 'Order History', value: 'OH', id: 3 },
    { name: 'Account Setting', value: 'AS', id: 4 },
    { name: 'Notification', value: 'NO', id: 5 },
  ];

  const Lists = profileMenu.map((x) => (
    <Wrapper key={x.id} value={x.value}>
      <button>{x.name}</button>
    </Wrapper>
  ));

  return <>{Lists}</>;
};

const Wrapper = styled.li`
  margin-block: 1em;
  button {
    background: transparent;
    border: none;
    font-size: 1em;
  }
`;
export default ProfileMenu;
