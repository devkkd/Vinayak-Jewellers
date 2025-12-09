import React from "react";

const ContactSection = () => {
  return (
    <section className="bg-[#FFF7E0] py-16 px-4">
      <div className="max-w-6xl mx-auto bg-gradient-to-b from-[#5A2203] to-[#0E0100] text-white rounded-3xl p-10 md:p-14 shadow-lg text-center">

        {/* Heading */}
        <h2 className="text-2xl md:text-3xl cinzelfont  font-semibold mb-4 uppercase">
          searching for all jewellery?
        </h2>

        <p className="text-md md:text-lg font-light mb-10 leading-relaxed tracking-wider">
          Our specialists are here to help you select the perfect piece! <br />
          Our expert will get in touch with you shortly!
        </p>

        {/* Form */}
        <form className="flex flex-col md:flex-row justify-center items-center gap-5 md:gap-4 w-full max-w-4xl mx-auto">
          {/* Name */}
          <div className="flex flex-col text-left w-full md:w-1/3">
            <label className="text-sm text-gray-200 mb-1">Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="rounded-full px-5 py-3 text-sm bg-white text-black outline-none w-full"
            />
          </div>

          {/* Mobile / WhatsApp */}
          <div className="flex flex-col text-left w-full md:w-1/3">
            <label className="text-sm text-gray-200 mb-1">Mobile/WhatsApp Number</label>
            <input
              type="text"
              placeholder="Enter Your Mobile/WhatsApp Number"
              className="rounded-full px-5 py-3 text-sm bg-white text-black outline-none w-full"
            />
          </div>

          {/* Button */}
          <button
            type="submit"
            className="bg-white mt-6 text-[#5A2203] font-semibold rounded-full px-8 py-3 whitespace-nowrap hover:bg-[#F3E3C0] transition w-full md:w-auto"
          >
            Get In Touch →
          </button>
        </form>
      </div>
    </section>
  );
};

export default ContactSection;
