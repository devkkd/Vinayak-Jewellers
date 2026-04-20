import { PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { r2Client, R2_BUCKET, R2_PUBLIC_URL } from "../config/r2.js";
import Product from "../models/Product.js";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

// Helper: upload buffer to R2
const uploadToR2 = async (buffer, mimeType, folder = "vinayak_jewellers") => {
  const ext = mimeType.split("/")[1] || "bin";
  const key = `${folder}/${uuidv4()}.${ext}`;
  await r2Client.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: mimeType,
    })
  );
  return { url: `${R2_PUBLIC_URL}/${key}`, key };
};

// Helper: delete from R2
const deleteFromR2 = async (key) => {
  if (!key) return;
  try {
    await r2Client.send(new DeleteObjectCommand({ Bucket: R2_BUCKET, Key: key }));
  } catch (_) {}
};

// Extract R2 key from full URL
const keyFromUrl = (url) => {
  if (!url) return null;
  return url.replace(`${R2_PUBLIC_URL}/`, "");
};

export const uploadProduct = async (req, res) => {
  try {
    let { productName, details, sku, collection, category, subcategory } = req.body;
    if (productName) productName = productName.trim();
    if (details) details = details.trim();
    if (sku) sku = sku.trim();
    if (collection) collection = collection.trim();
    if (category) category = category.trim();
    if (subcategory) subcategory = subcategory.trim();

    if (!productName || !details || !sku) {
      return res.status(400).json({ success: false, message: "productName, details and sku are required" });
    }

    const files = req.files?.length > 0 ? req.files : req.file ? [req.file] : [];
    if (files.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image file is required" });
    }

    const uploadResults = [];
    for (const file of files) {
      const result = await uploadToR2(file.buffer, file.mimetype);
      uploadResults.push(result);
    }

    const imageUrls = uploadResults.map((r) => r.url);
    const imagePublicIds = uploadResults.map((r) => r.key);

    const product = await Product.create({
      productName, details, sku,
      image: imageUrls[0],
      imagePublicId: imagePublicIds[0],
      images: imageUrls,
      imagePublicIds,
      collection: collection || undefined,
      category: category || undefined,
      subcategory: subcategory || undefined,
    });

    return res.status(201).json({ success: true, message: "✅ Product uploaded successfully!", data: product });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ success: false, message: "Product with this SKU already exists" });
    }
    return res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
};

export const listProducts = async (req, res) => {
  try {
    const { collection, category, subcategory } = req.query;
    const filter = {};
    if (collection) filter.collection = { $regex: collection, $options: "i" };
    if (category) filter.category = { $regex: category, $options: "i" };
    if (subcategory) filter.subcategory = { $regex: subcategory, $options: "i" };
    const products = await Product.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, data: products, count: products.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query;
    if (!q?.trim()) return res.status(400).json({ success: false, message: "Search query is required" });
    const searchTerm = q.trim();
    const products = await Product.find({
      $or: [
        { productName: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { subcategory: { $regex: searchTerm, $options: "i" } },
        { collection: { $regex: searchTerm, $options: "i" } },
        { details: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });
    return res.json({ success: true, data: products, count: products.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Search failed", error: error.message });
  }
};

export const getProductsBySubmenu = async (req, res) => {
  try {
    const { submenuName, menuLink, collection } = req.query;
    if (!submenuName && !menuLink) {
      return res.status(400).json({ success: false, message: "submenuName or menuLink is required" });
    }
    const filter = {};
    if (collection) filter.collection = { $regex: collection, $options: "i" };
    if (submenuName) filter.subcategory = { $regex: submenuName, $options: "i" };
    else if (menuLink) {
      const parts = menuLink.split("/").filter(Boolean);
      if (parts.length > 1) filter.subcategory = { $regex: parts[parts.length - 1].replace(/-/g, " "), $options: "i" };
    }
    const products = await Product.find(filter).sort({ createdAt: -1 });
    return res.json({ success: true, data: products, count: products.length });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    return res.json({ success: true, data: product });
  } catch {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productName, details, sku, collection, category, subcategory } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    const files = req.files?.length > 0 ? req.files : req.file ? [req.file] : [];
    if (files.length > 0) {
      // Delete old images
      const oldKeys = product.imagePublicIds?.length > 0 ? product.imagePublicIds : product.imagePublicId ? [product.imagePublicId] : [];
      for (const key of oldKeys) await deleteFromR2(key);

      const uploadResults = [];
      for (const file of files) {
        const result = await uploadToR2(file.buffer, file.mimetype);
        uploadResults.push(result);
      }
      product.image = uploadResults[0].url;
      product.imagePublicId = uploadResults[0].key;
      product.images = uploadResults.map((r) => r.url);
      product.imagePublicIds = uploadResults.map((r) => r.key);
    }

    if (productName !== undefined) product.productName = productName.trim();
    if (details !== undefined) product.details = details.trim();
    if (sku !== undefined) product.sku = sku.trim();
    if (collection !== undefined) product.collection = collection?.trim() || undefined;
    if (category !== undefined) product.category = category?.trim() || undefined;
    if (subcategory !== undefined) product.subcategory = subcategory?.trim() || undefined;

    await product.save();
    return res.json({ success: true, message: "✅ Product updated", data: product });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ success: false, message: "SKU already exists" });
    return res.status(500).json({ success: false, message: "Update failed", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    const keys = product.imagePublicIds?.length > 0 ? product.imagePublicIds : product.imagePublicId ? [product.imagePublicId] : [];
    for (const key of keys) await deleteFromR2(key);
    await Product.deleteOne({ _id: product._id });
    return res.json({ success: true, message: "🗑️ Product deleted" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Deletion failed", error: error.message });
  }
};

export const bulkUploadProducts = async (req, res) => {
  try {
    const { products } = req.body;
    if (!Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: "Products array is required" });
    }
<<<<<<< HEAD
    const results = [], errors = [];
    for (const item of products) {
      try {
        const productName = item["Product Name"]?.trim();
        const sku = item["SKU"]?.trim();
        const details = item["Description"]?.trim();
        const collection = item["Collection"]?.trim();
        const category = item["Category"]?.trim();
        const subcategory = item["Subcategory"]?.trim();
        if (!productName || !sku || !details) { errors.push({ row: item, error: "Missing required fields" }); continue; }

        const rawUrls = [item["Image URL"], item["Image URL 2"], item["Image URL 3"]].filter(Boolean);
        if (rawUrls.length === 0) { errors.push({ row: item, error: "At least one Image URL required" }); continue; }

        const imageUrls = [], imagePublicIds = [];
        for (const imgUrl of rawUrls) {
=======

    const results = [];
    const errors = [];

    const normalizeKey = (key) =>
      String(key || "")
        .trim()
        .toLowerCase()
        .replace(/[\s_-]+/g, "");

    const getValueByAliases = (row, aliases = []) => {
      const entries = Object.entries(row || {});
      const aliasSet = new Set(aliases.map((a) => normalizeKey(a)));
      for (const [key, value] of entries) {
        if (aliasSet.has(normalizeKey(key))) return value;
      }
      return undefined;
    };

    const cleanString = (value) => (value === undefined || value === null ? "" : String(value).trim());

    for (let index = 0; index < products.length; index += 1) {
      const item = products[index];
      try {
        const productName = cleanString(
          getValueByAliases(item, ["Product Name", "ProductName", "Name"])
        );
        const sku = cleanString(getValueByAliases(item, ["SKU", "Sku"]));
        const details = cleanString(
          getValueByAliases(item, ["Description", "Details", "Product Description"])
        );
        const collection = cleanString(getValueByAliases(item, ["Collection"]));
        const category = cleanString(getValueByAliases(item, ["Category"]));
        const subcategory = cleanString(getValueByAliases(item, ["Subcategory", "Sub Category"]));
        const imageUrl = cleanString(getValueByAliases(item, ["Image URL", "ImageURL", "Image Url 1"]));
        const imageUrl2 = cleanString(getValueByAliases(item, ["Image URL 2", "ImageURL2", "Image Url 2"]));
        const imageUrl3 = cleanString(getValueByAliases(item, ["Image URL 3", "ImageURL3", "Image Url 3"]));

        // Skip fully empty rows
        if (!productName && !sku && !details && !imageUrl && !imageUrl2 && !imageUrl3) {
          continue;
        }

        if (!productName || !sku || !details) {
          errors.push({
            rowNumber: index + 2,
            row: item,
            error: "Missing required fields (Product Name, SKU, Description)",
          });
          continue;
        }

        // Collect all image URLs (filter out empty ones and handle different column name formats)
        // Support both "Image URL" and "Image URL 2" format, and also handle undefined/null
        const allImageUrls = [
          imageUrl || cleanString(item["Image URL"]) || cleanString(item["imageUrl"]) || cleanString(item["image_url"]),
          imageUrl2 || cleanString(item["Image URL 2"]) || cleanString(item["imageUrl2"]) || cleanString(item["image_url_2"]),
          imageUrl3 || cleanString(item["Image URL 3"]) || cleanString(item["imageUrl3"]) || cleanString(item["image_url_3"]),
        ].filter(url => url && typeof url === "string" && url.trim() !== "");

        if (allImageUrls.length === 0) {
          errors.push({ rowNumber: index + 2, row: item, error: "At least one Image URL is required" });
          continue;
        }

        // Upload all images to Cloudinary
        const uploadFromBuffer = (fileBuffer) =>
          new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
              {
                folder: "vinayak_jewellers",
                resource_type: "image",
              },
              (error, result) => {
                if (error) return reject(error);
                return resolve(result);
              }
            );
            streamifier.createReadStream(fileBuffer).pipe(stream);
          });

        const imageUrlsArray = [];
        const imagePublicIdsArray = [];

        for (const imgUrl of allImageUrls) {
>>>>>>> eac7fb1a4f1a12ad060d00b0379f7bf49d7cb1ed
          try {
            const resp = await axios.get(imgUrl, { responseType: "arraybuffer", timeout: 30000 });
            const mimeType = resp.headers["content-type"] || "image/jpeg";
            const result = await uploadToR2(Buffer.from(resp.data), mimeType);
            imageUrls.push(result.url);
            imagePublicIds.push(result.key);
          } catch (e) { console.error(`Image upload failed: ${imgUrl}`, e.message); }
        }
        if (imageUrls.length === 0) { errors.push({ row: item, error: "Failed to upload any images" }); continue; }

<<<<<<< HEAD
=======
        // If no images were successfully uploaded, skip this product
        if (imageUrlsArray.length === 0) {
          errors.push({ rowNumber: index + 2, row: item, error: "Failed to upload any images" });
          continue;
        }

        // Normalize and trim string fields
        const normalizedCollection = collection ? collection.trim() : "";
        const normalizedCategory = category ? category.trim() : "";
        const normalizedSubcategory = subcategory ? subcategory.trim() : "";

        // Create product in database with multiple images
>>>>>>> eac7fb1a4f1a12ad060d00b0379f7bf49d7cb1ed
        const product = await Product.create({
          productName, details, sku,
          image: imageUrls[0], imagePublicId: imagePublicIds[0],
          images: imageUrls, imagePublicIds,
          collection: collection || undefined, category: category || undefined, subcategory: subcategory || undefined,
        });
        results.push(product);
      } catch (err) {
<<<<<<< HEAD
        errors.push({ row: item, error: err?.code === 11000 ? "SKU already exists" : err.message });
=======
        if (err?.code === 11000) {
          errors.push({ rowNumber: index + 2, row: item, error: "SKU already exists" });
        } else {
          errors.push({ rowNumber: index + 2, row: item, error: err.message });
        }
>>>>>>> eac7fb1a4f1a12ad060d00b0379f7bf49d7cb1ed
      }
    }
    return res.json({ success: true, count: results.length, errors: errors.length ? errors : undefined, message: `Uploaded ${results.length} products${errors.length ? `, ${errors.length} failed` : ""}` });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Bulk upload failed", error: error.message });
  }
};

export const uploadProductJson = async (req, res) => {
  try {
    let { productName, details, sku, imageUrl, imageBase64, mimeType, collection, category, subcategory } = req.body || {};
    if (productName) productName = productName.trim();
    if (details) details = details.trim();
    if (sku) sku = sku.trim();
    if (!productName || !details || !sku) return res.status(400).json({ success: false, message: "productName, details and sku are required" });
    if (!imageUrl && !imageBase64) return res.status(400).json({ success: false, message: "Provide either imageUrl or imageBase64" });

    let buffer, mime;
    if (imageUrl) {
      const resp = await axios.get(imageUrl, { responseType: "arraybuffer", timeout: 30000 });
      buffer = Buffer.from(resp.data);
      mime = resp.headers["content-type"] || "image/jpeg";
    } else {
      const base64Data = imageBase64.startsWith("data:") ? imageBase64.split(",")[1] : imageBase64;
      buffer = Buffer.from(base64Data, "base64");
      mime = mimeType || "image/jpeg";
    }

    const result = await uploadToR2(buffer, mime);
    const product = await Product.create({
      productName, details, sku,
      image: result.url, imagePublicId: result.key,
      collection: collection?.trim() || undefined,
      category: category?.trim() || undefined,
      subcategory: subcategory?.trim() || undefined,
    });
    return res.status(201).json({ success: true, message: "✅ Product uploaded successfully!", data: product });
  } catch (error) {
    if (error?.code === 11000) return res.status(409).json({ success: false, message: "SKU already exists" });
    return res.status(500).json({ success: false, message: "Upload failed", error: error.message });
  }
};
