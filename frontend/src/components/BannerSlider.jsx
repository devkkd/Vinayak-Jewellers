import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const BannerSlider = () => {
  // Desktop banners
  const desktopBanners = [
    "/images/banner/1.jpg",
    "/images/banner/2.jpg",
    // "/images/banner/3.jpg",  
    "/images/vinayak-jewellers.png",
    "/images/banner/4.jpg",
  ];

  // Mobile banners (you can add separate mobile images here)
  const mobileBanners = [
   "/images/banner/1.jpg",
    "/images/banner/2.jpg",
    "/images/banner/3.jpg",
    "/images/banner/4.jpg",
  ];

  return (
    <div className="relative w-full overflow-hidden">
      {/* Desktop Banner Slider */}
      <div className="hidden sm:block">
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
          {desktopBanners.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[450px] lg:h-[550px] xl:h-[600px]">
                <img
                  src={src}
                  alt={`desktop-banner-${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Mobile Banner Slider */}
      <div className="block sm:hidden">
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
          {mobileBanners.map((src, i) => (
            <SwiperSlide key={i}>
              <div className="relative w-full h-[300px] xs:h-[350px] sm:h-[400px]">
                <img
                  src={src}
                  alt={`mobile-banner-${i + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default BannerSlider;
