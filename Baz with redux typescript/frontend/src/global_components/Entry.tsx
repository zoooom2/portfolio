import styled from 'styled-components';
import { useAppDispatch } from '../App/hooks';
import { setClicked } from '../features/userFeature/userSlice';
import { BAZLoading } from '../utils/constants';

const Entry = () => {
  const dispatch = useAppDispatch();
  return (
    <Wrapper
      className='flex-column gap-[32px] place-center absolute z-[10000] bg-baz-white top-0 left-0 h-screen w-screen cursor-pointer'
      onClick={() => dispatch(setClicked(true))}>
      <div className='flex justify-center laptop:w-1/2'>
        <img src={BAZLoading} alt='' className='w-3/5 ' />
      </div>
      <p className='font-baz2 font-medium text-[16px] leading-[19px] tracking-[0.255em]'>
        click to enter
      </p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  // img {
  //   @media (min-width: 768px) {
  //     width: 400px;
  //   }
  // }
`;

export default Entry;
