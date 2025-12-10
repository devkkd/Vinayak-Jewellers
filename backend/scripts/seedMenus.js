import mongoose from "mongoose";
import dotenv from "dotenv";
import Menu from "../models/Menu.js";
import connectDB from "../config/db.js";

dotenv.config();

const seedMenus = async () => {
  try {
    await connectDB();

    // Clear existing menus
    await Menu.deleteMany({});
    console.log("✅ Cleared existing menus");

    // Seed menu data based on Header.jsx structure
    const menus = [
      {
        name: "Home",
        link: "/",
        icon: "/images/Icon/menu-icons/Essential/home.png",
        order: 0,
        hasNestedStructure: false,
        sub: [],
        nestedSub: [],
      },
      {
        name: "Collections",
        link: "/alljewellery",
        icon: "/images/Icon/menu-icons/Group 16.png",
        order: 1,
        hasNestedStructure: false,
        sub: [
          { name: "Gold Wedding", link: "/silver/coins" },
          { name: "Gold Traditional ", link: "/silver/chains" },
          { name: "Gold rajasthani collection  ", link: "/silver/chains" },
          { name: "Rose gold collection", link: "/silver/chains" },
          { name: "Diamond Wedding collection ", link: "/silver/chains" },
          { name: "Diamond Solitaire ", link: "/silver/chains" },
          { name: "Silver Utensils ", link: "/silver/chains" },
          { name: "Silver traditional jewellery ", link: "/silver/chains" },
          { name: "Silver fancy jewellery ", link: "/silver/chains" },
          { name: "Gift Collection", link: "/silver/chains" },
        ],
        nestedSub: [],
      },
      {
        name: "Gold",
        link: "/gold",
        icon: "/images/Icon/menu-icons/Group 56251.png",
        order: 2,
        hasNestedStructure: false,
        sub: [
          { name: "Ring", link: "/gold/rings" },
          { name: "Earrings", link: "/gold/bangles" },
          { name: "Necklace - 22 karat - 18 karat", link: "/gold/necklace" },
          { name: "Bangles", link: "/gold/necklace" },
          { name: "Mangalsutra", link: "/gold/necklace" },
          { name: "Chains", link: "/gold/necklace" },
          { name: "Bracelet", link: "/gold/necklace" },
          { name: "Pendal set", link: "/gold/necklace" },
          { name: "Pendant", link: "/gold/necklace" },
        ],
        nestedSub: [],
      },
      {
        name: "Diamond",
        link: "/diamond",
        icon: "/images/Icon/menu-icons/Vector.png",
        order: 3,
        hasNestedStructure: false,
        sub: [
          { name: "Ring", link: "/diamond/earrings" },
          { name: "Earrings", link: "/diamond/pendants" },
          { name: "Necklace", link: "/diamond/rings" },
          { name: "Bangles", link: "/diamond/rings" },
          { name: "Mangalsutra", link: "/diamond/rings" },
          { name: "Pendal set", link: "/diamond/rings" },
          { name: "Pendant", link: "/diamond/rings" },
          { name: "Men's ", link: "/diamond/rings" },
        ],
        nestedSub: [],
      },
      {
        name: "Silver",
        link: "/silver",
        icon: "/images/Icon/menu-icons/Group.png",
        order: 4,
        hasNestedStructure: false,
        sub: [
          { name: "Utensils", link: "/silver/utensils" },
          { name: "Anklets / payals", link: "/silver/anklets" },
          { name: "Kamar belt or satka", link: "/silver/kamar-belt" },
          { name: "Pooja articles", link: "/silver/pooja-articles" },
          { name: "Ring", link: "/silver/rings" },
          { name: "Earrings", link: "/silver/earrings" },
          { name: "Pendant", link: "/silver/pendants" },
          { name: "Chains", link: "/silver/chains" },
          { name: "Pendal set", link: "/silver/pendal-set" },
          { name: "Necklace", link: "/silver/necklaces" },
          { name: "Bangles", link: "/silver/bangles" },
          { name: "Bracelet", link: "/silver/bracelets" },
          { name: "Mangalsutra", link: "/silver/mangalsutra" },
          { name: "Watches", link: "/silver/watches" },
        ],
        nestedSub: [],
      },
      {
        name: "Mens",
        link: "/mens",
        icon: "/public/images/Icon/menu-icons/Users/profile.png",
        order: 5,
        hasNestedStructure: true,
        sub: [],
        nestedSub: [
          {
            category: "Gold",
            items: [
              { name: "Gold Rings", link: "/mens/gold-rings" },
              { name: "Gold Chains", link: "/mens/gold-chains" },
              { name: "Gold Kadas/Bracelet", link: "/mens/gold-bracelet" },
            ],
          },
          {
            category: "Silver",
            items: [
              { name: "Silver Rings", link: "/mens/silver-rings" },
              { name: "Silver Chains", link: "/mens/silver-chains" },
              { name: "Silver Kadas/Bracelet", link: "/mens/silver-bracelet" },
              { name: "Others", link: "/mens/silver-watches" },
            ],
          },
          {
            category: "Diamond",
            items: [
              { name: "Diamond Rings", link: "/mens/diamond-rings" },
              { name: "Diamond Bracelet", link: "/mens/diamond-bracelet" },
              { name: "Others", link: "/mens/silver-watches" },
            ],
          },
        ],
      },
      {
        name: "Coins",
        link: "/coins",
        icon: "/images/Icon/menu-icons/Group 56253.png",
        order: 6,
        hasNestedStructure: false,
        sub: [
          { name: "Gold", link: "/silver/coins" },
          { name: "Silver", link: "/silver/chains" },
        ],
        nestedSub: [],
      },
      {
        name: "Gifting",
        link: "/gifting",
        icon: "/images/Icon/menu-icons/Group 15.png",
        order: 7,
        hasNestedStructure: false,
        sub: [
          { name: "Starting from 250-500", link: "/silver/coins" },
          { name: "500-1000", link: "/silver/chains" },
          { name: "1k-2k", link: "/silver/chains" },
          { name: "2k-5k", link: "/silver/chains" },
          { name: "5k-10k", link: "/silver/chains" },
          { name: "10k-15k", link: "/silver/chains" },
          { name: "15k-20k", link: "/silver/chains" },
          { name: "20k or Above 20k", link: "/silver/chains" },
          { name: "Exclusive", link: "/silver/chains" },
        ],
        nestedSub: [],
      },
      {
        name: "Birth Stones",
        link: "/birthstones",
        icon: "/images/Icon/menu-icons/Group 56254.png",
        order: 8,
        hasNestedStructure: false,
        sub: [],
        nestedSub: [],
      },
    ];

    await Menu.insertMany(menus);
    console.log(`✅ Seeded ${menus.length} menu items`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding menus:", error);
    process.exit(1);
  }
};

seedMenus();


