import React, { useState } from "react";
import emailjs from "@emailjs/browser";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", phone: "" });
  const [isSending, setIsSending] = useState(false);
  const [phoneError, setPhoneError] = useState(""); // ✅ real-time validation message

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Allow only digits and optional "+"
  const handlePhoneChange = (e) => {
    let value = e.target.value;

    // Allow only digits and one optional leading "+"
    if (/^[+]?\d*$/.test(value)) {
      if (value.length <= 13) {
        setFormData({ ...formData, phone: value });
        setPhoneError("");
      }
    } else {
      setPhoneError("Please enter only numbers (with optional +country code).");
    }
  };

  // ✅ Form Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate phone number
    if (!/^[+]?\d{10,13}$/.test(formData.phone)) {
      setPhoneError("Please enter a valid phone number (10–13 digits).");
      return;
    }

    setIsSending(true);
    try {
      await emailjs.send(
        "service_fmzp73s", // 🔧 your EmailJS service ID
        "template_0nhj3sp", // 🔧 your template ID
        {
          name: formData.name,
          phone: formData.phone,
          to_email: "vinayakjewellersjaipur12@gmail.com", // 🔧 destination email
        },
        "HW_6DYxtpYO4wBKfm" // 🔧 your public key
      );

      alert("✨ Thank you for reaching out to Vinayak Jewellers! We’ll contact you shortly.");
      setFormData({ name: "", phone: "" });
    } catch (error) {
      console.error("Email send failed:", error);
      alert("❌ Failed to send message. Please try again later.");
    }
    setIsSending(false);
  };

  // ✅ Optional store slider config
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

          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* LEFT SIDE */}
            <div className="flex flex-col items-center md:items-start space-y-6 md:pr-18 md:border-r border-[#0E0100]">
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

            {/* RIGHT SIDE FORM */}
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

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[#363333] text-base font-normal mt-2 block">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
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
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handlePhoneChange}
                      required
                      placeholder="Enter Your Mobile/WhatsApp Number"
                      pattern="^[+]?[0-9]{10,13}$"
                      title="Please enter a valid phone number (10–13 digits)."
                      className="flex-1 border border-[#C9A66B] bg-white rounded-full px-5 py-2 focus:outline-none focus:ring-2 focus:ring-[#C69C6D]"
                    />
                    <img
                      src="/images/logoContact.png"
                      alt=""
                      className="w-[45px] h-[45px] bg-[#FFEAC5] rounded-full p-1"
                    />
                  </div>
                  {phoneError && (
                    <p className="text-red-600 text-sm mt-1">{phoneError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSending}
                  className={`w-full md:w-auto text-white px-10 md:px-14 py-3 rounded-full transition-all duration-200 cursor-pointer mt-4 ${
                    isSending
                      ? "opacity-70 cursor-not-allowed"
                      : "hover:scale-[1.05]"
                  }`}
                  style={{
                    background:
                      "radial-gradient(circle at center, #140100, #5C1D02)",
                  }}
                >
                  {isSending ? "Sending..." : "Send →"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
