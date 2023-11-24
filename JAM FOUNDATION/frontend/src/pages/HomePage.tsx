import {
  GuidingLight,
  JoinMission,
  Latest,
  Quenching,
  Review,
  WhatWeDo,
} from '../components/home';

const HomePage = () => {
  return (
    <div className='min-h-screen'>
      <Quenching />
      <WhatWeDo />
      <Latest />
      <GuidingLight />
      <JoinMission />
      <Review />
    </div>
  );
};

export default HomePage;
