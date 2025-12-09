import React from "react";
import { Link } from "react-router-dom";
import ContactSection from "../components/ContactSection";

export default function PrivacyPolicy() {
  return (
    <div className="bg-[#FFF9ED] text-[#1C0D00] font-sans">
      {/* HERO / PAGE INTRO */}
      <section className="relative overflow-hidden py-24 md:py-32 bg-gradient-to-b from-[#FFF4DC] to-[#FFEEC0]">
        <div className="absolute inset-0 bg-[url('/images/gold-pattern.png')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-cinzel font-bold uppercase text-[#5A2B1A] tracking-wide mb-6">
            Privacy Policy
          </h1>
          <p className="text-base md:text-lg leading-relaxed text-[#3C2415]/90 max-w-3xl mx-auto font-light">
            At <span className="font-semibold">Vinayak Jewellers</span>, your privacy is
            of utmost importance to us. This policy outlines how we collect, use,
            and protect your personal information when you interact with our
            website or visit our store.
          </p>
        </div>
      </section>

      {/* SECTION - INFORMATION COLLECTION */}
      <ContentBlock
        title="Information We Collect"
        text="We may collect personal details such as your name, contact information, billing address, and email when you make a purchase, sign up for our newsletter, or fill out a form. We also collect non-personal data like browser type, IP address, and browsing behavior to enhance user experience."
      />

      {/* SECTION - USAGE OF INFORMATION */}
      <TwoColumnBlock
        bg="bg-[#FFF7E0]"
        sectionTitle="How We Use Your Information"
        leftTitle="To Enhance Experience"
        leftText="Your data helps us personalize your shopping experience, recommend relevant products, and provide seamless service. It also enables us to respond efficiently to your queries or requests."
        rightTitle="To Improve Our Website"
        rightText="We analyze aggregated usage data to improve website functionality, navigation, and design, ensuring a smoother and more enjoyable browsing experience for every visitor."
      />

      {/* SECTION - DATA PROTECTION */}
      <TwoColumnBlock
        bg="bg-[#FFF1D4]"
        sectionTitle="Data Protection & Security"
        leftTitle="Secure Transactions"
        leftText="We use encrypted payment gateways and secure data storage to safeguard your information. We never store sensitive details like credit or debit card numbers on our servers."
        rightTitle="Third-Party Services"
        rightText="We may partner with trusted third-party providers for payment, analytics, or delivery services. These partners are bound by strict confidentiality and data protection agreements."
      />

      {/* SECTION - COOKIES */}
      <ContentBlock
        title="Cookies & Tracking Technologies"
        text="Our website uses cookies to enhance your browsing experience. Cookies help remember your preferences and track website analytics. You can disable cookies through your browser settings, though some features may not function properly without them."
        bg="bg-[#FFF8E4]"
      />

      {/* SECTION - YOUR RIGHTS */}
      <ContentBlock
        title="Your Rights & Choices"
        text="You have full control over your personal data. You may request to view, modify, or delete your information at any time. To do so, please contact our support team through our Contact Page."
        bg="bg-[#FFEAC7]"
      />

      {/* SECTION - POLICY UPDATES */}
      <section className="py-20 bg-gradient-to-b from-[#FFF7E0] to-[#FFF4DC] text-center relative">
        <div className="max-w-5xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-cinzel font-semibold text-[#5A2B1A] mb-6 tracking-wide">
            Policy Updates & Contact
          </h2>
          <p className="text-base md:text-lg text-[#3C2415]/90 leading-relaxed font-light max-w-3xl mx-auto">
            We may periodically update this Privacy Policy to reflect changes in our
            business practices or legal requirements. Any revisions will be posted
            here with an updated effective date.
            <br />
            <br />
            For questions, requests, or feedback regarding our policy, please reach
            out via our{" "}
            <Link
              to="/contact"
              className="font-semibold underline underline-offset-4 decoration-[#5A2B1A] hover:text-[#5A2B1A] transition-all duration-300"
            >
              contact page
            </Link>{" "}
            or visit our showroom in Vidhyadhar Nagar, Jaipur.
          </p>
        </div>
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
