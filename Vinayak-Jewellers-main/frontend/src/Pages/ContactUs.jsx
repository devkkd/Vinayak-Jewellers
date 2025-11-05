import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Contact = () => {
  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    cssEase: "linear",
    arrows: false,
    pauseOnHover: false,
    variableWidth: true,
  };

  const images = [
    "/images/store1.png",
    "/images/store2.png",
    "/images/store3.png",
    "/images/store4.png",
  ];

  return (
    <div className="bg-[#fff4DC] text-[#0E0100]">
      {/* CONTACT SECTION */}
      <section className="bg-[#FFF7E0] py-16 md:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12">
          {/* Title */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl lg:text-[60px] leading-snug md:leading-[160%] font-[700] font-cinzel cinzelfont text-[#0E0100] mb-3">
              CONTACT VINAYAK JEWELLERS
            </h1>
            <p className="text-[#0E0100] max-w-2xl mx-auto capitalize font-sans font-light leading-relaxed tracking-wide text-base md:text-xl">
              We’re here to help you find the perfect jewelry for every precious
              moment. Get in touch with our expert team today!
            </p>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE */}
            <div className="flex  flex-col items-center sm:flex sm:flex-col sm:items-center md:items-start space-y-6 md:pr-18 md:border-r border-[#0E0100]">
              <h3 className=" text-2xl md:text-3xl font-[600] text-[#0E0100] mb-5 font-cinzel cinzelfont tracking-wider">
                GET IN TOUCH
              </h3>

              {/* Visit */}
              <div className="bg-[#FFEAC5] p-5 flex items-start gap-4 shadow-sm w-full max-w-md md:max-w-none rounded-2xl">
                <div
                  className="w-[45px] h-[45px] flex items-center justify-center rounded-full mt-1"
                  style={{
                    background:
                      "radial-gradient(circle at center, #140100, #5C1D02)",
                  }}
                >
                  <i className="fa-solid fa-location-dot text-[#fff4DC] text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0E0100] text-lg">
                    Visit Our Showroom
                  </h4>
                  <p className="text-[#201e1d] text-sm md:text-md leading-relaxed tracking-wide">
                    G-46, Unnati Tower, Sector 2, Central Spine, Vidhyadhar
                    Nagar, Jaipur, Rajasthan, India
                  </p>
                </div>
              </div>

              {/* Call */}
              <div className="bg-[#FFEAC5] p-5 flex items-start gap-4 w-full max-w-md md:max-w-none shadow-sm rounded-2xl">
                <div
                  className="w-[45px] h-[45px] flex items-center justify-center rounded-full mt-1"
                  style={{
                    background:
                      "radial-gradient(circle at center, #140100, #5C1D02)",
                  }}
                >
                  <i className="fa-solid fa-phone-volume text-[#fff4DC] text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0E0100] text-lg">
                    Call Us
                  </h4>
                  <p className="text-[#201e1d] text-md leading-relaxed">
                    +91 94141 56451
                  </p>
                  <p className="text-[#201e1d] text-sm md:text-md leading-relaxed tracking-wide capitalize">
                    Speak directly with our jewelry experts
                  </p>
                </div>
              </div>

              {/* WhatsApp */}
              <div className="bg-[#FFEAC5] p-5 flex items-start gap-4 w-full max-w-md md:max-w-none shadow-sm rounded-2xl">
                <div
                  className="w-[45px] h-[45px] flex items-center justify-center rounded-full mt-1"
                  style={{
                    background:
                      "radial-gradient(circle at center, #140100, #5C1D02)",
                  }}
                >
                  <i className="fa-brands fa-whatsapp text-[#fff4DC] text-xl"></i>
                </div>
                <div>
                  <h4 className="font-semibold text-[#0E0100] text-lg">
                    WhatsApp Chat
                  </h4>
                  <p className="text-[#201e1d] text-md leading-relaxed tracking-wide">
                    +91 94141 56451
                  </p>
                  <p className="text-[#201e1d] text-sm md:text-md leading-relaxed tracking-wide capitalize">
                    Quick responses & instant assistance
                  </p>
                </div>
              </div>
            </div>

            {/* RIGHT SIDE */}
            <div className="pl-0 md:pl-8">
              <h3 className="text-2xl md:text-3xl font-[600] text-[#0E0100] mb-5 font-cinzel cinzelfont tracking-wider">
                SEARCHING FOR ALL <br />
                JEWELLERY?
              </h3>
              <p className="text-[#0E0100] mb-6 leading-relaxed capitalize mainfont font-normal text-base md:text-lg">
                Our specialists are here to help you select
                <br />
                The Perfect Piece!
                <br />
                Our expert will get in touch with you shortly!
              </p>

              <form className="space-y-4">
                <div>
                  <label className="text-[#363333] text-base font-normal mt-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    placeholder="Enter Your Name"
                    className="flex-1 border border-[#C9A66B] bg-white rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#C69C6D] mt-2 lg:w-[470px]"
                  />
                </div>

                <div>
                  <label className="text-[#363333] text-base font-normal mt-2 block">
                    Mobile/WhatsApp Number
                  </label>
                  <div className="flex flex-wrap md:flex-nowrap gap-4 items-center mt-2">
                    <input
                      type="text"
                      placeholder="Enter Your Mobile/WhatsApp Number"
                      className="flex-1 border border-[#C9A66B] bg-white rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                    />
                    <img
                      src="/images/logoContact.png"
                      alt=""
                      className="w-[45px] h-[45px] bg-[#FFEAC5] rounded-full p-1"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full md:w-auto text-white px-10 md:px-14 py-3 rounded-full hover:bg-[#2F1208] transition-all duration-200 cursor-pointer mt-4"
                  style={{
                    background:
                      "radial-gradient(circle at center, #140100, #5C1D02)",
                  }}
                >
                  Send →
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Divider (shorter lines near diamond) */}
      {/* <div className="flex items-center justify-center mt-10">
        <div className="w-[60px] sm:w-[80px] md:w-[300px] h-[1px] bg-gradient-to-r from-[#5C1D02] to-[#A65C3C]" />
        <div className="mx-3 sm:mx-4">
          <img
            src="/images/diamondContactPage.png"
            alt="Diamond"
            className="w-5 h-5 md:w-6 md:h-6 object-contain"
          />
        </div>
        <div className="w-[60px] sm:w-[80px] md:w-[300px] h-[1px] bg-gradient-to-r from-[#5C1D02] to-[#A65C3C]" />
      </div> */}

      {/* VISIT OUR STORE SECTION */}
      {/* <section className="bg-[#fff4DC] pt-12 pb-20 overflow-hidden">
        <div className="text-center mb-10 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-[500] mb-5 cinzelfont font-cinzel text-[#0E0100] tracking-wider">
            VISIT OUR STORE
          </h2>
          <p className="text-[#0E0100] max-w-2xl mx-auto capitalize font-sans font-light flex justify-center text-base md:text-xl leading-relaxed lg:whitespace-nowrap">
            Explore an exclusive range of lab grown diamond jewellery, crafted
            with brilliance and care.
          </p>
        </div>

        <div className="w-full">
          <Slider {...sliderSettings}>
            {images.map((img, i) => (
              <div
                key={i}
                className="px-2 md:px-3 w-[280px] sm:w-[500px] md:w-[650px] lg:w-[900px] flex justify-center"
              >
                <img
                  src={img}
                  alt={`Store ${i + 1}`}
                  className="rounded-3xl shadow-lg h-[200px] sm:h-[260px] md:h-[320px] lg:h-[380px] w-full object-cover"
                />
              </div>
            ))}
          </Slider>
        </div>
      </section> */}
    </div>
  );
};

export default Contact;
