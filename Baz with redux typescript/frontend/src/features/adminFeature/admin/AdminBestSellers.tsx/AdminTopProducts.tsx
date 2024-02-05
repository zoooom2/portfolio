import { ChangeEvent, useEffect } from 'react';
import {
  changeSideMenuValue,
  changeTimeRange,
  closeCustomCalendar,
  disableCustomPeriod,
  enableCustomPeriod,
  getAggregateOrder,
} from '../../adminSlice';
import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import Hero from '../Layout/Hero';
import AdminTopProductBody from './AdminTopProductBody';
import { Error } from '../../../../global_components';
import { SpinnerCircular } from 'spinners-react';
import CustomDatePicker from '../../../../global_components/CustomDatePicker';
import Modal from '../../../../global_components/Modal';

const AdminTopProducts = () => {
  const { period, showCustomCalendar, customDateEnd, customDateStart } =
    useAppSelector((state) => state.admin);
  const { loading, aggregateOrder_error } = useAppSelector(
    (state) => state.admin
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(changeSideMenuValue('bestSeller'));
  }, []);

  useEffect(() => {
    if (period !== 'custom') {
      dispatch(getAggregateOrder({ period }));
      dispatch(disableCustomPeriod());
    } else {
      dispatch(enableCustomPeriod());
    }
  }, [period]);

  useEffect(() => {
    if (!showCustomCalendar) {
      dispatch(
        getAggregateOrder({
          period: period,
          start: customDateStart,
          end: customDateEnd,
        })
      );
    }
  }, [showCustomCalendar]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as
      | 'daily'
      | 'weekly'
      | 'monthly'
      | 'yearly'
      | 'custom';
    dispatch(changeTimeRange(value));
  };

  if (loading) {
    return (
      <div className='w-full flex items-center justify-center h-[80vh]'>
        <SpinnerCircular secondaryColor={'#000'} color='white' size={200} />
      </div>
    );
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
      {showCustomCalendar && (
        <Modal
          content={<CustomDatePicker />}
          closeModal={() => {
            dispatch(closeCustomCalendar());
          }}
        />
      )}
      <AdminTopProductBody />
    </div>
  );
};

export default AdminTopProducts;
