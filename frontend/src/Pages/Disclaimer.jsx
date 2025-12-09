import React from "react";
import ContactSection from "../components/ContactSection";
import { Link } from "react-router-dom";

export default function Disclaimer() {
  return (
    <div className="bg-[#FFF4DC] text-[#0E0100] font-sans">
      {/* HERO / TITLE */}
      <section className="bg-[#FFF7E0] py-16 md:py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 text-center">
          <h1 className="text-3xl md:text-4xl lg:text-[48px] font-cinzel font-semibold text-[#0E0100] tracking-wide mb-4 uppercase">
            Disclaimer
          </h1>
          <p className="max-w-3xl mx-auto text-base md:text-lg font-light text-[#0E0100]/80 leading-relaxed">
            Welcome to Vinayak Jewellers. The following disclaimer outlines the
            limitations of liability and use of information on our website.
          </p>
        </div>
      </section>

      {/* SECTION 1 - INFORMATION ACCURACY */}
      <section className="bg-[#FFEAC5] py-12 md:py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-cinzel font-semibold text-[#0E0100] tracking-wide mb-3">
            Accuracy of Information
          </h2>
          <p className="text-[#0E0100] text-base md:text-lg leading-relaxed font-light capitalize">
            While we make every effort to ensure that the details on our website
            are accurate and up to date, occasional discrepancies may occur.
            Product images, descriptions, and pricing are subject to change
            without prior notice. We are not liable for any typographical or
            data errors.
          </p>
        </div>
      </section>

      {/* SECTION 2 - LIABILITY */}
      <section className="bg-[#FFF7E0] py-12 md:py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-cinzel font-semibold text-[#0E0100] tracking-wide mb-3">
            Limitation of Liability
          </h2>
          <p className="text-[#0E0100] text-base md:text-lg leading-relaxed font-light capitalize">
            Vinayak Jewellers shall not be held responsible for any direct,
            indirect, incidental, or consequential damages arising from the use
            of this website or reliance on any information provided herein. All
            purchases made are subject to our{" "}
            <Link
              to="/terms"
              className="font-semibold underline hover:text-[#681F00] transition-colors duration-300"
            >
              Terms & Conditions
            </Link>
            .
          </p>
        </div>
      </section>

      {/* SECTION 3 - EXTERNAL LINKS */}
      <section className="bg-[#FFEAC5] py-12 md:py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-cinzel font-semibold text-[#0E0100] tracking-wide mb-3">
            External Links
          </h2>
          <p className="text-[#0E0100] text-base md:text-lg leading-relaxed font-light capitalize">
            Our website may contain links to external sites for your
            convenience. Vinayak Jewellers does not endorse, control, or assume
            responsibility for the content or policies of these third-party
            websites. We encourage users to review their respective privacy
            policies and disclaimers.
          </p>
        </div>
      </section>

      {/* SECTION 4 - COPYRIGHT & INTELLECTUAL PROPERTY */}
      <section className="bg-[#FFF7E0] py-12 md:py-16 px-4 sm:px-6 md:px-12">
        <div className="max-w-6xl mx-auto flex flex-col gap-6">
          <h2 className="text-2xl md:text-3xl font-cinzel font-semibold text-[#0E0100] tracking-wide mb-3">
            Copyright Notice
          </h2>
          <p className="text-[#0E0100] text-base md:text-lg leading-relaxed font-light capitalize">
            All content, including text, graphics, logos, and product images on
            this website, are the property of Vinayak Jewellers unless otherwise
            stated. Unauthorized reproduction or distribution is prohibited and
            may result in legal action.
          </p>
        </div>
      </section>

      {/* SECTION 5 - CONTACT */}
      <section className="bg-[#FFEAC5] py-16 md:py-20 text-center px-4 sm:px-6 md:px-12">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-cinzel font-semibold text-[#0E0100] mb-5 tracking-wide">
            Contact & Clarifications
          </h2>
          <p className="text-[#0E0100] text-base md:text-lg font-light leading-relaxed capitalize">
            For any concerns or clarifications regarding this disclaimer,
            please reach out through our{" "}
            <Link
              to="/contact"
              className="font-semibold underline hover:text-[#681F00] transition-colors duration-300"
            >
              contact page
            </Link>{" "}
            or visit our showroom in Vidhyadhar Nagar, Jaipur.
          </p>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <ContactSection />
    </div>
  );
}
