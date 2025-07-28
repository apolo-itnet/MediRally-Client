import React from 'react';
import BannerSlider from './Component/BannerSlider/BannerSlider';
import CampSection from './Component/Home/CampSection';
import FeedbackSection from './Component/Home/FeedbackSection';

const Home = () => (
  <>
    <section>
      <BannerSlider />
    </section>
    <section>
      <CampSection />
    </section>
    <section>
      <FeedbackSection/>
    </section>
  </>
);

export default Home;