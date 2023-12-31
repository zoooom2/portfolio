import { Link } from 'react-router-dom';

const TermsAndCondition = () => {
  return (
    <div className='font-baz1 p-[16px] text-justify tablet:p-[64px] flex flex-col gap-[20px] text-[14px]'>
      <h2 className='text-center text-[25px]'>Terms And conditions</h2>
      <h3 className='text-[21px]'>Introduction</h3>
      <p>
        Welcome to Baz studio. By accessing or using our services, you agree to
        be bound by these Terms and Conditions. If you have any questions or
        concerns, please contact us at bazonlineshop@gmail.com
      </p>
      <h3 className='text-[21px]'>Orders and payments:</h3>
      <ol
        style={{
          listStyleType: 'decimal',
          listStylePosition: 'inside',
          paddingLeft: 0,
        }}>
        <li>All orders are subject to acceptance and availability</li>
        <li>Prices listed in Naira are inclusive of applicable taxes</li>
        <li>Payment must be made in full before dispatch</li>
      </ol>
      <h3 className='text-[21px]'>Shipping and delivery</h3>
      <ol
        style={{
          listStyleType: 'decimal',
          listStylePosition: 'inside',
          paddingLeft: 0,
        }}>
        <li>
          Shipping costs are calculated at checkout and may vary based on the
          delivery location.
        </li>
        <li>
          Delivery times are estimates and may be subject to unforeseen delays.
        </li>
      </ol>
      <h3 className='text-[21px]'>Refund and exchanges:</h3>
      <p>
        Please review our separate Returns and Exchanges Policy for detailed
        information.
      </p>

      <h3 className='text-[21px]'>Product Information:</h3>
      <ol
        style={{
          listStyleType: 'decimal',
          listStylePosition: 'inside',
          paddingLeft: 0,
        }}>
        <li>
          We strive for accuracy in displaying product colours and details, but
          variations may occur.
        </li>
        <li>Detailed sizing information is provided for your reference.</li>
      </ol>
      <h3 className='text-[21px]'>Intellectual Property:</h3>
      <p>
        All content on our website, including images, logos, and text, is the
        intellectual property of Baz. Use without permission is prohibited.
      </p>
      <h3 className='text-[21px]'>Privacy Policy:</h3>
      <p>
        For information on how we collect, use, and protect your personal
        information, please refer to our{' '}
        <Link to={'/privacy'}>Privacy Policy</Link>.
      </p>
      <h3 className='text-[21px]'>Security:</h3>
      <p>
        We employ industry-standard security measures to ensure the
        confidentiality and integrity of your information, especially during
        transactions.
      </p>
      <h3 className='text-[21px]'>User Conduct:</h3>
      <p>
        To maintain a positive environment, please refrain from engaging in any
        activity that disrupts our services, website, or networks.
      </p>
      <h3 className='text-[21px]'>Governing Law:</h3>
      <p>
        These Terms and Conditions are governed by the laws of Nigeria. Any
        disputes will be subject to the exclusive jurisdiction of the courts in
        Nigeria
      </p>
      <h3 className='text-[21px]'>Modifications:</h3>
      <p>
        Baz reserves the right to update or modify these Terms and Conditions at
        any time. Changes will be effective immediately upon posting.
      </p>
      <h3 className='text-[21px]'>Dates and Versioning:</h3>
      <p>
        Last Updated: 29/12/23. We are committed to transparent versioning for
        your assurance.
      </p>
      <h3 className='text-[21px]'>Contact Information:</h3>
      <p>
        For inquiries or concerns regarding these Terms and Conditions, please
        contact us at Bazonlineshop@gmail.com
      </p>
      <h3 className='text-[21px]'>Agreement and Engagement:</h3>
      <p>
        By using our services, you acknowledge that you have read, understood,
        and agree to abide by these Terms and Conditions.
      </p>
      <p className='text-[21px] text-bold text-center'>
        Thank you for choosing Baz. We look forward to serving you.
      </p>
    </div>
  );
};

export default TermsAndCondition;
