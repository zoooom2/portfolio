import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { checkoutStage } from '../../../utils/constants';

const CheckoutStage = ({ position = 1 }: { position: number }) => {
  const [stage, setStage] = useState(1);

  useEffect(() => {
    setStage(position);
  }, [position]);

  return (
    <Wrapper>
      {checkoutStage.map((i) => (
        <li key={i.id} value={i.id} className={stage === i.id ? 'active' : ''}>
          {i.stage}
        </li>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.ul`
  display: flex;
  width: 100%;
  font-family: 'Zilla Slab';
  font-size: 21px;
  line-height: 25px;
  letter-spacing: 0.1em;
  border-bottom: 1px solid black;
  @media (max-width: 768px) {
    font-size: 1em;
  }
  li {
    display: grid;
    place-items: center;
    width: calc(100% / 3);
    padding: 0.5em;
  }
  .active {
    background: black;
    color: white;
  }
`;

export default CheckoutStage;
