import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import connectDB from "../config/db.js";
import Category from "../models/Category.js";

// Get the directory of the current file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load .env from the backend root directory
const envPath = join(__dirname, "..", ".env");
const result = dotenv.config({ path: envPath });

if (result.error) {
  console.error(`❌ Error loading .env file from: ${envPath}`);
  process.exit(1);
}

// Categories data from frontend
const categoriesData = {
  "Gold": [
    { category: "Neckwear", subcategories: ["Gold Chains", "Necklaces", "Mangalsutras"] },
    { category: "Earrings", subcategories: [] },
    { category: "Rings", subcategories: [] },
    { category: "Bangles / Bracelets", subcategories: ["Plain Bangles", "Kadas", "Bracelets"] },
    { category: "Anklets & Toe Rings", subcategories: [] },
    { category: "Pendants & Lockets", subcategories: [] },
    { category: "Nose Pins / Nose Rings", subcategories: [] },
  ],
  "Silver": [
    { category: "Neckwear", subcategories: ["Silver Chains", "Necklaces", "Mangalsutras, Pendants & Lockets"] },
    { category: "Earrings", subcategories: [] },
    { category: "Rings", subcategories: [] },
    { category: "Bangles / Bracelets", subcategories: ["Plain Bangles", "Cuffs", "Bracelets"] },
    { category: "Anklets & Toe Rings", subcategories: [] },
    { category: "Nose Pins", subcategories: [] },
    { category: "Kamarbandh/ Satka", subcategories: [] },
    { category: "Watches", subcategories: [] },
    { category: "Mozonightns", subcategories: [] },
  ],
  "Diamond": [
    { category: "Necklace", subcategories: [] },
    { category: "Bangles/Bracelets", subcategories: [] },
    { category: "Rings", subcategories: [] },
    { category: "Nose Pins", subcategories: [] },
    { category: "Pendants & Lockets", subcategories: [] },
    { category: "Earrings", subcategories: [] },
  ],
  "Wedding Collection": [
    { category: "Traditional Gold", subcategories: [] },
    { category: "Traditional Silver", subcategories: [] },
    { category: "Hamel", subcategories: [] },
  ],
  "Gifting": [
    { category: "Gold Articles", subcategories: [] },
    { category: "Silver Articles", subcategories: [] },
    { category: "Coins", subcategories: ["Gold Coins", "Silver Coins"] },
  ],
  "Birth Stones": [
    { category: "Rashi Ratan", subcategories: [] },
    { category: "Emerald", subcategories: [] },
    { category: "PukhRaj", subcategories: [] },
  ],
  "Coins": [
    { category: "Gold Coins", subcategories: [] },
    { category: "Silver Coins", subcategories: [] },
  ],
};

async function seedCategories() {
  try {
    console.log("📁 Loading .env from:", envPath);
    await connectDB();
    console.log("✅ Connected to database");

    let added = 0;
    let skipped = 0;

    for (const [collection, categories] of Object.entries(categoriesData)) {
      console.log(`\n📦 Processing collection: ${collection}`);
      
      for (const catData of categories) {
        try {
          // Check if category already exists
          const existing = await Category.findOne({
            collection: collection,
            category: catData.category,
          });

          if (existing) {
            console.log(`   ⏭️  Skipped: ${catData.category} (already exists)`);
            skipped++;
            continue;
          }

          // Create new category
          await Category.create({
            collection: collection,
            category: catData.category,
            subcategories: catData.subcategories || [],
          });

          console.log(`   ✅ Added: ${catData.category}${catData.subcategories.length > 0 ? ` (${catData.subcategories.length} subcategories)` : ""}`);
          added++;
        } catch (error) {
          if (error.code === 11000) {
            console.log(`   ⏭️  Skipped: ${catData.category} (duplicate)`);
            skipped++;
          } else {
            console.error(`   ❌ Error adding ${catData.category}:`, error.message);
          }
        }
      }
    }

    console.log(`\n✅ Seeding completed!`);
    console.log(`   Added: ${added} categories`);
    console.log(`   Skipped: ${skipped} categories (already exist)`);
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding categories:", error);
    process.exit(1);
  }
}

seedCategories();

