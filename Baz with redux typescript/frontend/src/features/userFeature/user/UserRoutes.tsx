import { Outlet } from 'react-router-dom';
import { fetchProfile, setClicked } from '../userSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';
import { setAdminRoute } from '../../adminFeature/adminSlice';
import { Loading, Navbar, Sidebar } from '../../../global_components';
import { CartButtons } from '../../cartFeature/cart';
import { links } from '../../../utils/constants';

const UserRoutes = () => {
	const dispatch = useAppDispatch();
	const { clicked } = useAppSelector((state) => state.user);
	const { isAuthenticated, loading } = useAppSelector((state) => state.user);
	useEffect(() => {
		if (clicked) dispatch(setClicked(true));
		dispatch(setAdminRoute(false));
	}, []);
	useEffect(() => {
		fetchProfile();
	}, []);

	return loading ? (
		<Loading />
	) : isAuthenticated ? (
		<>
			<Navbar
				buttons={<CartButtons />}
				admin={false}
			/>
			<Sidebar
				navLinks={links}
				footerButtons={<CartButtons />}
			/>
			<Outlet />
		</>
	) : (
		<>
			<div className='h-screen w-screen flex items-center justify-center gap-[24px] font-baz1 flex-col'>
				<div className='font-extrabold text-[48px] font-baz1'>SATURDAY</div>
				<div className='text-[32px] font-semibold'>8:00PM</div>
			</div>
		</>
	);
};

export default UserRoutes;
