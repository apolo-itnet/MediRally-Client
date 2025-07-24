import React from 'react';
import BannerSlider from './Component/BannerSlider/BannerSlider';
import CampSection from './Component/Home/CampSection';

const Home = () => (
  <>
    <section>
      <BannerSlider />
    </section>
    <section>
      <CampSection />
    </section>
  </>
);

export default Home;