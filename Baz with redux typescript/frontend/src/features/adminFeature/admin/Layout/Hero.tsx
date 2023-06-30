import { ChangeEvent, useCallback } from 'react';
import { MdKeyboardArrowDown } from 'react-icons/md';
import { useAppDispatch, useAppSelector } from '../../../../App/hooks';
import { HeroProps } from '../../../../types';
import { periodOption } from '../../../../utils/constants';
import { changeTimeRange } from '../../adminSlice';

const Hero = ({
  title,
  subtitle,
  description,
  timeBased,
  button,
  buttonType,
}: HeroProps) => {
  const { period } = useAppSelector((state) => state.admin);
  const dispatch = useAppDispatch();
  const changePeriod = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    dispatch(changeTimeRange(value));
  }, []);

  const options = periodOption.map((option, i) => (
    <option className='text-xs cursor-pointer' key={i} value={option.value}>
      {option.name}
    </option>
  ));

  const buttons = button?.map((x, index) => (
    <button
      key={index}
      onClick={x.action}
      {...(buttonType && { type: 'button' })}
      className={`max-lg:p-3 max-lg:text-sm flex items-center font-baz1 text-xl gap-5 px-6 py-4 ${
        index === 0
          ? 'bg-black text-white hover:bg-white hover:border border-black hover:text-black'
          : 'bg-white text-black border border-black hover:bg-black hover:border-none hover:text-white'
      }`}>
      {x.icon({})} {x.name}
    </button>
  ));

  return (
    <div className='max-md:flex-col max-md:items-start max-md:gap-4 flex justify-between items-center px-10 py-5 w-full border-b  border-solid border-[#b6b6b6]'>
      <div>
        <div className='font-baz1 font-medium min-[900px]:text-adminHero text-2xl '>
          <span className='capitalize'>{`${title} `}</span>
          <span className='text-gray-400'>{subtitle && `/ ${subtitle}`}</span>
        </div>
        <div className='font-baz1 font-normal text-xs text-[#2a2a2a]'>
          {description}
        </div>
      </div>
      <div className='flex gap-7'>
        {timeBased ? (
          <div className='flex items-center h-12 gap-1 focus:border focus:border-solid focus:border-black'>
            <select
              className='border-none font-baz1 text-adminSelect capitalize cursor-pointer appearance-none pl-2 focus:border-none focus:outline-none'
              name='period'
              id='period'
              value={period}
              onChange={changePeriod}>
              {options}
            </select>
            <label className='flex text-2xl items-center' htmlFor='period'>
              <MdKeyboardArrowDown />
            </label>
          </div>
        ) : (
          buttons
        )}
      </div>
    </div>
  );
};

export default Hero;
