import Enquiry from "../models/Enquiry.js";

export const createEnquiry = async (req, res) => {
  try {
    const { name, phone, productId, productName, productImage } = req.body || {};
    if (!name || !phone) return res.status(400).json({ success: false, message: "Name and phone required" });
    const doc = await Enquiry.create({ name, phone, productId, productName, productImage });
    return res.status(201).json({ success: true, data: doc });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Failed to submit enquiry" });
  }
};

export const listEnquiries = async (_req, res) => {
  try {
    const rows = await Enquiry.find({}).sort({ createdAt: -1 });
    return res.json({ success: true, data: rows });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Failed to fetch enquiries" });
  }
};


