import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/scrollbar";

export default () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={20}
      slidesPerView={5}
      navigation
      pagination={{ clickable: true }}
      scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      autoplay={{
        delay: 4000,
        disableOnInteraction: false,
      }}
      speed={2000}
    >
      <SwiperSlide>
        <img
          src="public/clients/RTL.png"
          style={{ width: "30%", height: "auto" }}
          alt="Slide 1"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="public/clients/RBS_logo.svg"
          style={{ width: "50%", height: "auto" }}
          alt="Slide 2"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="public/clients/bnp-paribas-2.svg"
          style={{ width: "400%", height: "auto" }}
          alt="Slide 3"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="public/clients/sky-4.svg"
          style={{ width: "25%", height: "auto" }}
          alt="Slide 4"
        />
      </SwiperSlide>

      <SwiperSlide>
        <img
          src="public/clients/hsbc-3.svg"
          style={{ width: "50%", height: "auto" }}
          alt="Slide 5"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="public/clients/nxp-semiconductors-logo.svg"
          style={{ width: "50%", height: "auto" }}
          alt="Slide 6"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="public/clients/cigna-3.svg"
          style={{ width: "50%", height: "auto" }}
          alt="Slide 7"
        />
      </SwiperSlide>
      <SwiperSlide>
        <img
          src="public/clients/intel.svg"
          style={{ width: "50%", height: "auto" }}
          alt="Slide 8"
        />
      </SwiperSlide>
    </Swiper>
  );
};
