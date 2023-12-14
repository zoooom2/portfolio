import styled from 'styled-components';
import {
  adminAnalytics,
  AdminAnalyticsType,
  priceFormat,
} from '../../../utils/constants';
import RecentOrderTable from './RecentOrderTable';
import BestSellerTable from './BestSellerTable';
import { useAppSelector } from '../../../App/hooks';
import Hero from './Layout/Hero';

const AdminOverview = () => {
  const { user } = useAppSelector((state) => state.user);
  const state = useAppSelector((state) => state.admin);

  const analytics = adminAnalytics.map((x: AdminAnalyticsType, i) => {
    const current_key = x.value.current;
    const percentage_key = x.percentage;

    return (
      <div
        className='aspect-[300/180] min-w-[300px] border border-[#a5a5a5] grid py-[32px] tablet:py-[41.5px] px-[21px]'
        key={i}>
        <div className='grid tablet:gap-[20.5px]'>
          <div className='flex gap-[18px]'>
            <div className='grid place-items-center border rounded-[50%] aspect-square w-[59px] border-[#7d7d7d]'>
              <img src={x.logo} alt='' />
            </div>
            <div className='flex flex-col gap-[4px]'>
              <div className='text-[#2b2b2b] font-baz1 text-[14px]'>
                {x.topic}
              </div>
              <div className='text-black font-baz1 text-[16px] tablet:text-[24px] font-medium'>
                {current_key === 'totalRevenue'
                  ? priceFormat(state[current_key])
                  : state[current_key]}
              </div>
            </div>
          </div>
          <div className='bottom'>
            <span>
              <span> {state[percentage_key]}%</span> {state.period} change (
              {current_key === 'totalRevenue'
                ? priceFormat(state[x.value.previous])
                : state[x.value.previous]}
              )
            </span>
          </div>
        </div>
      </div>
    );
  });

  return (
    <Wrapper className='flex-col'>
      <Hero
        title={`Welcome Back, ${user.firstname}`}
        description={'Stay up to date with your store current status'}
        timeBased={true}
      />
      <div className='py-5 gap-5 flex-col flex  '>
        <div className='flex overflow-x-auto gap-[16px] py-4'>{analytics}</div>
        <div className='grid gap-y-6 laptop:grid-cols-2 gap-x-3'>
          <div className='p-5 flex flex-col border border-black gap-9'>
            <div className='font-baz1 font-medium text-[22px]  tablet:text-[28px] leading-[42px]'>
              Recent Orders
            </div>
            <RecentOrderTable contentArray={state.recentOrders} />
          </div>
          <div className='lowerbox bestSellerBox  gap-9'>
            <div className='font-baz1 font-medium text-[22px]  tablet:text-[28px] leading-[42px] justify-self-start'>
              Best Sellers
            </div>
            <BestSellerTable contentArray={state.bestSeller} />
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .hero {
    display: flex;
    border-left: 1px solid #b6b6b6;
    justify-content: space-between;
    align-items: flex-start;
    padding: 0.5em;
    width: 100%;
    .welcome {
      font-family: 'Poppins';
      font-weight: 500;
      font-size: 32px;
      line-height: 48px;
    }
    .period {
      display: flex;
      height: 48px;
      align-items: center;
      gap: 5px;
      &:focus {
        border: 1px solid black;
      }
    }
  }
  label {
    font-size: 25px;
    display: flex;
  }
  select {
    border: none;
    font-family: 'Poppins';
    line-height: 30px;
    text-transform: capitalize;
    cursor: pointer;
    appearance: none;
    padding-left: 0.5em;
    background: transparent;
    &:focus {
      border: none;
      outline: none;
    }
    option {
      font-size: 13px;
      cursor: pointer;
    }
  }

  .analysis {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5em;
    justify-content: flex-start;
  }

  .top {
    display: flex;
    gap: 0.5em;
  }
  .logo {
    padding: 0.5em;
    border: 1px solid #7b7b7b;
    border-radius: 50%;
    margin-block: auto;
    font-size: 20px;
  }
  .detail {
    align-items: flex-start;
  }
  .detail-name {
    font-family: 'Poppins';
    font-size: 14px;
    line-height: 21px;
    color: #2b2b2b;
  }
  .detail-value {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 24px;
    line-height: 36px;
  }
  .bottom > span {
    font-family: 'Poppins';
    font-size: 12px;
    line-height: 18px;
  }
  h2 {
    font-family: 'Poppins';
    font-weight: 500;
    font-size: 28px;
    line-height: 42px;
  }

  .seller-table {
    border-collapse: separate;
    border-spacing: 1em 20px;
  }

  .lowerbox {
    border: 1px solid black;
    padding: 0.5em;
  }
  .status {
    width: 98px;
    padding: 10px;
    background: #e8fee8;
    border-radius: 19px;
    font-family: 'Poppins';
    font-size: 12px;
    line-height: 18px;
    /* identical to box height */
    text-align: right;
    color: #05e201;
  }
`;

export default AdminOverview;
