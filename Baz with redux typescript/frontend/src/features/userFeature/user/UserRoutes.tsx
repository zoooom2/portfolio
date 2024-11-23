import { Outlet } from 'react-router-dom';
import { setClicked } from '../userSlice';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../../App/hooks';
import { setAdminRoute } from '../../adminFeature/adminSlice';
import { Navbar, Sidebar } from '../../../global_components';
import { CartButtons } from '../../cartFeature/cart';
import { links } from '../../../utils/constants';

const UserRoutes = () => {
	const dispatch = useAppDispatch();
	const { clicked } = useAppSelector((state) => state.user);

	useEffect(() => {
		if (clicked) dispatch(setClicked(true));
		dispatch(setAdminRoute(false));
	}, []);

	return (
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
	);
};

export default UserRoutes;
