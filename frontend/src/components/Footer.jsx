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
    "/images/store1.png",
    "/images/store2.png",
    "/images/store3.png",
    "/images/store4.png",
  ];

  return (
    <>
      {/* 🏬 Store Section */}
      <section className="bg-[#FFF9E6] pb-20 overflow-hidden">
        {/* Divider */}
        <div className="flex items-center justify-center mb-10">
          <div className="w-[60px] sm:w-[80px] md:w-[300px] h-[1px] bg-gradient-to-r from-[#5C1D02] to-[#A65C3C]" />
          <div className="mx-3 sm:mx-4">
            <img
              src="/images/diamondContactPage.png"
              alt="Diamond"
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />
          </div>
          <div className="w-[60px] sm:w-[80px] md:w-[300px] h-[1px] bg-gradient-to-r from-[#5C1D02] to-[#A65C3C]" />
        </div>

        {/* Title */}
        <div className="text-center mb-10 px-4">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-[500] mb-5 cinzelfont text-[#0E0100] tracking-wider">
            VISIT OUR STORE
          </h2>
          <p className="text-[#0E0100] max-w-2xl mx-auto capitalize font-sans font-light flex justify-center text-base md:text-xl leading-relaxed lg:whitespace-nowrap">
            Explore an exclusive range of lab grown diamond jewellery, crafted
            with brilliance and care.
          </p>
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

      {/* 👣 Main Footer */}
      <footer className="bg-[#FFEAC5] text-gray-900 border-t border-gray-300">
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row justify-between items-start md:items-center">
          {/* Left Section */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-12">
            <img
              src="/images/logo.png"
              alt="Vinayak Jewellers"
              className="h-[120px] w-[192px]"
            />

            <div>
              <p className="font-bold mb-1">Address</p>
              <p className="text-sm leading-snug">
                G-46, Unnati Tower, Sector 2, Central Spine, <br />
                Vidhyadhar Nagar, Jaipur, Rajasthan
              </p>
            </div>

            <div>
              <p className="font-bold mb-1">Contact Us</p>
              <p className="text-sm">+91 9414156451</p>
            </div>
          </div>

          {/* Right Section */}
          <div className="mt-6 md:mt-0 text-sm sm:text-left md:text-right space-y-2">
            <ul className="space-y-2">
              <li>
                <Link to="/terms" className="hover:underline">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="hover:underline">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/disclaimer" className="hover:underline">
                  Disclaimer
                </Link>
              </li>
            </ul>

            {/* Admin Login */}
            <div className="pt-2">
              <Link
                to="/admin-login"
                className="inline-block bg-[#140100] text-[#FFF9E6] px-3 py-1.5 rounded-md text-xs font-medium hover:bg-[#5C1D02] transition"
              >
                Admin Login
              </Link>
            </div>

            {/* 💎 Enquiry Button */}
            <div className="pt-1">
              <Link
                to="/login-enquiry"
                className="inline-block bg-[#140100] text-[#FFF9E6] px-3 py-1.5 rounded-md text-xs font-medium hover:bg-[#5C1D02] transition"
              >
                Enquire Now
              </Link>
            </div>
          </div>
        </div>

        {/* Divider */}
        <hr className="border-black" />

        {/* Bottom Section */}
        <div className="max-w-7xl mx-auto px-6 py-8 flex flex-col md:flex-row gap-8">
          {/* Map */}
          <div className="w-full md:w-4/5 h-[200px] rounded-lg overflow-hidden shadow">
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

          {/* Social & Copyright */}
          <div className="w-full md:w-1/5 flex flex-col justify-center items-center md:items-end text-center md:text-right space-y-6">
            <div>
              <p className="text-sm font-bold mb-2">Follow us</p>
              <div className="flex justify-center sm:justify-start md:justify-end space-x-4">
                <a
                  href="https://www.instagram.com/vinayak_jewellers_jaipur/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-600 hover:scale-110 transition"
                >
                  <FaInstagram size={24} />
                </a>
                <a
                  href="https://www.facebook.com/vinayakjewellersjpr/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:scale-110 transition"
                >
                  <FaFacebook size={24} />
                </a>
                <a
                  href="https://www.youtube.com/@vinayak_jewellers1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-600 hover:scale-110 transition"
                >
                  <FaYoutube size={24} />
                </a>
                <a
                  href="https://in.pinterest.com/pin/vinayak-jewellers--948570740266222907/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:scale-110 transition"
                >
                  <FaPinterest size={24} />
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-700">
              © 2025 Vinayak Jewellers.
              <br />
              All Rights Reserved.
            </p>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="bg-[#FCDFAF] text-center py-3 border-t border-gray-300 text-sm text-gray-800 tracking-wide">
          © 2025 Vinayak Jewellers — All Rights Reserved! Developed by{" "}
          <a
            href="https://www.kontentkraftdigital.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold hover:text-yellow-700 transition"
          >
            Kontent Kraft Digital
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
