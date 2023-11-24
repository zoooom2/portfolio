import { BallBoy, TapWater } from '../../assets';

const GuidingLight = () => {
  return (
    <div className='pt-[42px] bg-[#01248c] gap-[42px] flex flex-col py-[201px]'>
      <div className='ml-[42px] text-white font-satoshi text-[38px] font-medium leading-[60px] tracking-[-0.76px] underline underline-offset-[14px] w-fit'>
        Guiding Light
      </div>
      <div className='flex gap-[15px] flex-col'>
        {/* <div className='relative'> */}
        <div className='flex gap-[12px] items-end mr-[85px] justify-end self-end w-4/5'>
          <div className='aspect-[410/458] min-w-[35%] flex z-[2]'>
            <img src={BallBoy} alt='' className='w-full h-full' />
          </div>
          <div className='grid grid-cols-2 gap-[12px]'>
            <div className='flex flex-col py-[24px] pl-[24px] rounded-[8px] border-white border h-[295px] bg-white text-[#01248c] gap-[12px]'>
              <div className='flex justify-between'>
                <div className='font-satoshi text-[30px] font-medium leading-[60px] tracking-[-0.6px] capitalize'>
                  vision
                </div>
                <div>icon</div>
              </div>
              <div className='text-[#01248c] font-satoshi text-[18px] font-medium leading-[35px] tracking-[-0.36px]'>
                "To Raise Models with high Morals through Human Capital, Talent
                and Community Development thereby creating a Network that
                enhances youth effectiveness in Nation Building."
              </div>
            </div>
            <div className='flex flex-col py-[24px] pl-[24px] rounded-[8px] border-white border h-[295px] bg-white text-[#01248c] gap-[12px]'>
              <div className='flex justify-between'>
                <div className='font-satoshi text-[30px] font-medium leading-[60px] tracking-[-0.6px] capitalize'>
                  Mission
                </div>
                <div>icon</div>
              </div>
              <div className='text-[#01248c] font-satoshi text-[18px] font-medium leading-[35px] tracking-[-0.36px]'>
                "To Gather the Lost, the Confused, and the Needy, Help them
                discover their purpose, Talent, and Challenges and equip them to
                achieve/solve it."
              </div>
            </div>
          </div>
          <div></div>
          {/* <div>
            <img src={TapWater} alt='' />
          </div> */}
        </div>
        {/* </div> */}

        <div className='flex gap-[15px] items-start ml-[63px] w-4/5'>
          <div className='aspect-[410/458] w-[50%] flex mt-[-15%] z-[1]'>
            <img src={TapWater} alt='' />
          </div>
          <div className='p-[24px] flex-col gap-[12px] bg-white rounded-[8px] flex'>
            <div className='flex justify-between'>
              <div className='font-satoshi text-[30px] font-medium leading-[60px] tracking-[-0.6px] capitalize'>
                Mission
              </div>
              <div>icon</div>
            </div>
            <ul className='text-[#01248c] font-satoshi text-[18px] font-medium leading-[35px] tracking-[-0.36px]'>
              <li>Sacrifice to serve Humanity Zero</li>
              <li>Tolerance for staff selfish interest</li>
              <li>
                Agendas Providing a Learning Culture for Talent Exploration and
                Self-Discipline
              </li>
              <li>
                Personal Excellence to discover personal gifts/Talents and to
                develop them to their full potential
              </li>
              <li>A Robust Program Sustainability Plan</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GuidingLight;
