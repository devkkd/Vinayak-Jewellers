import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BannerSlider = () => {
  const banners = [
    
    "/images/banner/1.jpg",
   "/images/banner/2.jpg",
    "/images/banner/3.jpg",
    "/images/banner/4.jpg",
 
  ];

  return (
    <div className="relative w-full overflow-hidden">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={0}
        centeredSlides
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{ clickable: true }}
        loop
        className="w-full"
      >
        {banners.map((src, i) => (
          <SwiperSlide key={i}>
            {/* Use a responsive wrapper */}
            <div className="relative w-full h-auto">
              <img
                src={src}
                alt={`banner-${i + 1}`}
                className="w-full h-auto max-h-[90vh] object-contain sm:object-cover"
                loading="lazy"
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default BannerSlider;
