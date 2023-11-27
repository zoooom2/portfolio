const JoinMission = () => {
  return (
    <div className='pb-[18px] flex justify-center w-full mt-[-120px] bg-transparent -z-10'>
      <div
        className='w-8/12 max-tablet:w-9/12 py-[25px] flex flex-col gap-[34px] justify-start bg-[#F9FAFB] px-[12px] laptop:px-[32px] z-[3]'
        style={{ boxShadow: '0px 6px 6px 0px rgba(0, 0, 0, 0.25)' }}>
        <div className='flex justify-center text-[#01248c] text-[24px] laptop:text-[38px] leading-[44.5px] underline underline-offset-8 text-center'>
          Join us in Our Mission
        </div>
        <div className='flex flex-col gap-[24px] items-center'>
          <div className='text-center text-[#01248c] font-satoshi laptop:text-[18px] tablet:text-[16px] text-[14px] leading-[26px]'>
            We invite you to join us on this journey to make the world a better
            place. Together, we can create a future where every person has
            access to clean water, where sanitation is a right, not a privilege,
            and where hygiene education is a norm, not an exception. Thank you
            for considering JAM Foundation as your partner in making a
            difference. We look forward to working together to bring lasting
            change to communities in need.
          </div>
          <button className='bg-[rgba(1,36,140,0.20)] rounded-none font-inter text-[14px] font-semibold leading-[20px] text-[#01248c]'>
            Partner with us
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinMission;
