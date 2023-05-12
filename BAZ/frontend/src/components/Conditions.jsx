import styled from 'styled-components';
import { BsShieldCheck } from 'react-icons/bs';
import { RxCube } from 'react-icons/rx';
import { FiTruck } from 'react-icons/fi';

const Conditions = () => {
  const terms = [
    {
      icons: <RxCube />,
      meaning: 'Delivered between 9-12 business days',
    },
    {
      icons: <FiTruck />,
      meaning: 'For overseas delivery, orders should be made via instagram',
    },
    {
      icons: <BsShieldCheck />,
      meaning: 'Secure payment with Paystack',
    },
  ];

  const termList = terms.map((term, index) => (
    <li key={index}>
      <div className='termIcon'>{term.icons}</div>
      <div className='termMeaning'>{term.meaning}</div>
    </li>
  ));

  return <Wrapper className='flex-column'>{termList}</Wrapper>;
};

const Wrapper = styled.ul`
  justify-content: center;
  align-items: flex-start;
  gap: 18px;
  width: 100%;
  margin-block: 2em;
  li {
    display: flex;
    align-items: center;
    gap: 10.5px;
  }
  .termMeaning {
    font-family: Inter;
    font-style: normal;
    font-weight: 400;
    font-size: 15px;
    line-height: 18px;
  }
  .termIcon {
    font-size: 24px;
  }
`;
export default Conditions;
