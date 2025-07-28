// BannerSlider.jsx
import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { slideUp } from "../../../Utility/animation";
import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";
import SecondaryBtn from "../../../Shared/Button/SecondaryBtn";

const slides = [
  {
    id: 1,
    title: "Transforming Lives Through Medical Camps",
    subtitle: "Impact Story: Rajshahi 2023",
    desc: "Over 500 patients received essential checkups, free medicines, and surgeries. A mother's tears of relief inspired us to do more.",
    img: "https://i.postimg.cc/hGj9WvM5/1.jpg",
  },
  {
    id: 2,
    title: "Restoring Sight, Renewing Hope",
    subtitle: "Eye Camp Success, 2022",
    desc: '80+ successful cataract surgeries brought smiles to elder faces. One patient said, "I saw my grandchild clearly for the first time!"',
    img: "https://i.postimg.cc/xd4L0Q4T/2.jpg",
  },
  {
    id: 3,
    title: "Healing Beyond Medicine",
    subtitle: "Rural Outreach, 2021",
    desc: "Beyond physical health, we focused on mental health awareness. Over 300 women educated in one-on-one sessions.",
    img: "https://i.postimg.cc/4yzcb9Nm/3.jpg",
  },
  {
    id: 4,
    title: "Hope in Hard Times",
    subtitle: "Flood Relief Camp, 2020",
    desc: "Despite limited access, volunteers traveled by boat to distribute hygiene kits and treat water-borne diseases.",
    img: "https://i.postimg.cc/cHtwCzp7/4.jpg",
  },
  {
    id: 5,
    title: "Youth-Led Camp Movement",
    subtitle: "Student Initiative, 2019",
    desc: "University students ran a full-day camp serving 200+ people. The youngest organizer was only 18 years old!",
    img: "https://i.postimg.cc/kGr8bcC0/5.jpg",
  },
];

const BannerSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section className="relative h-[calc(100vh-80px)] w-full overflow-hidden">
      <Swiper
        modules={[EffectFade, Navigation, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        speed={2500}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="w-full h-full"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide.id}>
            <div
              className="h-full w-full bg-cover bg-center relative backdrop-blur-xs"
              style={{ backgroundImage: `url(${slide.img})` }}
            >
              <div className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"></div>
              <div className="relative z-10 h-full flex items-center justify-center px-6 md:px-16">
                <AnimatePresence mode="wait">
                  {activeIndex === i && (
                    <motion.div
                      key={slide.id}
                      {...slideUp(0.5)}
                      className="text-white max-w-6xl text-center lexend"
                    >
                      <h1 className="text-3xl md:text-7xl font-bold mb-4 leading-tight uppercase">
                        {slide.title}
                      </h1>
                      <h3 className="text-xl md:text-4xl text-pink-700 my-3 font-bold">
                        {slide.subtitle}
                      </h3>
                      <p className="text-sm md:text-lg mb-6 max-w-xl mx-auto">
                        {slide.desc}
                      </p>
                      <SecondaryBtn
                        label="Learn More"
                        icon={ArrowRight}
                        iconProps={{ size: 18 }}
                        type="button"
                        className="justify-center items-center inline-flex"
                      ></SecondaryBtn>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default BannerSlider;
