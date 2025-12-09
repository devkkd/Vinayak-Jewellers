import React, { useState } from "react";
import { backendLogin } from "../api/backendAuthAPI";

const BackendLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await backendLogin({ email, password });
      if (res?.token) {
        localStorage.setItem("backendToken", res.token);
        alert("Logged in (backend)");
      } else {
        alert("Login failed");
      }
    } catch (err) {
      const msg = err?.response?.data?.message || "Login failed";
      alert(msg);
    }
  };

  return (
    <div className="p-8 max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Backend Login (admin)</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        <input className="border p-2 w-full" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="border p-2 w-full" placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <button className="bg-black text-white px-4 py-2 rounded" type="submit">Login</button>
      </form>
    </div>
  );
};

export default BackendLogin;


