// // src/components/Footer.jsx
import {
  FaInstagram,
  FaFacebook,
  FaYoutube,
  FaPinterest,
} from "react-icons/fa";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Footer = () => {
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
    "/images/shop.jpeg",
    "/images/store1.png",
     "/images/store3.png",
     "/images/banner/2.jpg",
     "/images/vinayak-jewellers.png",
    // "/images/store2.png",
   
    // "/images/store4.png",
  ];

  return (
    <>
      {/* 🏬 Store Section */}
      <section className="bg-[#FFF9E6] pb-20 overflow-hidden">
        {/* Divider */}
      <div className="relative mb-4 flex items-center justify-center mt-10   sm:mt-8">
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
        <img
          src="/images/logoContact.png"
          alt="Vinayak Logo Divider"
          className="mx-4 w-10 h-10 object-contain"
        />
        <div className="w-[250px] h-[1px] bg-gradient-to-r from-[#140100] via-[#5C1D02] to-[#140100]" />
      </div>

        {/* Title */}
        <div className="text-center mb-6 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-[500] mb-5 cinzelfont text-[#0E0100] tracking-wider">
            VISIT OUR STORE
          </h2>
          <p className="text-[#0E0100] max-w-2xl mx-auto capitalize font-sans font-light flex justify-center text-base md:text-xl leading-relaxed lg:whitespace-nowrap">
            Visit us at Vidyadhar Nagar, Jaipur — and experience our collection of gold, diamond & silver jewellery in person.
          </p>
        </div>
  {/* Map Section with Enhanced Design */}
        <div className="relative  py-10 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Decorative Background Elements */}
          <div className="absolute top-0 left-0 w-64 h-64 bg-[#b68d52] opacity-5 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#5A2B1A] opacity-5 rounded-full blur-3xl"></div>
          
          <div className="max-w-7xl mx-auto relative z-10">
            {/* Section Header */}
            {/* <div className="text-center mb-8 sm:mb-12">
              <div className="flex items-center justify-center mb-4">
                <div className="w-12 sm:w-16 md:w-20 h-[2px] bg-gradient-to-r from-transparent to-[#b68d52]"></div>
                <svg className="w-6 h-6 sm:w-8 sm:h-8 mx-3 sm:mx-4 text-[#b68d52]" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
                <div className="w-12 sm:w-16 md:w-20 h-[2px] bg-gradient-to-l from-transparent to-[#b68d52]"></div>
              </div>
              <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#5A2B1A] mb-3 cinzelfont tracking-wide">
                VISIT OUR STORE
              </h3>
              <p className="text-sm sm:text-base text-[#7a563f] max-w-2xl mx-auto">
                Experience luxury in person at our exclusive showroom in Jaipur
              </p>
            </div> */}

            {/* Map Container with Info Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              
              {/* Map - Takes 2 columns on large screens */}
              <div className="lg:col-span-2">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-[#b68d52] to-[#5A2B1A] rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-300"></div>
                  <div className="relative w-full h-[300px] sm:h-[400px] lg:h-[450px] rounded-2xl overflow-hidden shadow-2xl border-4 border-[#b68d52]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3556.2273165203483!2d75.7758968757571!3d26.95969985806914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x396db3b4daaaaaab%3A0xf5885f5c3ad5f7fe!2sVinayak%20Jewellers%20-%20Jewellery%20Shop%20In%20Jaipur!5e0!3m2!1sen!2sin!4v1759493142952!5m2!1sen!2sin"
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Vinayak Jewellers Location"
                    ></iframe>
                  </div>
                </div>
              </div>

              {/* Info Cards - 1 column on large screens */}
              <div className="space-y-4 sm:space-y-6">
                
                {/* Store Hours Card */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-lg border-2 border-[#FFF7E0] hover:border-[#b68d52] transition-all hover:shadow-xl">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#5A2B1A] to-[#7B4A2A] flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-[#5A2B1A]">Store Hours</h4>
                  </div>
                  <div className="space-y-2 text-sm text-[#7a563f]">
                    <div className="flex justify-between">
                      <span className="font-medium">Monday - Saturday</span>
                      <span>10:00 AM - 8:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-medium">Sunday</span>
                      <span>11:00 AM - 7:00 PM</span>
                    </div>
                  </div>
                </div>

                {/* Get Directions Card */}
                <div className="bg-gradient-to-br from-[#5A2B1A] to-[#7B4A2A] rounded-2xl p-5 sm:p-6 shadow-lg hover:shadow-xl transition-all">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-bold text-white">Location</h4>
                  </div>
                  <p className="text-sm text-white/90 mb-4 leading-relaxed">
                  Vinayak Jewellers G-46,<br></br> Unnati Tower, Sector 2, Central Spine,<br></br> Vidyadhar Nagar, Jaipur, Rajasthan 302039
                  </p>
                  <a
                    href="https://www.google.com/maps?ll=26.959695,75.778472&z=15&t=m&hl=en&gl=IN&mapclient=embed&cid=17692495985853724670"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white text-[#5A2B1A] px-4 py-2 rounded-lg text-sm font-semibold hover:bg-[#FFF7E0] transition-all"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                    </svg>
                    Get Directions
                  </a>
                </div>

             

              </div>
            </div>
          </div>
        </div>

        {/* Store Images Slider */}
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
      </section>

      {/* 👣 Main Footer - Modern Redesign */}
      <footer className="bg-gradient-to-b from-[#FFF4DC] to-[#FFEAC5] text-[#5A2B1A]">
        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            
            {/* Column 1: Logo & About */}
            <div className="space-y-4">
              <img
                src="/images/logo.png"
                alt="Vinayak Jewellers"
                className="h-20 sm:h-24 lg:h-28 w-auto object-contain"
              />
              <p className="text-sm text-[#7a563f] leading-relaxed">
                Crafting timeless elegance with exquisite jewellery collections. Your trusted destination for gold, diamond, and silver ornaments.
              </p>
              
              {/* Social Media */}
              <div className="pt-2">
                <p className="text-sm font-semibold mb-3 text-[#5A2B1A]">Follow Us</p>
                <div className="flex gap-3">
                  <a
                    href="https://www.instagram.com/vinayak_jewellers_jaipur/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full  flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                  >
                    <FaInstagram size={18} />
                  </a>
                  <a
                    href="https://www.facebook.com/vinayakjewellersjpr/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                  >
                    <FaFacebook size={18} />
                  </a>
                  <a
                    href="https://www.youtube.com/@vinayak_jewellers1"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                  >
                    <FaYoutube size={18} />
                  </a>
                  <a
                    href="https://in.pinterest.com/pin/vinayak-jewellers--948570740266222907/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white hover:scale-110 transition-transform shadow-md"
                  >
                    <FaPinterest size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#5A2B1A] border-b-2 border-[#b68d52] pb-2 inline-block">
                Quick Links
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/" className="text-sm text-[#7a563f] hover:text-[#5A2B1A] hover:translate-x-1 transition-all inline-block">
                    → Home
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-sm text-[#7a563f] hover:text-[#5A2B1A] hover:translate-x-1 transition-all inline-block">
                    → About Us
                  </Link>
                </li>
                <li>
                  <Link to="/alljewellery" className="text-sm text-[#7a563f] hover:text-[#5A2B1A] hover:translate-x-1 transition-all inline-block">
                    → Collections
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-sm text-[#7a563f] hover:text-[#5A2B1A] hover:translate-x-1 transition-all inline-block">
                    → Contact Us
                  </Link>
                </li>
                <li>
                  <Link to="/enquiry" className="text-sm text-[#7a563f] hover:text-[#5A2B1A] hover:translate-x-1 transition-all inline-block">
                    → Enquiry Cart
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact Info */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#5A2B1A] border-b-2 border-[#b68d52] pb-2 inline-block">
                Contact Info
              </h3>
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#b68d52] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-[#5A2B1A]">Address</p>
                    <p className="text-sm text-[#7a563f] leading-relaxed">
                     Vinayak Jewellers G-46, Unnati Tower, Sector 2, Central Spine, Vidyadhar Nagar, Jaipur, Rajasthan 302039
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#b68d52] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-[#5A2B1A] mb-1">Phone</p>
                    <div className="space-y-1">
                      <a href="tel:+919414156451" className="block text-sm text-[#7a563f] hover:text-[#5A2B1A] transition">
                        +91 9414156451
                      </a>
                      <a href="tel:01412337548" className="block text-sm text-[#7a563f] hover:text-[#5A2B1A] transition">
                        0141-2337548
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-[#b68d52] flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-[#5A2B1A]">Email</p>
                    <a href="mailto:info@vinayakjewellers.com" className="text-sm text-[#7a563f] hover:text-[#5A2B1A] transition">
                      info@vinayakjewellers.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Column 4: Legal & Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-bold text-[#5A2B1A] border-b-2 border-[#b68d52] pb-2 inline-block">
                Legal
              </h3>
              <ul className="space-y-2.5">
                <li>
                  <Link to="/terms" className="text-sm text-[#7a563f] hover:text-[#5A2B1A] hover:translate-x-1 transition-all inline-block">
                    → Terms & Conditions
                  </Link>
                </li>
                <li>
                  <Link to="/privacy" className="text-sm text-[#7a563f] hover:text-[#5A2B1A] hover:translate-x-1 transition-all inline-block">
                    → Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/disclaimer" className="text-sm text-[#7a563f] hover:text-[#5A2B1A] hover:translate-x-1 transition-all inline-block">
                    → Disclaimer
                  </Link>
                </li>
              </ul>

              {/* Action Buttons */}
              <div className="pt-4 space-y-3">
                <Link
                  to="/login-enquiry"
                  className="block w-full bg-gradient-to-r from-[#5A2B1A] to-[#7B4A2A] text-white text-center px-4 py-2.5 rounded-lg text-sm font-semibold hover:shadow-lg hover:scale-105 transition-all"
                >
                  Enquire Now
                </Link>
                <Link
                  to="/admin-login"
                  className="block w-full bg-[#FFF7E0] text-[#5A2B1A] text-center px-4 py-2.5 rounded-lg text-sm font-semibold border-2 border-[#b68d52] hover:bg-[#5A2B1A] hover:text-white transition-all"
                >
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Image */}
        <div className="w-full">
          <img
            src="/images/footer-image.svg"
            alt="Footer Design"
            className="w-full h-auto object-cover"
          />
        </div>
        {/* Bottom Bar */}
        <div className="bg-gradient-to-r from-[#5A2B1A] via-[#7B4A2A] to-[#5A2B1A] text-[#FFF7E0] py-4 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-3 text-sm">
            <p className="text-center sm:text-left">
              © 2025 Vinayak Jewellers. All Rights Reserved.
            </p>
            <p className="text-center sm:text-right">
              Developed by{" "}
              <a
                href="https://www.kontentkraftdigital.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold hover:text-[#b68d52] transition underline"
              >
                Kontent Kraft Digital
              </a>
            </p>
          </div>
        </div>

      
      </footer>
    </>
  );
};

export default Footer;
