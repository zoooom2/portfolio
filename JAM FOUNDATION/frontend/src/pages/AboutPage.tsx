import { AboutUsImg } from '../assets';
import { coreActivitiesData } from '../utils/constants';

const AboutPage = () => {
  const coreActivities = coreActivitiesData.map(
    ({ point, explanation }, index) => (
      <div
        key={index}
        className='font-satoshi text-[18px] leading-[28px] text-justify'>
        <span className='text-[#01248c] font-medium'>{point}</span>
        <span className='text-[rgba(1,36,140,0.5)]'>{explanation}</span>
      </div>
    )
  );
  return (
    <div className='mt-[80px] flex flex-col min-h-screen pt-[42px] pb-[147px] px-[62px] bg-[#fcfcfd] gap-[50px]'>
      <div className='text-[38px] font-satoshi text-[#01248c] font-medium leading-[44.5%] underline underline-offset-[8px]'>
        About Us
      </div>
      <div className='flex gap-[41px]'>
        <div className='w-3/5'>
          <img src={AboutUsImg} alt='' className='w-full' />
        </div>
        <div className='w-2/5 flex flex-col gap-[24px]'>
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
          <div className='flex flex-col gap-[10px] font-satoshi'>
            <div className='text-[#01248c] text-[24px] font-medium leading-[28px] self-stretch'>
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
      <div>
        <div className='flex flex-col gap-[22px]'>
          <div className='font-satoshi text-[#01248c] font-medium leading-[28px] text-[24px] self-stretch'>
            Core Activities
          </div>
          <div className='flex flex-col gap-[22px]'>{coreActivities}</div>
        </div>
      </div>
      <div className='text-[#01248c] font-satoshi text-[18px] leading-[28px]'>
        Join us in our journey as we strive to empower underserved communities,
        providing them with the essential foundation for a healthier, more
        sustainable, and equitable future.
      </div>
    </div>
  );
};

export default AboutPage;
