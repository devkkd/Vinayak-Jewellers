import client from "./client";

export const backendLogin = async ({ email, password }) => {
  try {
    console.log("🔐 Login attempt:", { 
      email, 
      emailLength: email?.length,
      hasPassword: !!password,
      passwordLength: password?.length 
    });
    
    const res = await client.post("/api/auth/login", { email, password });
    console.log("✅ Login response:", res.data);
    return res.data; // { success, token, user }
  } catch (error) {
    const errorDetails = {
      status: error?.response?.status,
      statusText: error?.response?.statusText,
      message: error?.response?.data?.message,
      data: error?.response?.data,
      url: error?.config?.url,
      method: error?.config?.method,
      requestData: error?.config?.data,
    };
    
    console.error("❌ Login error details:", errorDetails);
    console.error("Full error object:", error);
    
    // More detailed error message
    if (error?.response?.status === 401) {
      console.error("🔴 401 Unauthorized - Possible reasons:");
      console.error("   1. Email or password is incorrect");
      console.error("   2. User doesn't exist in database");
      console.error("   3. Password hash mismatch");
      console.error(`   Email sent: ${email}`);
      console.error(`   Password sent: ${password ? "***" : "MISSING"}`);
    }
    
    throw error;
  }
};


