import InstagramReel from "../models/InstagramReel.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

const MAX_REELS = 7;

// Helper: upload buffer to Cloudinary
const uploadToCloudinary = (buffer, resourceType = "video") =>
  new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "vinayak_reels", resource_type: resourceType },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });

// Helper: delete from Cloudinary
const destroyCloudinary = async (publicId, resourceType = "video") => {
  try {
    await cloudinary.uploader.destroy(publicId, { resource_type: resourceType });
  } catch (_) {}
};

// Public: get all active reels
export const getReels = async (_req, res) => {
  try {
    const reels = await InstagramReel.find({ isActive: true }).sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, data: reels });
  } catch {
    return res.status(500).json({ success: false, message: "Failed to fetch reels" });
  }
};

// Admin: get all reels
export const getAllReels = async (_req, res) => {
  try {
    const reels = await InstagramReel.find().sort({ order: 1, createdAt: -1 });
    return res.json({ success: true, data: reels });
  } catch {
    return res.status(500).json({ success: false, message: "Failed to fetch reels" });
  }
};

// Admin: add reel with video file upload
export const addReel = async (req, res) => {
  try {
    if (!req.files?.video?.[0]) {
      return res.status(400).json({ success: false, message: "Video file is required" });
    }

    // Auto-delete oldest if at max
    const count = await InstagramReel.countDocuments();
    if (count >= MAX_REELS) {
      const oldest = await InstagramReel.findOne().sort({ createdAt: 1 });
      if (oldest) {
        if (oldest.videoPublicId) await destroyCloudinary(oldest.videoPublicId, "video");
        if (oldest.thumbnailPublicId) await destroyCloudinary(oldest.thumbnailPublicId, "image");
        await InstagramReel.findByIdAndDelete(oldest._id);
      }
    }

    // Upload video
    const videoResult = await uploadToCloudinary(req.files.video[0].buffer, "video");

    // Upload thumbnail if provided
    let thumbnailUrl = "";
    let thumbnailPublicId = "";
    if (req.files?.thumbnail?.[0]) {
      const thumbResult = await uploadToCloudinary(req.files.thumbnail[0].buffer, "image");
      thumbnailUrl = thumbResult.secure_url;
      thumbnailPublicId = thumbResult.public_id;
    }

    const reel = await InstagramReel.create({
      videoUrl: videoResult.secure_url,
      videoPublicId: videoResult.public_id,
      thumbnailUrl,
      thumbnailPublicId,
    });

    return res.status(201).json({ success: true, data: reel });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Failed to add reel", error: e.message });
  }
};

// Admin: update reel (optionally replace video/thumbnail)
export const updateReel = async (req, res) => {
  try {
    const { id } = req.params;
    const { isActive } = req.body || {};

    const reel = await InstagramReel.findById(id);
    if (!reel) return res.status(404).json({ success: false, message: "Reel not found" });

    // Replace video if new one uploaded
    if (req.files?.video?.[0]) {
      if (reel.videoPublicId) await destroyCloudinary(reel.videoPublicId, "video");
      const videoResult = await uploadToCloudinary(req.files.video[0].buffer, "video");
      reel.videoUrl = videoResult.secure_url;
      reel.videoPublicId = videoResult.public_id;
    }

    // Replace thumbnail if new one uploaded
    if (req.files?.thumbnail?.[0]) {
      if (reel.thumbnailPublicId) await destroyCloudinary(reel.thumbnailPublicId, "image");
      const thumbResult = await uploadToCloudinary(req.files.thumbnail[0].buffer, "image");
      reel.thumbnailUrl = thumbResult.secure_url;
      reel.thumbnailPublicId = thumbResult.public_id;
    }

    if (isActive !== undefined) reel.isActive = isActive === "true" || isActive === true;

    await reel.save();
    return res.json({ success: true, data: reel });
  } catch (e) {
    return res.status(500).json({ success: false, message: "Failed to update reel", error: e.message });
  }
};

// Admin: delete reel
export const deleteReel = async (req, res) => {
  try {
    const { id } = req.params;
    const reel = await InstagramReel.findByIdAndDelete(id);
    if (!reel) return res.status(404).json({ success: false, message: "Reel not found" });
    if (reel.videoPublicId) await destroyCloudinary(reel.videoPublicId, "video");
    if (reel.thumbnailPublicId) await destroyCloudinary(reel.thumbnailPublicId, "image");
    return res.json({ success: true, message: "Reel deleted successfully" });
  } catch {
    return res.status(500).json({ success: false, message: "Failed to delete reel" });
  }
};
