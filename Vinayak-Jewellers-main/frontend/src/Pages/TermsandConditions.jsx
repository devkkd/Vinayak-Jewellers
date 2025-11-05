import React from "react";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";

export default function TermsandConditions() {
  return (
    <div className="bg-[#FFF9ED] text-[#1C0D00] font-sans">
      {/* HERO / PAGE INTRO */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-[#FFF4DC] to-[#FFEEC0]">
        <div className="absolute inset-0 bg-[url('/images/gold-pattern.png')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold uppercase text-[#5A2B1A] tracking-wide mb-6">
            Terms & Conditions
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-[#3C2415]/90 max-w-3xl mx-auto font-light">
            Welcome to <span className="font-semibold">Vinayak Jewellers</span>.
            By accessing and using our website, you agree to abide by our terms
            and conditions outlined below. Please read them carefully before
            proceeding with any purchase or browsing our collections.
          </p>
        </div>
      </section>

      {/* SECTION - GENERAL TERMS */}
      <ContentBlock
        title="General Terms of Use"
        text="By using our website, you acknowledge that you have read, understood, and agreed to our terms of use. Vinayak Jewellers reserves the right to update or modify these terms at any time without prior notice. Please revisit this page periodically to stay informed of any updates."
      />

      {/* SECTION - PRODUCTS & PRICING */}
      <TwoColumnBlock
        bg="bg-[#FFF7E0]"
        leftTitle="Product Information"
        leftText="All products displayed on our website are handcrafted and may vary slightly in color, weight, or design. We ensure accuracy in descriptions, dimensions, and certifications for your confidence and satisfaction."
        rightTitle="Pricing & Availability"
        rightText="Prices are subject to real-time market fluctuations in gold, silver, and diamond rates. While we strive for precision, minor errors may occur. Vinayak Jewellers reserves the right to correct such discrepancies prior to order confirmation."
      />

      {/* SECTION - ORDERS & PAYMENT */}
      <TwoColumnBlock
        bg="bg-[#FFF1D4]"
        sectionTitle="Orders & Payments"
        leftTitle="Order Confirmation"
        leftText="Upon placing your order, a confirmation email or message will be sent to you. Orders are processed after successful payment verification. In case of unavailability, our team will promptly inform you and offer alternatives or a full refund."
        rightTitle="Payment Security"
        rightText="Your online transactions are fully protected with encrypted gateways. We do not store your payment information. You can shop securely knowing your data is handled with the highest level of confidentiality."
      />

      {/* SECTION - RETURNS */}
      <ContentBlock
        title="Returns, Exchanges & Repairs"
        text="We take pride in the craftsmanship of every piece. If you are not fully satisfied, exchanges or returns are accepted within 7 days of purchase, provided the item is unused and accompanied by the original invoice. Custom-made or personalized items are non-returnable. For resizing or repairs, please visit our store or contact our support team."
        bg="bg-[#FFF8E4]"
      />

      {/* SECTION - INTELLECTUAL PROPERTY */}
      <ContentBlock
        title="Intellectual Property"
        text="All content, imagery, and designs featured on this website are the intellectual property of Vinayak Jewellers. Unauthorized reproduction, modification, or distribution in any form without prior written consent is strictly prohibited."
        bg="bg-[#FFEAC7]"
      />

      {/* SECTION - CONTACT */}
      <section className="py-20 bg-gradient-to-b from-[#FFF7E0] to-[#FFF4DC] text-center relative">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-cinzel font-semibold text-[#5A2B1A] mb-6 tracking-wide">
            Contact & Legal Compliance
          </h2>
          <p className="text-base md:text-lg text-[#3C2415]/90 leading-relaxed font-light max-w-3xl mx-auto">
            For clarifications or legal concerns related to these Terms &
            Conditions, please connect with us through our{" "}
            <Link
              to="/contact"
              className="font-semibold underline underline-offset-4 decoration-[#5A2B1A] hover:text-[#5A2B1A] transition-all duration-300"
            >
              contact page
            </Link>{" "}
            or visit our showroom at Vidhyadhar Nagar, Jaipur.
            <br />
            <br />
            By continuing to use this website, you accept these Terms &
            Conditions along with our Privacy Policy.
          </p>
        </div>

        {/* Soft gold glow effect */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#FFF4DC] to-transparent opacity-70"></div>
      </section>

      <ContactSection />
    </div>
  );
}

/* =============================
   REUSABLE SUBCOMPONENTS
============================= */

function ContentBlock({ title, text, bg = "bg-[#FFF7E0]" }) {
  return (
    <section
      className={`${bg} py-16 md:py-20 px-4 sm:px-6 md:px-12 border-t border-[#E8D7A9]/50`}
    >
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-cinzel font-semibold text-[#5A2B1A] mb-6 tracking-wide">
          {title}
        </h2>
        <p className="text-base md:text-lg text-[#3C2415]/90 leading-relaxed font-light max-w-3xl mx-auto">
          {text}
        </p>
      </div>
    </section>
  );
}

function TwoColumnBlock({
  bg = "bg-[#FFF7E0]",
  sectionTitle,
  leftTitle,
  leftText,
  rightTitle,
  rightText,
}) {
  return (
    <section className={`${bg} py-20 px-4 sm:px-6 md:px-12`}>
      <div className="max-w-6xl mx-auto">
        {sectionTitle && (
          <h2 className="text-3xl md:text-4xl font-cinzel font-semibold text-center text-[#5A2B1A] mb-12 tracking-wide">
            {sectionTitle}
          </h2>
        )}
        <div className="grid md:grid-cols-2 gap-10">
          {[{ title: leftTitle, text: leftText }, { title: rightTitle, text: rightText }].map(
            (item, i) => (
              <div
                key={i}
                className="p-8 bg-white/60 backdrop-blur-sm rounded-3xl shadow-sm hover:shadow-lg hover:scale-[1.01] transition-all duration-300 border border-[#E8D7A9]"
              >
                <h3 className="text-xl md:text-2xl font-semibold text-[#5A2B1A] mb-4">
                  {item.title}
                </h3>
                <p className="text-base md:text-lg text-[#3C2415]/90 leading-relaxed font-light">
                  {item.text}
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}
