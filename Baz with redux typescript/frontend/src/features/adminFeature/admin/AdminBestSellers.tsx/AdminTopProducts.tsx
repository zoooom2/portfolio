import { ChangeEvent, useEffect, useState } from 'react';
import { getAggregateOrder } from '../../adminSlice';
import { useAppDispatch } from '../../../../App/hooks';
import Hero from '../Layout/Hero';
import AdminTopProductBody from './AdminTopProductBody';

const AdminTopProducts = () => {
  const [period, setPeriod] = useState<
    'daily' | 'weekly' | 'monthly' | 'yearly'
  >('monthly');
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getAggregateOrder(period));
  }, [period]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as 'daily' | 'weekly' | 'monthly' | 'yearly';
    setPeriod(value);
  };

  return (
    <div>
      <Hero
        title='Items Sold'
        description='View your items sold and the cummulative amount'
        periodChangeFn={handleChange}
        timeBased
      />
      <AdminTopProductBody />
    </div>
  );
};

export default AdminTopProducts;
