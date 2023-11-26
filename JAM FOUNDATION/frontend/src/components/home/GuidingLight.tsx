import { BallBoy, TapWater } from '../../assets';
import { coreValues } from '../../utils/constants';

const GuidingLight = () => {
  const coreValuesList = coreValues.map((value, index) => (
    <li key={index}>{value}</li>
  ));

  const SmallScreenCard = ({
    title,
    description,
    icon = 'icon',
  }: Record<string, string>) => {
    return (
      <div className='flex flex-col gap-[12px] bg-[#022aa1] tablet:bg-[#01248c] z-[2] p-[18px]'>
        <div className='flex justify-between'>
          <div className='font-satoshi text-white text-[20px] font-medium leading-[20px] tracking-[-0.4px]'>
            {title}
          </div>
          <div>{icon}</div>
        </div>
        <div className='font-satoshi text-white text-[16px] leading-[24px] tracking-[-0.32px]'>
          {description}
        </div>
      </div>
    );
  };

  const LargeScreenCard = ({
    title,
    description,
    icon = 'icon',
  }: Record<string, string>) => {
    return (
      <div className='flex flex-col py-[24px] p-[24px] rounded-[8px] border-white border h-full bg-white text-[#01248c] gap-[12px]'>
        <div className='flex justify-between'>
          <div className='font-satoshi text-[30px] font-medium leading-[60px] tracking-[-0.6px] capitalize'>
            {title}
          </div>
          <div>{icon}</div>
        </div>
        <div className='text-[#01248c] font-satoshi text-[18px] font-medium leading-[35px] tracking-[-0.36px] text-justify'>
          {description}
        </div>
      </div>
    );
  };

  return (
    <>
      <div className='pt-[42px] bg-[#01248c] gap-[42px] flex flex-col py-[201px] max-desktop:hidden'>
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
              {LargeScreenCard({
                title: 'vision',
                description:
                  'To Raise Models with high Morals through Human Capital, Talent and Community Development thereby creating a Network that enhances youth effectiveness in Nation Building.',
              })}
              {LargeScreenCard({
                title: 'Mission',
                description:
                  'To Gather the Lost, the Confused, and the Needy, Help them discover their purpose, Talent, and Challenges and equip them to achieve/solve it.',
              })}
            </div>
            {/* <div></div> */}
            {/* <div>
            <img src={TapWater} alt='' />
          </div> */}
          </div>
          {/* </div> */}

          <div className='flex gap-[15px] items-start ml-[63px] w-4/5'>
            <div className='aspect-[410/458] w-[50%] flex mt-[-15%] z-[1] max-w-[410px]'>
              <img src={TapWater} alt='' />
            </div>
            <div className='p-[24px] flex-col gap-[12px] bg-white rounded-[8px] flex'>
              <div className='flex justify-between'>
                <div className='font-satoshi text-[30px] font-medium leading-[60px] tracking-[-0.6px] capitalize'>
                  Core Values
                </div>
                <div>icon</div>
              </div>
              <ul className='text-[#01248c] font-satoshi text-[18px] font-medium leading-[35px] tracking-[-0.36px]'>
                {coreValuesList}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className='relative flex flex-col gap-[30px] max-tablet:bg-[#01248c] tablet:bg-[#01248ccc]'>
        <div className='tablet:hidden text-white font-satoshi text-[24px] font-medium leading-[60px] tracking-[-0.48px] pt-[12px] px-[12px] underline underline-offset-[14px] w-fit'>
          Guiding Light
        </div>
        <div className='tablet:absolute w-screen h-full'>
          <img
            src={BallBoy}
            alt=''
            className='w-full tablet:opacity-[50%] h-full tablet:object-cover tablet:object-top'
          />
        </div>
        <div className='px-[12px] tablet:px-[85px] tablet:pt-[42px] pb-[201px] flex flex-col gap-[16px] tablet:gap-[30px] desktop:hidden'>
          <div className='grid tablet:grid-cols-2 gap-[16px] tablet:gap-[20px]'>
            {SmallScreenCard({
              title: 'Vision',
              description:
                'To Raise Models with high Morals through Human Capital,Talent and Community Development thereby creating a Network that enhances youth effectiveness in Nation Building.',
              icon: 'icon',
            })}{' '}
            {SmallScreenCard({
              title: 'Mission',
              description:
                'To Gather the Lost, the Confused, and the Needy, Help them discover their purpose, Talent, and Challenges and equip them to achieve/solve it.',
              icon: 'icon',
            })}
          </div>
          <div className='flex flex-col gap-[12px] bg-[#022aa1] tablet:bg-[#01248c] z-[2] p-[18px]'>
            <div className='flex justify-between'>
              <div className='font-satoshi text-white text-[20px] font-medium leading-[20px] tracking-[-0.4px]'>
                Core Values
              </div>
              <div>icon</div>
            </div>
            <div className='font-satoshi text-white text-[16px] leading-[24px] tracking-[-0.32px] px-[18px]'>
              <ul className='list-disc'>{coreValuesList}</ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default GuidingLight;
