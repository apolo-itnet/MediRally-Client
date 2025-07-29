import React from 'react';
import BannerSlider from './Component/BannerSlider/BannerSlider';
import CampSection from './Component/Home/CampSection';
import FeedbackSection from './Component/Home/FeedbackSection';
import RecentCampSpecialists from './Component/Home/RecentCampSpecialists';
import Newsletter from './Component/Home/Newsletter';

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
    <section>
      <RecentCampSpecialists/>
    </section>
    <section>
      <Newsletter/>
    </section>
  </>
);

export default Home;