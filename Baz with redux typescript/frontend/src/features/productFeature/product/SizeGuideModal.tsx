import { FaTimes } from 'react-icons/fa';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';

import { closeModal } from '../productSlice';

export default function Modal() {
  const { showModal } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();

  return (
    <>
      {showModal ? (
        <>
          <div className='justify-center items-center mt-[100px] flex overflow-x-hidden overflow-y-hidden fixed inset-0 z-50 outline-none focus:outline-none'>
            <div className='relative w-auto my-6 mx-auto max-w-3xl'>
              <div className='border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none'>
                <div className='relative flex-auto'>
                  <img
                    src={
                      'https://res.cloudinary.com/dlk2a6ppp/image/upload/v1700295260/Size_Guide_v6e4ci.jpg'
                    }
                    alt='SizeGuide'
                    className='object-contain h-[500px]'
                  />
                  <button
                    className='absolute right-4 top-4 text-baz-danger text-[24px]'
                    onClick={() => {
                      dispatch(closeModal());
                    }}>
                    <FaTimes />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='opacity-25 fixed inset-0 z-40 bg-black'></div>
        </>
      ) : null}
    </>
  );
}
