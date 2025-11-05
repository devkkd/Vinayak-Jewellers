import { useState } from "react";
import emailjs from "@emailjs/browser";

const LoginEnquiryForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    emailjs
      .send(
        "service_fmzp73s", // your EmailJS Service ID
        "template_0nhj3sp", // your Template ID
        formData,
        "HW_6DYxtpYO4wBKfm" // your Public Key
      )
      .then(
        () => {
          alert("✅ Enquiry sent successfully!");
          setFormData({ name: "", email: "", phone: "", message: "" });
          setIsSubmitting(false);
        },
        (error) => {
          alert("❌ Failed to send. Please try again later.");
          console.error(error);
          setIsSubmitting(false);
        }
      );
  };

  return (
    <div className="flex flex-col items-center mt-12">
      <h2 className="text-3xl font-bold text-[#5C1D02] mb-2 cinzelfont">
        💎 Enquire Today!
      </h2>
      <p className="text-[#3B1C0A] mb-6 text-center max-w-md">
        Have questions or want to customize your jewellery? Fill out the form below
        and we’ll get back to you shortly.
      </p>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-[#FFF9E6] border border-[#E2C887]/60 rounded-2xl shadow-md p-6 space-y-4 hover:shadow-lg transition-all duration-300"
      >
        <h3 className="text-xl font-semibold text-center text-[#5C1D02] mb-4">
          ✨ Jewellery Enquiry Form
        </h3>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white text-[#3B1C0A] focus:outline-none focus:ring-2 focus:ring-[#E2C887] placeholder:text-[#9b7e52]"
        />

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white text-[#3B1C0A] focus:outline-none focus:ring-2 focus:ring-[#E2C887] placeholder:text-[#9b7e52]"
        />

        <input
          type="tel"
          name="phone"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white text-[#3B1C0A] focus:outline-none focus:ring-2 focus:ring-[#E2C887] placeholder:text-[#9b7e52]"
        />

        <textarea
          name="message"
          placeholder="Your enquiry or message..."
          value={formData.message}
          onChange={handleChange}
          required
          rows={4}
          className="w-full border border-[#E2C887]/60 rounded-lg p-3 bg-white text-[#3B1C0A] focus:outline-none focus:ring-2 focus:ring-[#E2C887] placeholder:text-[#9b7e52]"
        ></textarea>

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 rounded-lg font-semibold text-lg text-[#FFF9E6] bg-gradient-to-r from-[#E2C887] to-[#5C1D02] shadow-md hover:shadow-lg transition-all duration-300 ${
            isSubmitting ? "opacity-70 cursor-not-allowed" : "hover:scale-[1.02] cursor-pointer"
          }`}
        >
          {isSubmitting ? "Sending..." : "Submit Enquiry"}
        </button>
      </form>

      <p className="text-sm text-[#5C1D02]/70 mt-4">
        We respect your privacy — your information is secure with us.
      </p>
    </div>
  );
};

export default LoginEnquiryForm;
