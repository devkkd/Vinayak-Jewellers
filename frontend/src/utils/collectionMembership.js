import { normalizeSegment } from "./productFilter";

/** Silver frames / coins that belong on both Gifting and Coins pages */
export function isGiftingAndCoinsSharedProduct(product) {
  const name = (product.productName || "").toLowerCase();
  const cat = (product.category || "").toLowerCase();
  const sub = (product.subcategory || "").toLowerCase();
  const coll = (product.collection || "").toLowerCase();
  const details = (product.details || "").toLowerCase();
  const blob = `${name} ${cat} ${sub} ${details}`;

  if (!["gifting", "coins"].includes(coll) && !cat.includes("coin") && !sub.includes("coin")) {
    return false;
  }

  if (/\bcoins?\b/.test(blob)) return true;
  if (/\bsilver\s+frame/.test(blob)) return true;
  if (/\bfine\s+silver/.test(blob) && /\bframe/.test(blob)) return true;
  if (/\b999/.test(blob) && /\bsilver/.test(blob)) return true;
  if (cat.includes("coin") || sub.includes("coin")) return true;
  if (/\b(gold|silver)\s+coins?\b/.test(blob)) return true;

  return false;
}

export function productBelongsToCollection(product, collectionName) {
  const target = normalizeSegment(collectionName);
  const primary = normalizeSegment(product.collection);
  const extra = (product.collections || []).map((c) => normalizeSegment(c));

  if (primary === target) return true;
  if (extra.includes(target)) return true;

  if (
    (target === "gifting" || target === "coins") &&
    isGiftingAndCoinsSharedProduct(product)
  ) {
    return (
      primary === "gifting" ||
      primary === "coins" ||
      extra.includes("gifting") ||
      extra.includes("coins")
    );
  }

  return false;
}

export function dedupeProducts(products) {
  const seen = new Set();
  return products.filter((p) => {
    const id = p._id?.toString() || p.sku;
    if (!id || seen.has(id)) return false;
    seen.add(id);
    return true;
  });
}

/** Load products for a collection page (API includes Gifting ↔ Coins cross-list) */
export async function fetchCollectionProducts(listBackendProducts, collectionName) {
  return listBackendProducts({ collection: collectionName });
}
