import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { backendLogin } from "../api/backendAuthAPI";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await backendLogin({ email, password });
      if (res?.token) {
        localStorage.setItem("adminToken", res.token);
        navigate("/dashboard");
      } else {
        alert("Invalid credentials");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Invalid credentials";
      alert(msg);
    }
  };

  return (
    <div className="flex justify-center items-center bg-[#FFF9E6] min-h-[calc(100vh-80px)]">
      {/* Outer Container */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl mx-4 md:mx-8 shadow-2xl rounded-2xl overflow-hidden border border-[#E2C887]/50 bg-white">
        
        {/* LEFT SIDE - Branding */}
        <div className="bg-gradient-to-b from-[#E2C887]/30 to-[#FFF9E6] flex flex-col justify-center items-center w-full lg:w-1/2 p-8 md:p-12 lg:p-16 text-center">
          <img
            src="/images/logoContact.png"
            alt="Vinayak Logo"
            className="w-28 h-28 sm:w-32 sm:h-32 mb-5 object-contain"
          />
          <h2 className="text-[#140100] text-4xl sm:text-5xl cinzelfont font-bold tracking-widest">
            VINAYAK
          </h2>
          <p className="text-[#5C1D02] mt-3 tracking-wider mainfont text-base sm:text-lg">
            Jewellers Admin Portal
          </p>
        </div>

        {/* RIGHT SIDE - Login Form */}
        <div className="bg-white w-full lg:w-1/2 flex flex-col justify-center items-center p-6 sm:p-10 md:p-14 lg:p-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-[#140100] cinzelfont mb-8 text-center">
            ADMIN LOGIN
          </h2>

          <form
            onSubmit={handleSubmit}
            className="w-full max-w-sm sm:max-w-md mx-auto flex flex-col"
          >
            <input
              type="email"
              placeholder="Email Address"
              className="border border-[#E2C887]/60 rounded-lg w-full p-3 sm:p-4 mb-5 focus:outline-none focus:ring-2 focus:ring-[#E2C887] text-[15px] sm:text-[16px] bg-[#FFF9E6]/30"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <input
              type="password"
              placeholder="Password"
              className="border border-[#E2C887]/60 rounded-lg w-full p-3 sm:p-4 mb-6 focus:outline-none focus:ring-2 focus:ring-[#E2C887] text-[15px] sm:text-[16px] bg-[#FFF9E6]/30"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="submit"
              className="w-full py-2.5 sm:py-3 bg-[#140100] text-[#FFF9E6] text-base sm:text-lg font-semibold rounded-lg hover:bg-[#5C1D02] transition-all duration-300"
            >
              LOGIN
            </button>
          </form>

          <p className="mt-5 text-[14px] sm:text-[15px] text-[#3B2E1E] mainfont text-center">
            Back to{" "}
            <Link
              to="/"
              className="text-[#5C1D02] font-semibold hover:underline"
            >
              Home Page
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
