const Privacy = () => {
  return (
    <div className='font-baz1 p-[16px] text-justify tablet:p-[64px] flex flex-col gap-[20px] text-[14px]'>
      <h2 className='text-center text-[25px]'>Privacy</h2>
      <h3 className='text-[21px]'>Introduction</h3>
      <p>
        Welcome to Baz studio. This Privacy Policy outlines how we collect, use,
        and protect your personal information. By using our services, you agree
        to the terms outlined in this policy.
      </p>
      <h3 className='text-[21px]'>Information We Collect:</h3>
      <ol
        style={{
          listStyleType: 'decimal',
          listStylePosition: 'inside',
          paddingLeft: 0,
        }}>
        <li>
          Personal Information: We may collect your name, contact details,
          shipping address, and payment information when you place an order.
        </li>
        <li>
          Website Usage: We gather data on how you interact with our website,
          including pages visited and products viewed.
        </li>
      </ol>
      <h3 className='text-[21px]'>How We Use Your Information:</h3>
      <ol
        style={{
          listStyleType: 'decimal',
          listStylePosition: 'inside',
          paddingLeft: 0,
        }}>
        <li>
          Order Fulfilment: We use your information to process and fulfil your
          orders, including shipping and payment processing.
        </li>
        <li>
          Website Improvement: Analysing website usage helps us enhance user
          experience and optimize our online platform.
        </li>
      </ol>
      <h3 className='text-[21px]'>Sharing Your Information:</h3>
      <ol
        style={{
          listStyleType: 'decimal',
          listStylePosition: 'inside',
          paddingLeft: 0,
        }}>
        <li>
          Third-Party Services: We may share necessary information with trusted
          third-party services for order processing, shipping, and payment
          handling.
        </li>
        <li>
          Legal Compliance: We may disclose information when required to comply
          with legal obligations.
        </li>
      </ol>
      <h3 className='text-[21px]'>Security Measures:</h3>
      <p>
        We implement industry-standard security measures to safeguard your
        information during transmission and storage.
      </p>
      <h3 className='text-[21px]'>Changes to the Privacy Policy:</h3>
      <p>
        We reserve the right to update this Privacy Policy. Changes will be
        posted on our website, and the effective date will be indicated.
      </p>
      <h3 className='text-[21px]'>Contact Information:</h3>
      <p>
        For any inquiries or concerns regarding your privacy, please contact us
        at Bazonlineshop@gmail.com.
      </p>
      <h3 className='text-[21px]'>Consent:</h3>
      <p>
        By using our services, you consent to the terms outlined in this Privacy
        Policy.
      </p>
      <p className='text-[18px] text-bold'>
        Thank you for trusting Baz. We are committed to protecting your privacy
        and providing a secure and enjoyable shopping experience.
      </p>
    </div>
  );
};

export default Privacy;
