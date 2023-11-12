const BillingInfo = ({
  setStage,
}: {
  setStage: React.Dispatch<React.SetStateAction<number>>;
}) => {
  console.log(setStage);
  return (
    <div className='border w-full px-[35px]'>
      <div>
        <h3>Contact Information</h3>
        <div>
          <input type='text' placeholder='Firstname' />
          <input type='text' placeholder='Lastname' />
          <input type='text' placeholder='Email Address' />
          <input type='text' />
        </div>
      </div>
      <div>shipping address</div>
    </div>
  );
};

export default BillingInfo;
