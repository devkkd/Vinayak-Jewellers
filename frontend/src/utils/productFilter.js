/** Strict product type matching for collection pages */

import { productBelongsToCollection } from "./collectionMembership";

export function normalizeSegment(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/-/g, " ")
    .replace(/\//g, " ")
    .replace(/\s+/g, " ");
}

export function slugify(label) {
  return normalizeSegment(label).replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");
}

const COMMON_SLUG_ALIASES = {
  ring: "Ring",
  rings: "Ring",
  earring: "Earrings",
  earrings: "Earrings",
  bangle: "Bangles",
  bangles: "Bangles",
  chain: "Chains",
  chains: "Chains",
  bracelet: "Bracelet",
  mangalsutra: "Mangalsutra",
  pendant: "Pendant",
  "pendant-set": "Pendant set",
  "pendal-set": "Pendal set",
  neckwear: "Neckwear",
};

const GOLD_SLUG_ALIASES = {
  ...COMMON_SLUG_ALIASES,
  "pendant-set": "Pendal set",
  "pendal-set": "Pendal set",
  necklace: "Necklace - 22 karat - 18 karat",
  necklaces: "Necklace - 22 karat - 18 karat",
  "necklace-22-karat-18-karat": "Necklace - 22 karat - 18 karat",
};

const DIAMOND_SLUG_ALIASES = {
  ...COMMON_SLUG_ALIASES,
  ring: "Rings",
  rings: "Rings",
  necklace: "Necklaces",
  necklaces: "Necklaces",
  "pendant-set": "Pendant set",
  "pendal-set": "Pendant set",
  mens: "Men's",
  "men-s": "Men's",
};

const SILVER_SLUG_ALIASES = {
  ...COMMON_SLUG_ALIASES,
  utensils: "Utensils",
  utensil: "Utensils",
  "anklets-payals": "Anklets / payals",
  anklets: "Anklets / payals",
  payals: "Anklets / payals",
  "kamar-belt-or-satka": "Kamar belt or satka",
  "kamar-belt-or-katha": "Kamar belt or satka",
  "kamar-belt-or-kamarbandh": "Kamar belt or satka",
  "kamar-belt-or-kamar-bandh": "Kamar belt or satka",
  "kamar-belt": "Kamar belt or satka",
  kamarbandh: "Kamar belt or satka",
  "kamar-bandh": "Kamar belt or satka",
  satka: "Kamar belt or satka",
  katha: "Kamar belt or satka",
  "pooja-articles": "Pooja articles",
  watches: "Watches",
  watch: "Watches",
  bracelets: "Bracelet",
  "kadas-bracelet": "Bracelet",
  necklace: "Necklace",
  necklaces: "Necklace",
  "pendant-set": "Pendant set",
  "pendal-set": "Pendal set",
  pendants: "Pendant",
};

const GIFTING_SLUG_ALIASES = {
  "starting-from-250-500": "Starting from 250-500",
  "250-500": "Starting from 250-500",
  "500-1000": "500-1000",
  "1k-2k": "1k-2k",
  "2k-5k": "2k-5k",
  "5k-10k": "5k-10k",
  "10k-15k": "10k-15k",
  "15k-20k": "15k-20k",
  "20k-or-above-20k": "20k or Above 20k",
  exclusive: "Exclusive",
  gift: "Exclusive",
  "gift-collection": "Exclusive",
};

function slugAliasesForCollection(collectionName) {
  const c = normalizeSegment(collectionName);
  if (c === "gold") return GOLD_SLUG_ALIASES;
  if (c === "diamond") return DIAMOND_SLUG_ALIASES;
  if (c === "silver") return SILVER_SLUG_ALIASES;
  if (c === "gifting") return GIFTING_SLUG_ALIASES;
  return COMMON_SLUG_ALIASES;
}

export function isMensCategoryLabel(label) {
  const n = normalizeSegment(label);
  return n === "mens" || n === "men" || n === "men s" || n.includes("men's");
}

function fieldMatchesMensCategory(fieldValue) {
  return isMensCategoryLabel(fieldValue);
}

export function isLadiesJewelleryProduct(product) {
  if (isMensJewelleryProduct(product)) return false;
  if (fieldMatchesMensCategory(product.category)) return false;
  if (fieldMatchesMensCategory(product.subcategory)) return false;
  const name = (product.productName || "").toLowerCase();
  if (/\b(men'?s|mens|gents?|for men)\b/.test(name)) return false;
  return true;
}

export function productMatchesMensCategory(product) {
  return (
    isMensJewelleryProduct(product) ||
    fieldMatchesMensCategory(product.category) ||
    fieldMatchesMensCategory(product.subcategory) ||
    fieldMatchesMensCategory(product.productName)
  );
}

export function mergeCategoryRows(apiRows = [], adminRows = []) {
  const out = [];
  const seen = new Set();

  const add = (row) => {
    const key = normalizeSegment(row?.category);
    if (!key || seen.has(key)) return;
    seen.add(key);
    out.push({
      category: row.category,
      subcategories: [...(row.subcategories || [])],
    });
  };

  for (const row of adminRows) add(row);
  for (const row of apiRows) {
    const key = normalizeSegment(row?.category);
    if (!key) continue;
    const existing = out.find((r) => segmentsMatch(r.category, row.category));
    if (existing) {
      const subs = new Set([
        ...(existing.subcategories || []),
        ...(row.subcategories || []),
      ]);
      existing.subcategories = [...subs];
    } else {
      add(row);
    }
  }
  return out;
}

function labelsEquivalent(a, b) {
  if (segmentsMatch(a, b)) return true;
  const x = normalizeSegment(a);
  const y = normalizeSegment(b);
  if (
    (x.includes("pendal") || x.includes("pendant")) &&
    (y.includes("pendal") || y.includes("pendant"))
  ) {
    if (x.includes("set") || y.includes("set")) return x.includes("set") && y.includes("set");
    return true;
  }
  if (
    (x.includes("necklace") || x.includes("neckwear")) &&
    (y.includes("necklace") || y.includes("neckwear"))
  ) {
    return true;
  }
  if (
    (x.includes("kamar") || x.includes("satka") || x.includes("katha") || x.includes("kamarbandh")) &&
    (y.includes("kamar") || y.includes("satka") || y.includes("katha") || y.includes("kamarbandh"))
  ) {
    return true;
  }
  return false;
}

export function segmentsMatch(a, b) {
  const x = normalizeSegment(a);
  const y = normalizeSegment(b);
  if (!x || !y) return false;
  if (x === y) return true;
  const stripS = (s) => (s.endsWith("s") && s.length > 2 ? s.slice(0, -1) : s);
  return stripS(x) === stripS(y);
}

/** Skip nested row when sub is just plural/singular duplicate of parent (Rings → Ring) */
export function shouldShowNestedSubcategories(categoryRow) {
  const subs = (categoryRow?.subcategories || []).filter(Boolean);
  if (!subs.length) return false;
  if (subs.length === 1 && segmentsMatch(categoryRow.category, subs[0])) {
    return false;
  }
  return true;
}

export function isRingTypeLabel(label) {
  const n = normalizeSegment(label);
  return n === "ring" || n === "rings";
}

/** Mens subcategory labels (admin / nav) */
export const MENS_SUBCATEGORY_LABELS = [
  "Gold Rings",
  "Gold Chains",
  "Gold Kadas/Bracelet",
  "Silver Rings",
  "Silver Chains",
  "Silver Kadas/Bracelet",
  "Others",
  "Diamond Rings",
  "Diamond Bracelet",
  "Diamond Chains",
];

const MENS_PRODUCT_NAME_HINTS =
  /\b(signet|gents?|men'?s\b|mens\b|for\s+men|male\b|kada\b|lion\s+head|ashoka|brooch)\b/i;

export function productBelongsToMensCollection(product) {
  const primary = normalizeSegment(product.collection);
  const extra = (product.collections || []).map((c) => normalizeSegment(c));
  return primary === "mens" || primary === "men" || extra.includes("mens");
}

function fieldMatchesMensSubcategoryLabel(sub, cat, label) {
  if (segmentsMatch(sub, label) || segmentsMatch(cat, label)) return true;
  if (labelsEquivalent(sub, label) || labelsEquivalent(cat, label)) return true;
  const blob = normalizeSegment(`${sub} ${cat}`);
  const want = normalizeSegment(label);
  if (blob.includes(want)) return true;
  return want.split(" ").filter(Boolean).every((w) => blob.includes(w));
}

/** Product belongs in Mens section (collection, linked Mens, subcategory, or naming) */
export function isMensJewelleryProduct(product) {
  if (productBelongsToMensCollection(product)) return true;

  const sub = (product.subcategory || "").trim();
  const cat = (product.category || "").trim();
  const name = product.productName || "";
  const details = product.details || "";

  for (const label of MENS_SUBCATEGORY_LABELS) {
    if (label === "Others") continue;
    if (fieldMatchesMensSubcategoryLabel(sub, cat, label)) return true;
  }

  if (segmentsMatch(sub, "Others")) {
    const c = normalizeSegment(cat);
    if (c === "silver" || c === "diamond" || productBelongsToMensCollection(product)) {
      return true;
    }
  }

  if (MENS_PRODUCT_NAME_HINTS.test(name) || MENS_PRODUCT_NAME_HINTS.test(details)) {
    return true;
  }

  const blob = normalizeSegment(`${cat} ${sub} ${name}`);
  if (
    /\b(gold|silver|diamond)\s+(rings?|chains?|bracelets?|kadas?)\b/.test(blob) &&
    /\b(mens?|men|gents?|male|for men)\b/.test(blob)
  ) {
    return true;
  }

  const c = normalizeSegment(cat);
  if ((c === "gold" || c === "silver" || c === "diamond") && sub) {
    const subN = normalizeSegment(sub);
    if (
      /\b(ring|chain|kada|bracelet|brooch)\b/.test(subN) &&
      (/\b(mens?|men|gents?)\b/.test(subN) || MENS_PRODUCT_NAME_HINTS.test(name))
    ) {
      return true;
    }
  }

  return false;
}

const MENS_URL_SLUG_ALIASES = {
  "gold-bracelet": { parent: "Gold", label: "Gold Kadas/Bracelet" },
  "gold-kadas-bracelet": { parent: "Gold", label: "Gold Kadas/Bracelet" },
  "silver-bracelet": { parent: "Silver", label: "Silver Kadas/Bracelet" },
  "silver-kadas-bracelet": { parent: "Silver", label: "Silver Kadas/Bracelet" },
  "silver-others": { parent: "Silver", label: "Others" },
  "diamond-others": { parent: "Diamond", label: "Others" },
};

/** Resolve /mens/:slug → { parent, label } using merged category rows */
export function resolveMensUrlSubcategory(urlSlug, categoryRows = []) {
  if (!urlSlug) return null;
  const slug = slugify(urlSlug);
  if (MENS_URL_SLUG_ALIASES[slug]) return MENS_URL_SLUG_ALIASES[slug];

  for (const row of categoryRows) {
    const parentSlug = slugify(row.category);
    for (const sub of row.subcategories || []) {
      const subSlug = slugify(sub);
      if (subSlug === slug || segmentsMatch(sub, urlSlug)) {
        return { parent: row.category, label: sub };
      }
      const combined = `${parentSlug}-${subSlug}`;
      if (combined === slug) return { parent: row.category, label: sub };
    }
  }

  for (const label of MENS_SUBCATEGORY_LABELS) {
    if (slugify(label) === slug || segmentsMatch(label, urlSlug)) {
      const metal = normalizeSegment(label).split(" ")[0];
      const parent =
        metal === "gold" ? "Gold" : metal === "silver" ? "Silver" : metal === "diamond" ? "Diamond" : "";
      return { parent, label };
    }
  }

  return null;
}

/** Filter mens product against resolved subcategory (and optional parent metal) */
export function productMatchesMensSubcategory(product, subcategoryLabel, parentCategory = "") {
  if (!subcategoryLabel) return isMensJewelleryProduct(product);
  if (!isMensJewelleryProduct(product)) return false;

  const sub = (product.subcategory || "").trim();
  const cat = (product.category || "").trim();
  const name = (product.productName || "").trim();

  if (fieldMatchesMensSubcategoryLabel(sub, cat, subcategoryLabel)) {
    if (parentCategory && segmentsMatch(subcategoryLabel, "Others")) {
      return segmentsMatch(cat, parentCategory) || segmentsMatch(sub, parentCategory);
    }
    if (parentCategory) {
      return (
        segmentsMatch(cat, parentCategory) ||
        normalizeSegment(subcategoryLabel).startsWith(normalizeSegment(parentCategory))
      );
    }
    return true;
  }

  if (segmentsMatch(subcategoryLabel, "Others") && segmentsMatch(sub, "Others")) {
    if (!parentCategory) return true;
    return segmentsMatch(cat, parentCategory);
  }

  const want = normalizeSegment(subcategoryLabel);
  const blob = normalizeSegment(`${sub} ${cat} ${name}`);
  if (parentCategory && !normalizeSegment(blob).includes(normalizeSegment(parentCategory))) {
    if (!normalizeSegment(subcategoryLabel).startsWith(normalizeSegment(parentCategory))) {
      return false;
    }
  }
  if (blob.includes(want)) return true;
  return want.split(" ").filter(Boolean).every((w) => blob.includes(w));
}

export function isEarringTypeLabel(label) {
  const n = normalizeSegment(label);
  return n === "earring" || n === "earrings";
}

/** Match earring products: Earrings, Stud Earrings, Drop Earrings, Jhumka, etc. */
function fieldMatchesEarringType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (!f) return false;
  if (isEarringTypeLabel(f)) return true;
  if (/\bearrings?\b/.test(f) && !/\bnose\b/.test(f)) return true;
  return false;
}

/** Product belongs to a storefront collection (Gold, Silver, …) */
export function productInCollection(product, collectionName) {
  const target = normalizeSegment(collectionName);
  const coll = normalizeSegment(product.collection);
  const extra = (product.collections || []).map((c) => normalizeSegment(c));
  if (coll === target || extra.includes(target)) return true;
  if (coll === "wedding" && target === "wedding collection") return true;
  if (coll === "wedding collection" && target === "wedding") return true;
  return false;
}

/** Match type label on one field (category or subcategory string) */
function fieldMatchesCanonicalLabel(fieldValue, canonicalType) {
  const v = String(fieldValue || "").trim();
  if (!v) return false;
  return fieldMatchesJewelryType(v, canonicalType);
}

/**
 * If product has subcategory → match pill only on subcategory (+ name/details).
 * If no subcategory → match pill on category (+ name/details).
 */
function productMatchesTypeByTaxonomy(product, canonicalType, categoryRows) {
  const sub = (product.subcategory || "").trim();
  const cat = (product.category || "").trim();
  const name = (product.productName || "").trim();
  const details = (product.details || "").trim();

  if (sub) {
    if (fieldMatchesCanonicalLabel(sub, canonicalType)) return true;
    if (fieldMatchesCanonicalLabel(name, canonicalType)) return true;
    if (fieldMatchesCanonicalLabel(details, canonicalType)) return true;
    return false;
  }

  if (cat && fieldMatchesCanonicalLabel(cat, canonicalType)) return true;
  if (fieldMatchesCanonicalLabel(name, canonicalType)) return true;
  if (fieldMatchesCanonicalLabel(details, canonicalType)) return true;

  return false;
}

/** Match ring products: Rings, Ring, Gold Rings, etc. (not nose/toe rings) */
function fieldMatchesRingType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (!f) return false;
  if (/\bearrings?\b/.test(f)) return false;
  if (/\bbracelets?\b/.test(f)) return false;
  if (f === "ring" || f === "rings") return true;
  if (/\b(toe|nose)\b/.test(f) && /\bring/.test(f)) return false;
  if (/\b(gold|silver|diamond|mens|men|women|ladies)\s+rings?\b/.test(f)) return true;
  if (/\bengagement\s+rings?\b/.test(f) || /\bwedding\s+rings?\b/.test(f)) return true;
  if (/\brings?\b/.test(f) && !/\b(toe|nose)\b/.test(f)) return true;
  return false;
}

function isBangleTypeLabel(label) {
  return /\bbangles?\b/.test(normalizeSegment(label));
}

function fieldMatchesBangleType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (fieldMatchesNecklaceType(fieldValue)) return false;
  if (fieldMatchesRingType(fieldValue) || /\bearrings?\b/.test(f)) return false;
  return /\bbangles?\b/.test(f) || /\bkangan?\b/.test(f);
}

function isNecklaceTypeLabel(label) {
  const n = normalizeSegment(label);
  return (
    /\bnecklaces?\b/.test(n) ||
    /\bneckwear\b/.test(n) ||
    (/\bnecklace\b/.test(n) && /\b(22|18|karat)\b/.test(n))
  );
}

function fieldMatchesNecklaceType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (/\bbangles?\b/.test(f) || /\bkangan?\b/.test(f)) return false;
  if (fieldMatchesRingType(fieldValue) || /\bearrings?\b/.test(f)) return false;
  if (/\bneckwear\b/.test(f)) return true;
  if (/\bnecklaces?\b/.test(f)) return true;
  if (/\bnecklace\b/.test(f) && /\b(22|18|karat)\b/.test(f)) return true;
  if (/\bnecklace\b/.test(f)) return true;
  return false;
}

function isPendantTypeLabel(label) {
  const n = normalizeSegment(label);
  return n.includes("pendant") || n.includes("pendal");
}

function isPendantSetTypeLabel(label) {
  const n = normalizeSegment(label);
  return isPendantTypeLabel(label) && /\bset\b/.test(n);
}

function isPendantOnlyTypeLabel(label) {
  const n = normalizeSegment(label);
  return isPendantTypeLabel(label) && !/\bset\b/.test(n);
}

function fieldMatchesPendantSetType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (!/\b(pendal|pendant)/.test(f)) return false;
  return (
    /\bset\b/.test(f) ||
    /\bpendal\s+set\b/.test(f) ||
    /\bpendant\s+set\b/.test(f) ||
    /\bpendants?\s+set\b/.test(f)
  );
}

function fieldMatchesPendantOnlyType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (fieldMatchesPendantSetType(fieldValue)) return false;
  return /\bpendal\b|\bpendants?\b/.test(f);
}

function fieldMatchesPendantType(fieldValue, wantSet = false) {
  if (wantSet) return fieldMatchesPendantSetType(fieldValue);
  return fieldMatchesPendantOnlyType(fieldValue);
}

function isChainTypeLabel(label) {
  return /\bchains?\b/.test(normalizeSegment(label));
}

function fieldMatchesChainType(fieldValue) {
  return /\bchains?\b/.test(normalizeSegment(fieldValue));
}

function isBraceletTypeLabel(label) {
  const n = normalizeSegment(label);
  return /\bbracelets?\b/.test(n) || /\bkada\b/.test(n);
}

function fieldMatchesBraceletType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (/\bbracelets?\b/.test(f) || /\bkadas?\b/.test(f)) return true;
  if (/\bearrings?\b/.test(f)) return false;
  return false;
}

function isKamarBeltTypeLabel(label) {
  const n = normalizeSegment(label);
  return (
    /\bkamarbandh?\b/.test(n) ||
    /\bkamar\s*bandh?\b/.test(n) ||
    /\b(kamar|satka|katha|waist\s+belt)\b/.test(n)
  );
}

function fieldMatchesKamarBeltType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (fieldMatchesRingType(fieldValue) || /\bearrings?\b/.test(f)) return false;
  if (/\bkamarbandh?\b/.test(f) || /\bkamar\s*bandh?\b/.test(f)) return true;
  if (/\b(kamar|satka|katha)\b/.test(f)) return true;
  if (/\bwaist\s+belt\b/.test(f)) return true;
  if (/\bbelt\b/.test(f) && /\b(kamar|satka|katha|waist)\b/.test(f)) return true;
  return false;
}

/** Ring products must not appear under other jewellery type tabs */
function isClearlyRingProduct(product) {
  const sub = (product.subcategory || "").trim();
  const cat = (product.category || "").trim();
  const name = (product.productName || "").trim();
  if (fieldMatchesBraceletType(sub) || fieldMatchesBraceletType(cat)) return false;
  if (fieldMatchesRingType(sub) || fieldMatchesRingType(cat)) return true;
  const n = normalizeSegment(name);
  if (/\bbracelets?\b/.test(n) || /\bkadas?\b/.test(n)) return false;
  if (/\bearrings?\b/.test(n)) return false;
  if (/\brings?\b/.test(n) && !/\b(toe|nose|bracelet)\b/.test(n)) return true;
  return false;
}

function canonicalIsRingOrEarring(canonicalType) {
  return isRingTypeLabel(canonicalType) || isEarringTypeLabel(canonicalType);
}

function canonicalIsNecklaceType(canonicalType) {
  return isNecklaceTypeLabel(canonicalType);
}

/** Necklace products must not appear under Bangles, Rings, etc. */
function isClearlyNecklaceProduct(product) {
  const sub = (product.subcategory || "").trim();
  const cat = (product.category || "").trim();
  const name = (product.productName || "").trim();
  const details = (product.details || "").trim();
  if (fieldMatchesNecklaceType(sub) || fieldMatchesNecklaceType(cat)) return true;
  if (fieldMatchesNecklaceType(name) || fieldMatchesNecklaceType(details)) return true;
  return false;
}

function canonicalIsMangalsutraType(canonicalType) {
  return isMangalsutraTypeLabel(canonicalType);
}

function canonicalIsPendantType(canonicalType) {
  return isPendantTypeLabel(canonicalType);
}

function isClearlyPendantSetProduct(product) {
  const sub = (product.subcategory || "").trim();
  const cat = (product.category || "").trim();
  const name = (product.productName || "").trim();
  const details = (product.details || "").trim();
  return (
    fieldMatchesPendantSetType(sub) ||
    fieldMatchesPendantSetType(cat) ||
    fieldMatchesPendantSetType(name) ||
    fieldMatchesPendantSetType(details)
  );
}

function isClearlySinglePendantProduct(product) {
  const sub = (product.subcategory || "").trim();
  const cat = (product.category || "").trim();
  const name = normalizeSegment(product.productName);
  if (isClearlyPendantSetProduct(product)) return false;
  if (fieldMatchesPendantOnlyType(sub) || fieldMatchesPendantOnlyType(cat)) return true;
  if ((/\bpendants?\b/.test(name) || /\bpendal\b/.test(name)) && !/\bset\b/.test(name)) {
    return true;
  }
  return false;
}

function isClearlyPendantOnlyProduct(product) {
  return isClearlySinglePendantProduct(product);
}

function isWrongTypeForCanonical(product, canonicalType) {
  if (!canonicalIsRingOrEarring(canonicalType) && isClearlyRingProduct(product)) return true;
  if (!canonicalIsNecklaceType(canonicalType) && isClearlyNecklaceProduct(product)) return true;
  if (isPendantSetTypeLabel(canonicalType) && isClearlySinglePendantProduct(product)) {
    return true;
  }
  if (isPendantOnlyTypeLabel(canonicalType) && isClearlyPendantSetProduct(product)) {
    return true;
  }
  if (!isPendantTypeLabel(canonicalType) && isClearlyPendantSetProduct(product)) return true;
  if (!isPendantTypeLabel(canonicalType) && isClearlySinglePendantProduct(product)) return true;
  return false;
}

function isMangalsutraTypeLabel(label) {
  return /\bmangalsutra\b/.test(normalizeSegment(label));
}

function fieldMatchesMangalsutraType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (!/\bmangalsutra\b/.test(f)) return false;
  if (/\bmangalsutra\b.*\bnecklaces?\b/.test(f) || /\bnecklaces?\b.*\bmangalsutra\b/.test(f)) {
    return false;
  }
  return true;
}

/** True mangalsutra — not pendant/necklace mis-tagged in title only */
function productQualifiesAsMangalsutra(product) {
  const sub = (product.subcategory || "").trim();
  const cat = (product.category || "").trim();
  const name = normalizeSegment(product.productName);
  const details = normalizeSegment(product.details || "");
  const blob = `${name} ${details}`;

  if (fieldMatchesMangalsutraType(sub) || fieldMatchesMangalsutraType(cat)) return true;

  if (!/\bmangalsutra\b/.test(name) && !/\bmangalsutra\b/.test(details)) return false;

  if (/\bnecklaces?\b/.test(name)) return false;
  if (/\bdrop\s+pendant\b/.test(name)) return false;
  if (/\bpendants?\b/.test(name) && !/\b(black bead|black beads|beaded|beads)\b/.test(blob)) {
    return false;
  }

  if (!/\b(black bead|black beads|beaded|beads)\b/.test(blob)) return false;

  return true;
}

function isUtensilTypeLabel(label) {
  return /\butensils?\b/.test(normalizeSegment(label));
}

function fieldMatchesUtensilType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (/\butensils?\b/.test(f)) return true;
  if (/\b(showpiece|show piece|home decor|vastu|elephant|decor)\b/.test(f)) return true;
  return false;
}

function isPoojaTypeLabel(label) {
  return /\b(pooja|puja)\b/.test(normalizeSegment(label));
}

function fieldMatchesPoojaType(fieldValue) {
  return /\b(pooja|puja|arti|diya|lamp|kalash|aarti)\b/.test(normalizeSegment(fieldValue));
}

function isAnkletTypeLabel(label) {
  const n = normalizeSegment(label);
  return n.includes("anklet") || n.includes("payal");
}

function fieldMatchesAnkletType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  return /\b(anklets?|payals?|payal)\b/.test(f);
}

function isWatchTypeLabel(label) {
  return /\bwatches?\b/.test(normalizeSegment(label));
}

function fieldMatchesWatchType(fieldValue) {
  return /\bwatches?\b/.test(normalizeSegment(fieldValue));
}

function isGiftingPriceLabel(label) {
  const n = normalizeSegment(label);
  return (
    n.includes("gift") ||
    n.includes("exclusive") ||
    /\d/.test(n) ||
    n.includes("starting")
  );
}

function fieldMatchesGiftingPriceType(fieldValue, canonicalType) {
  const f = normalizeSegment(fieldValue);
  const c = normalizeSegment(canonicalType);
  if (segmentsMatch(f, canonicalType) || labelsEquivalent(f, canonicalType)) return true;
  if (c && f.includes(c)) return true;
  if (/\bgift\b/.test(f) && /\bgift\b/.test(c)) return true;
  return false;
}

function fieldMatchesJewelryType(fieldValue, canonicalType) {
  const v = String(fieldValue || "").trim();
  if (!v) return false;
  if (segmentsMatch(v, canonicalType) || labelsEquivalent(v, canonicalType)) return true;
  if (isRingTypeLabel(canonicalType) && fieldMatchesRingType(v)) return true;
  if (isEarringTypeLabel(canonicalType) && fieldMatchesEarringType(v)) return true;
  if (isBangleTypeLabel(canonicalType) && fieldMatchesBangleType(v)) return true;
  if (isNecklaceTypeLabel(canonicalType) && fieldMatchesNecklaceType(v)) return true;
  if (isChainTypeLabel(canonicalType) && fieldMatchesChainType(v)) return true;
  if (isBraceletTypeLabel(canonicalType) && fieldMatchesBraceletType(v)) return true;
  if (isMangalsutraTypeLabel(canonicalType) && fieldMatchesMangalsutraType(v)) return true;
  if (isPendantTypeLabel(canonicalType)) {
    const wantSet = /\bset\b/.test(normalizeSegment(canonicalType));
    return fieldMatchesPendantType(v, wantSet);
  }
  if (isUtensilTypeLabel(canonicalType) && fieldMatchesUtensilType(v)) return true;
  if (isPoojaTypeLabel(canonicalType) && fieldMatchesPoojaType(v)) return true;
  if (isAnkletTypeLabel(canonicalType) && fieldMatchesAnkletType(v)) return true;
  if (isWatchTypeLabel(canonicalType) && fieldMatchesWatchType(v)) return true;
  if (isKamarBeltTypeLabel(canonicalType) && fieldMatchesKamarBeltType(v)) return true;
  if (isGiftingPriceLabel(canonicalType) && fieldMatchesGiftingPriceType(v, canonicalType)) {
    return true;
  }
  if (!canonicalIsRingOrEarring(canonicalType) && fieldMatchesRingType(v)) return false;
  if (!canonicalIsNecklaceType(canonicalType) && fieldMatchesNecklaceType(v)) return false;
  if (!canonicalIsMangalsutraType(canonicalType) && fieldMatchesMangalsutraType(v)) return false;
  if (isBangleTypeLabel(canonicalType) && fieldMatchesNecklaceType(v)) return false;
  return false;
}

/** Prefer parent label (Rings) when URL is ring/rings */
function preferParentTypeLabel(categories, resolved) {
  if (!resolved || !categories?.length) return resolved;
  if (!isRingTypeLabel(resolved)) return resolved;
  const parent = categories.find((c) => isRingTypeLabel(c.category));
  return parent?.category || resolved;
}

/** Find exact category/subcategory label from DB list using URL slug */
export function resolveTypeFromCategories(categories, urlSegment) {
  if (!urlSegment || !categories?.length) return "";
  const urlSlug = slugify(urlSegment);

  for (const cat of categories) {
    if (slugify(cat.category) === urlSlug || segmentsMatch(cat.category, urlSegment)) {
      return cat.category;
    }
    for (const sub of cat.subcategories || []) {
      if (slugify(sub) === urlSlug || segmentsMatch(sub, urlSegment)) {
        if (segmentsMatch(cat.category, sub)) return cat.category;
        return sub;
      }
    }
  }
  return "";
}

/** Title-case URL slug when category list has not loaded yet */
export function fallbackTypeFromSlug(urlSegment) {
  if (!urlSegment) return "";
  return normalizeSegment(urlSegment)
    .split(" ")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export function resolveCanonicalType(
  categories,
  urlSegment,
  adminRows = [],
  collectionName = ""
) {
  if (!urlSegment) return "";
  const merged = mergeCategoryRows(categories, adminRows);
  const slugKey = slugify(urlSegment);
  const aliases = slugAliasesForCollection(collectionName);

  let resolved = "";
  if (merged.length) {
    resolved = resolveTypeFromCategories(merged, urlSegment);
  }
  if (!resolved) {
    const alias = aliases[slugKey];
    if (alias) {
      resolved = resolveTypeFromCategories(merged, alias) || alias;
    }
  }
  if (!resolved) resolved = fallbackTypeFromSlug(urlSegment);
  return preferParentTypeLabel(merged, resolved);
}

/** Labels of top-level types in this collection (for sibling checks) */
function siblingTypeLabels(categoryRows) {
  const labels = [];
  for (const row of categoryRows || []) {
    if (row.category) labels.push(row.category);
    for (const sub of row.subcategories || []) {
      if (sub) labels.push(sub);
    }
  }
  return labels;
}

/**
 * Strict full-field match only (no token guessing).
 * - subcategory matches pill (Earrings, Necklaces, …)
 * - category matches pill when subcategory empty or same type
 * - skips category=Neckwear + subcategory=Bangles on Neckwear (wrong sibling sub)
 */
export function productMatchesCanonicalType(
  product,
  canonicalType,
  categoryRows = []
) {
  if (!canonicalType) return true;

  const sub = (product.subcategory || "").trim();
  const cat = (product.category || "").trim();
  const name = (product.productName || "").trim();
  const details = (product.details || "").trim();
  const siblings = siblingTypeLabels(categoryRows);

  if (isMensCategoryLabel(canonicalType)) {
    return productMatchesMensCategory(product);
  }

  if (isWrongTypeForCanonical(product, canonicalType)) {
    return false;
  }

  if (isKamarBeltTypeLabel(canonicalType)) {
    return (
      fieldMatchesKamarBeltType(sub) ||
      fieldMatchesKamarBeltType(cat) ||
      fieldMatchesKamarBeltType(name) ||
      fieldMatchesKamarBeltType(details)
    );
  }

  if (isBangleTypeLabel(canonicalType)) {
    return (
      fieldMatchesBangleType(sub) ||
      fieldMatchesBangleType(cat) ||
      fieldMatchesBangleType(name) ||
      fieldMatchesBangleType(details)
    );
  }

  if (isNecklaceTypeLabel(canonicalType)) {
    return (
      fieldMatchesNecklaceType(sub) ||
      fieldMatchesNecklaceType(cat) ||
      fieldMatchesNecklaceType(name) ||
      fieldMatchesNecklaceType(details)
    );
  }

  if (isMangalsutraTypeLabel(canonicalType)) {
    return productQualifiesAsMangalsutra(product);
  }

  if (isBraceletTypeLabel(canonicalType)) {
    return (
      fieldMatchesBraceletType(sub) ||
      fieldMatchesBraceletType(cat) ||
      fieldMatchesBraceletType(name) ||
      fieldMatchesBraceletType(details)
    );
  }

  if (isPendantSetTypeLabel(canonicalType)) {
    return (
      fieldMatchesPendantSetType(sub) ||
      fieldMatchesPendantSetType(cat) ||
      fieldMatchesPendantSetType(name) ||
      fieldMatchesPendantSetType(details) ||
      segmentsMatch(sub, canonicalType) ||
      segmentsMatch(cat, canonicalType) ||
      labelsEquivalent(sub, canonicalType) ||
      labelsEquivalent(cat, canonicalType)
    );
  }

  if (isPendantOnlyTypeLabel(canonicalType)) {
    return (
      fieldMatchesPendantOnlyType(sub) ||
      fieldMatchesPendantOnlyType(cat) ||
      fieldMatchesPendantOnlyType(name) ||
      fieldMatchesPendantOnlyType(details) ||
      segmentsMatch(sub, canonicalType) ||
      segmentsMatch(cat, canonicalType) ||
      labelsEquivalent(sub, canonicalType) ||
      labelsEquivalent(cat, canonicalType)
    );
  }

  return productMatchesTypeByTaxonomy(product, canonicalType, categoryRows);
}

export function filterCollectionProducts(
  products,
  { collectionName, canonicalType, categoryRows, useLinkedCollections = false }
) {
  const collection = normalizeSegment(collectionName);
  const ladiesCollections = ["gold", "silver", "diamond"];
  return products.filter((product) => {
    const inCollection = useLinkedCollections
      ? productBelongsToCollection(product, collectionName)
      : productInCollection(product, collectionName);
    if (!inCollection) return false;
    if (canonicalType) {
      if (!productMatchesCanonicalType(product, canonicalType, categoryRows)) {
        return false;
      }
      if (
        ladiesCollections.includes(collection) &&
        !isMensCategoryLabel(canonicalType) &&
        !isLadiesJewelleryProduct(product)
      ) {
        return false;
      }
      return true;
    }
    if (collection === "diamond" && !isLadiesJewelleryProduct(product)) {
      return false;
    }
    return true;
  });
}

/** All Jewellery page — same collection + type rules as dedicated pages */
export function filterAllJewelleryProducts(
  products,
  {
    selectedCategory,
    selectedSubcategory,
    selectedMainSubcategory,
    selectedNestedSubcategory,
    categoryRows = [],
  }
) {
  const activeSub =
    selectedNestedSubcategory || selectedSubcategory || selectedMainSubcategory || "";

  return products.filter((product) => {
    if (selectedCategory !== "All Jewellery") {
      if (!productInCollection(product, selectedCategory)) return false;
    }

    if (selectedCategory === "Mens" || selectedCategory === "Coins") {
      if (selectedMainSubcategory) {
        const main = normalizeSegment(selectedMainSubcategory);
        const cat = normalizeSegment(product.category);
        const sub = normalizeSegment(product.subcategory);
        if (cat !== main && !sub.includes(main) && !cat.includes(main)) return false;

        if (selectedNestedSubcategory) {
          const nested = normalizeSegment(selectedNestedSubcategory);
          if (
            sub !== nested &&
            !segmentsMatch(product.subcategory, selectedNestedSubcategory) &&
            !segmentsMatch(product.category, selectedNestedSubcategory)
          ) {
            return false;
          }
        }
      }
      return true;
    }

    if (activeSub) {
      if (
        !productMatchesCanonicalType(product, activeSub, categoryRows) &&
        !segmentsMatch(product.subcategory, activeSub) &&
        !segmentsMatch(product.category, activeSub)
      ) {
        return false;
      }

      const coll = normalizeSegment(selectedCategory);
      if (
        (coll === "gold" || coll === "silver" || coll === "diamond") &&
        !isMensCategoryLabel(activeSub) &&
        !isLadiesJewelleryProduct(product)
      ) {
        return false;
      }
    }

    return true;
  });
}

/** Map sidebar category → dedicated route */
export const COLLECTION_ROUTE_MAP = {
  Gold: "/gold",
  Silver: "/silver",
  Diamond: "/diamond",
  "Wedding Collection": "/wedding",
  Gifting: "/gifting",
  "Birth Stones": "/birthstones",
  Mens: "/mens",
  Coins: "/coins",
};

export function collectionSubcategoryPath(collectionName, subcategoryLabel) {
  const base = COLLECTION_ROUTE_MAP[collectionName];
  if (!base || !subcategoryLabel) return base || "/alljewellery";
  if (collectionName === "Mens") {
    return `${base}/${slugify(subcategoryLabel)}`;
  }
  return `${base}/${slugify(subcategoryLabel)}`;
}
