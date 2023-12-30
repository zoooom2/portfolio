import { ChangeEvent, useEffect, useState } from 'react';
import { changeSideMenuValue, getAggregateOrder } from '../../adminSlice';
import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import Hero from '../Layout/Hero';
import AdminTopProductBody from './AdminTopProductBody';
import { Error, Loading } from '../../../../global_components';

const AdminTopProducts = () => {
  const [period, setPeriod] = useState<
    'daily' | 'weekly' | 'monthly' | 'yearly'
  >('monthly');
  const { loading, aggregateOrder_error } = useAppSelector(
    (state) => state.admin
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeSideMenuValue('bestSeller'));
  }, []);

  useEffect(() => {
    dispatch(getAggregateOrder(period));
  }, [period]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly';
    setPeriod(value);
  };

  if (loading) {
    return <Loading />;
  }

  if (aggregateOrder_error) {
    return <Error />;
  }

  return (
    <div>
      <Hero
        title='Items Sold'
        description='View your items sold and the cummulative amount'
        periodChangeFn={handleChange}
        customPeriod={period}
        timeBased
      />
      <AdminTopProductBody />
    </div>
  );
};

export default AdminTopProducts;
