import cloudinary from "../config/cloudinary.js";
import Product from "../models/Product.js";
import streamifier from "streamifier";
import axios from "axios";

export const uploadProduct = async (req, res) => {
  try {
    let { productName, details, sku, collection, category, subcategory } = req.body;
    
    // Normalize and trim string fields
    if (productName) productName = productName.trim();
    if (details) details = details.trim();
    if (sku) sku = sku.trim();
    if (collection) collection = collection.trim();
    if (category) category = category.trim();
    if (subcategory) subcategory = subcategory.trim();

    if (!productName || !details || !sku) {
      return res.status(400).json({
        success: false,
        message: "productName, details and sku are required",
      });
    }

    // Support both single file (req.file) and multiple files (req.files)
    const files = req.files && req.files.length > 0 ? req.files : (req.file ? [req.file] : []);

    if (files.length === 0) {
      return res.status(400).json({ success: false, message: "At least one image file is required" });
    }

    console.log(`⏳ Uploading ${files.length} image(s) to Cloudinary...`);

    // Upload image to Cloudinary using buffer stream
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

    // Upload all files
    const uploadResults = [];
    for (const file of files) {
      const result = await uploadFromBuffer(file.buffer);
      uploadResults.push({
        url: result.secure_url,
        publicId: result.public_id,
      });
    }

    // Prepare product data with images array
    const imageUrls = uploadResults.map((r) => r.url);
    const imagePublicIds = uploadResults.map((r) => r.publicId);

    // For backward compatibility, also set single image fields
    const primaryImage = imageUrls[0];
    const primaryPublicId = imagePublicIds[0];

    // Save product details in MongoDB
    const product = await Product.create({
      productName,
      details,
      sku,
      image: primaryImage, // Legacy single image field
      imagePublicId: primaryPublicId, // Legacy single public id
      images: imageUrls, // New multiple images array
      imagePublicIds: imagePublicIds, // New multiple public ids array
      collection: collection || undefined,
      category: category || undefined,
      subcategory: subcategory || undefined,
    });

    console.log(`✅ Product uploaded: ${productName} | Collection: ${collection || 'N/A'} | Category: ${category || 'N/A'} | Subcategory: ${subcategory || 'N/A'}`);

    res.status(201).json({
      success: true,
      message: "✅ Product uploaded successfully!",
      data: product,
    });
  } catch (error) {
    console.error("❌ Upload error:", JSON.stringify(error, null, 2));

    // Propagate more helpful error codes when possible
    if (error?.http_code) {
      return res.status(error.http_code).json({
        success: false,
        message: error.message || "Cloudinary upload failed",
      });
    }

    // Mongoose duplicate key error (e.g., unique sku)
    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Product with this SKU already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};

export const listProducts = async (req, res) => {
  try {
    // Extract query parameters for filtering
    const { collection, category, subcategory } = req.query;
    
    // Build filter object
    const filter = {};
    
    if (collection) {
      // Case-insensitive matching for collection
      filter.collection = { $regex: collection, $options: "i" };
    }
    
    if (category) {
      // Case-insensitive matching for category
      filter.category = { $regex: category, $options: "i" };
    }
    
    if (subcategory) {
      // Case-insensitive matching for subcategory
      filter.subcategory = { $regex: subcategory, $options: "i" };
    }
    
    const products = await Product.find(filter).sort({ createdAt: -1 });
    res.json({ 
      success: true, 
      data: products,
      count: products.length,
      filters: { collection, category, subcategory }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch products", error: error.message });
  }
};

export const searchProducts = async (req, res) => {
  try {
    const { q } = req.query; // Search query parameter
    
    if (!q || q.trim() === "") {
      return res.status(400).json({ 
        success: false, 
        message: "Search query is required" 
      });
    }

    const searchTerm = q.trim();
    
    // Case-insensitive search across productName, category, subcategory, and collection
    const products = await Product.find({
      $or: [
        { productName: { $regex: searchTerm, $options: "i" } },
        { category: { $regex: searchTerm, $options: "i" } },
        { subcategory: { $regex: searchTerm, $options: "i" } },
        { collection: { $regex: searchTerm, $options: "i" } },
        { details: { $regex: searchTerm, $options: "i" } },
      ],
    }).sort({ createdAt: -1 });

    res.json({ 
      success: true, 
      data: products,
      count: products.length 
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: "Search failed", 
      error: error.message 
    });
  }
};

// Get products by menu submenu item (by matching submenu name or link)
export const getProductsBySubmenu = async (req, res) => {
  try {
    const { submenuName, menuLink, collection } = req.query;
    
    if (!submenuName && !menuLink) {
      return res.status(400).json({
        success: false,
        message: "submenuName or menuLink query parameter is required",
      });
    }

    const filter = {};
    
    // If collection is provided, filter by it
    if (collection) {
      filter.collection = { $regex: collection, $options: "i" };
    }

    // Match subcategory by submenu name (case-insensitive)
    if (submenuName) {
      filter.subcategory = { $regex: submenuName, $options: "i" };
    }

    // If menuLink is provided, try to extract subcategory from it
    // e.g., /gold/rings -> "rings"
    if (menuLink && !submenuName) {
      const parts = menuLink.split("/").filter((p) => p);
      if (parts.length > 1) {
        const possibleSubcategory = parts[parts.length - 1];
        filter.subcategory = { $regex: possibleSubcategory.replace(/-/g, " "), $options: "i" };
      }
    }

    const products = await Product.find(filter).sort({ createdAt: -1 });
    
    return res.json({
      success: true,
      data: products,
      count: products.length,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch products by submenu",
      error: error.message,
    });
  }
};

export const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });
    return res.json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Invalid id" });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const { productName, details, sku, collection, category, subcategory } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Support both single file (req.file) and multiple files (req.files)
    const files = req.files && req.files.length > 0 ? req.files : (req.file ? [req.file] : []);

    // If new images are uploaded, replace them on Cloudinary
    if (files.length > 0) {
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

      // Delete old images if we have public ids
      const oldPublicIds = product.imagePublicIds && product.imagePublicIds.length > 0 
        ? product.imagePublicIds 
        : (product.imagePublicId ? [product.imagePublicId] : []);
      
      for (const oldId of oldPublicIds) {
        try {
          await cloudinary.uploader.destroy(oldId);
        } catch (_e) {
          // ignore deletion error
        }
      }

      // Upload new images
      const uploadResults = [];
      for (const file of files) {
        const result = await uploadFromBuffer(file.buffer);
        uploadResults.push({
          url: result.secure_url,
          publicId: result.public_id,
        });
      }

      const imageUrls = uploadResults.map((r) => r.url);
      const imagePublicIds = uploadResults.map((r) => r.publicId);

      // Update both single and multiple image fields
      product.image = imageUrls[0];
      product.imagePublicId = imagePublicIds[0];
      product.images = imageUrls;
      product.imagePublicIds = imagePublicIds;
    }

    if (productName !== undefined) product.productName = productName.trim();
    if (details !== undefined) product.details = details.trim();
    if (sku !== undefined) product.sku = sku.trim();
    if (collection !== undefined) product.collection = collection ? collection.trim() : undefined;
    if (category !== undefined) product.category = category ? category.trim() : undefined;
    if (subcategory !== undefined) product.subcategory = subcategory ? subcategory.trim() : undefined;

    await product.save();
    return res.json({ success: true, message: "✅ Product updated", data: product });
  } catch (error) {
    if (error?.code === 11000) {
      return res.status(409).json({ success: false, message: "Product with this SKU already exists" });
    }
    return res.status(500).json({ success: false, message: "Update failed", error: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ success: false, message: "Product not found" });

    // Delete all images from Cloudinary
    const publicIdsToDelete = product.imagePublicIds && product.imagePublicIds.length > 0 
      ? product.imagePublicIds 
      : (product.imagePublicId ? [product.imagePublicId] : []);

    for (const publicId of publicIdsToDelete) {
      try {
        await cloudinary.uploader.destroy(publicId);
      } catch (_e) {
        // ignore deletion error
      }
    }

    await Product.deleteOne({ _id: product._id });
    return res.json({ success: true, message: "🗑️ Product deleted" });
  } catch (error) {
    return res.status(400).json({ success: false, message: "Deletion failed", error: error.message });
  }
};

export const bulkUploadProducts = async (req, res) => {
  try {
    const { products } = req.body;
    if (!products || !Array.isArray(products) || products.length === 0) {
      return res.status(400).json({ success: false, message: "Products array is required" });
    }

    const results = [];
    const errors = [];

    for (const item of products) {
      try {
        const {
          "Product Name": productName,
          SKU: sku,
          Description: details,
          Collection: collection,
          Category: category,
          Subcategory: subcategory,
          "Image URL": imageUrl,
          "Image URL 2": imageUrl2,
          "Image URL 3": imageUrl3,
        } = item;

        if (!productName || !sku || !details) {
          errors.push({ row: item, error: "Missing required fields (Product Name, SKU, Description)" });
          continue;
        }

        // Collect all image URLs (filter out empty ones and handle different column name formats)
        // Support both "Image URL" and "Image URL 2" format, and also handle undefined/null
        const allImageUrls = [
          imageUrl || item["Image URL"] || item["imageUrl"] || item["image_url"],
          imageUrl2 || item["Image URL 2"] || item["imageUrl2"] || item["image_url_2"],
          imageUrl3 || item["Image URL 3"] || item["imageUrl3"] || item["image_url_3"],
        ].filter(url => url && typeof url === "string" && url.trim() !== "");

        if (allImageUrls.length === 0) {
          errors.push({ row: item, error: "At least one Image URL is required" });
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
          try {
            const imageResponse = await axios.get(imgUrl, { 
              responseType: "arraybuffer",
              timeout: 30000, // 30 second timeout
              validateStatus: (status) => status >= 200 && status < 400
            });
            const imageBuffer = Buffer.from(imageResponse.data);
            const cloudinaryResult = await uploadFromBuffer(imageBuffer);
            imageUrlsArray.push(cloudinaryResult.secure_url);
            imagePublicIdsArray.push(cloudinaryResult.public_id);
          } catch (imgErr) {
            console.error(`Image upload failed for ${imgUrl}:`, imgErr.message);
            // Continue with other images even if one fails
            // Only add to errors if all images fail
          }
        }

        // If no images were successfully uploaded, skip this product
        if (imageUrlsArray.length === 0) {
          errors.push({ row: item, error: "Failed to upload any images" });
          continue;
        }

        // Normalize and trim string fields
        const normalizedCollection = collection ? collection.trim() : "";
        const normalizedCategory = category ? category.trim() : "";
        const normalizedSubcategory = subcategory ? subcategory.trim() : "";

        // Create product in database with multiple images
        const product = await Product.create({
          productName: productName.trim(),
          details: details.trim(),
          sku: sku.trim(),
          image: imageUrlsArray[0], // Primary image for backward compatibility
          imagePublicId: imagePublicIdsArray[0], // Primary public id for backward compatibility
          images: imageUrlsArray, // Multiple images array
          imagePublicIds: imagePublicIdsArray, // Multiple public ids array
          collection: normalizedCollection || undefined,
          category: normalizedCategory || undefined,
          subcategory: normalizedSubcategory || undefined,
        });

        results.push(product);
      } catch (err) {
        if (err?.code === 11000) {
          errors.push({ row: item, error: "SKU already exists" });
        } else {
          errors.push({ row: item, error: err.message });
        }
      }
    }

    return res.json({
      success: true,
      count: results.length,
      errors: errors.length > 0 ? errors : undefined,
      message: `Uploaded ${results.length} products${errors.length > 0 ? `, ${errors.length} failed` : ""}`,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Bulk upload failed", error: error.message });
  }
};

export const uploadProductJson = async (req, res) => {
  try {
    let { productName, details, sku, imageUrl, imageBase64, mimeType, collection, category, subcategory } = req.body || {};
    
    // Normalize and trim string fields
    if (productName) productName = productName.trim();
    if (details) details = details.trim();
    if (sku) sku = sku.trim();
    if (collection) collection = collection.trim();
    if (category) category = category.trim();
    if (subcategory) subcategory = subcategory.trim();

    if (!productName || !details || !sku) {
      return res.status(400).json({
        success: false,
        message: "productName, details and sku are required",
      });
    }

    if (!imageUrl && !imageBase64) {
      return res.status(400).json({
        success: false,
        message: "Provide either imageUrl or imageBase64",
      });
    }

    const options = { folder: "vinayak_jewellers", resource_type: "image" };

    let result;
    if (imageUrl) {
      // Upload by remote URL
      result = await cloudinary.uploader.upload(imageUrl, options);
    } else {
      // Accept a data URI or a raw base64 string
      const dataUri = imageBase64.startsWith("data:")
        ? imageBase64
        : `data:${mimeType || "image/jpeg"};base64,${imageBase64}`;
      result = await cloudinary.uploader.upload(dataUri, options);
    }

    const product = await Product.create({
      productName,
      details,
      sku,
      image: result.secure_url,
      imagePublicId: result.public_id,
      collection: collection || undefined,
      category: category || undefined,
      subcategory: subcategory || undefined,
    });

    return res.status(201).json({
      success: true,
      message: "✅ Product uploaded successfully!",
      data: product,
    });
  } catch (error) {
    console.error("❌ JSON Upload error:", JSON.stringify(error, null, 2));

    if (error?.http_code) {
      return res.status(error.http_code).json({
        success: false,
        message: error.message || "Cloudinary upload failed",
      });
    }

    if (error?.code === 11000) {
      return res.status(409).json({
        success: false,
        message: "Product with this SKU already exists",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Upload failed",
      error: error.message,
    });
  }
};
