import { useEffect } from 'react';

import {
	clearCart,
	clearShipping,
	countCartTotal,
	updateCartTotal,
} from '../features/cartFeature/cartSlice';

import { useAppDispatch, useAppSelector } from '../App/hooks';
import { OrderGreenSVG } from '../assets';

const OrderPage = () => {
	const body = useAppSelector((state) => state.cart);
	const dispatch = useAppDispatch();

	useEffect(() => {
		document.title = 'Order | Baz Official Store';
		dispatch(clearCart());
		dispatch(clearShipping());
	}, []);

	useEffect(() => {
		dispatch(countCartTotal());
		dispatch(updateCartTotal());
	}, [body.cart]);

	return (
		<div className='flex flex-col'>
			<div>
				<div className='flex flex-col items-center py-[45px] justify-center border-b w-full border-black font-baz2 text-[20px] font-semibold tracking-[2px] tablet:text-[24px] tablet:tracking-[2.4px]'>
					Order Status
				</div>
			</div>
			<div className='p-[32px] tablet:py-[67px] w-full flex justify-center items-center'>
				<div className='flex gap-[48px] tablet:gap-[60px] flex-col items-center'>
					<div className='flex flex-col border-[2px] border-black items-center w-full tablet:w-3/5 laptop:w-8/12 aspect-[546/495]'>
						<div className='font-baz2 flex flex-col text-white bg-baz-black w-full items-center justify-center py-[24px]'>
							<div className='text-[12px] tracking-[1.2px] tablet:text-[24px] tracking:[2.4px] capitalize'>
								order
							</div>
							<div
								className={`
                   text-[#05E201] text-[16px] font-semibold tracking-[1.6px] tablet:text-[32px]  tablet:tracking-[3.2px] uppercase text-center`}
							>
								'Confirmed'
							</div>
						</div>

						<div className='flex flex-col py-[50px] gap-[48px] items-center'>
							<div className='w-1/3 flex'>
								<img
									src={OrderGreenSVG}
									alt='order successful'
									className='w-full object-contain'
								/>
							</div>
							<div className='flex flex-col font-baz2 tracking-[1.2px] tablet:tracking-[1.6px] text-[12px] tablet:text-[16px] items-center'>
								<div className='font-semibold capitalize text-center'>
									estimated delivery
								</div>
								<div className=''>7-10 working days</div>
							</div>
							<div className='flex flex-col font-baz2 tracking-[1.2px] tablet:tracking-[1.6px] text-[12px] tablet:text-[16px] items-center text-center'>
								check your mail to view order details
							</div>
						</div>
					</div>
					<div className='text-center font-baz2 text-[15px] tablet:text-[36px] tracking-[1.5px] tablet:tracking-[3.6px] uppercase'>
						IF YOU WANT To
						<span className='laptop:hidden'>
							<br />
						</span>{' '}
						TAKE OVER THE WORLD,
						<br /> FIRST THING YOU HAVE TO DO IS BUY BAZ.
					</div>
				</div>
			</div>
		</div>
	);
};

export default OrderPage;
