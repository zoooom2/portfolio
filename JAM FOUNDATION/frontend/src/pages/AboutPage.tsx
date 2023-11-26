import { AboutUsImg } from '../assets';
import { aboutBody } from '../utils/constants';

const AboutPage = () => {
  const body = aboutBody.map(({ header, body: bodyData }, index) => {
    const templateBody = bodyData.map(({ point, explanation }, index) => (
      <div
        key={index}
        className='font-satoshi text-[18px] leading-[28px] text-justify'>
        <span className='text-[#01248c] font-medium capitalize'>{point}</span>
        <span className='text-[rgba(1,36,140,0.5)]'>{explanation}</span>
      </div>
    ));
    return (
      // <div key={index} className='flex flex-col gap-[22px]'>
      <div key={index} className='flex flex-col gap-[22px]'>
        <div className='font-satoshi text-[#01248c] font-medium leading-[28px] text-[24px] self-stretch uppercase'>
          {header}
        </div>
        <div className='flex flex-col gap-[16px]'>{templateBody}</div>
      </div>

      // </div>
    );
  });
  return (
    <div className='mt-[80px] flex flex-col min-h-screen pt-[42px] pb-[147px] px-[62px] bg-[#fcfcfd] gap-[50px]'>
      <div className='text-[38px] font-satoshi text-[#01248c] font-medium leading-[44.5%] underline underline-offset-[8px]'>
        About Us
      </div>
      <div className='flex max-laptop:flex-col gap-[41px]'>
        <div className='w-3/5 max-laptop:w-full'>
          <img src={AboutUsImg} alt='' className='w-full' />
        </div>
        <div className='w-2/5 flex flex-col gap-[24px] max-laptop:w-full'>
          <div className='text-[rgba(1,36,140,0.5)] font-satoshi text-[18px] leading-[28px] text-justify'>
            Welcome to the Jonathan Akwashiki Memorial Foundation (JAM
            Foundation), a dynamic and socially conscious non-profit
            organization dedicated to making a positive impact on underserved
            communities through secure and sustainable water, sanitation, and
            hygiene (WASH) solutions. Grounded in a strong commitment to social
            justice, we employ a Gender Equality and Social Inclusion (GESI)
            approach that recognizes and addresses the unequal power relations
            and disparities experienced by individuals due to their social
            identities, including gender, location, (dis)ability, wealth,
            education, age, caste/ethnicity, race, and sexuality.
          </div>
          <div className='flex flex-col gap-[22px] font-satoshi'>
            <div className='text-[#01248c] text-[24px] font-medium leading-[28px] self-stretch uppercase'>
              Mission
            </div>
            <div className='self-stretch text-[rgba(1,36,140,0.5)] text-[18px] leading-[28px] text-justify'>
              At JAM Foundation, our mission is rooted in the belief that
              everyone deserves access to safe and sustainable WASH solutions.
              We are driven by an unwavering commitment to improving the quality
              of life for individuals and families, particularly in regions
              facing WASH challenges
            </div>
          </div>
        </div>
      </div>
      {/* <div> */}
      <div className='flex flex-col gap-[48px]'>
        {/* <div className='font-satoshi text-[#01248c] font-medium leading-[28px] text-[24px] self-stretch'>
          Core Activities
        </div>
        <div className='flex flex-col gap-[22px]'>{body}</div> */}
        {body}
      </div>
      {/* </div> */}
      <div className='text-[#01248c] font-satoshi text-[18px] leading-[28px] italic'>
        At JAM Foundation, we are dedicated to serving humanity, empowering the
        youth, and providing support to widows. We believe in the potential for
        positive change, and we invite you to join us on this mission of making
        the world a better place.
      </div>
    </div>
  );
};

export default AboutPage;
