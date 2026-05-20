/** Strict product type matching for collection pages */

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

function isRingTypeLabel(label) {
  const n = normalizeSegment(label);
  return n === "ring" || n === "rings";
}

/** Match ring products: Rings, Ring, Gold Rings, etc. (not nose/toe rings) */
function fieldMatchesRingType(fieldValue) {
  const f = normalizeSegment(fieldValue);
  if (!f) return false;
  if (f === "ring" || f === "rings") return true;
  if (/\b(toe|nose)\b/.test(f) && /\bring/.test(f)) return false;
  if (/\b(gold|silver|diamond|mens|men|women|ladies)\s+rings?\b/.test(f)) return true;
  if (/\bengagement\s+rings?\b/.test(f) || /\bwedding\s+rings?\b/.test(f)) return true;
  if (/\brings?\b/.test(f) && !/\b(toe|nose)\b/.test(f)) return true;
  return false;
}

function fieldMatchesJewelryType(fieldValue, canonicalType) {
  const v = String(fieldValue || "").trim();
  if (!v) return false;
  if (segmentsMatch(v, canonicalType)) return true;
  if (isRingTypeLabel(canonicalType) && fieldMatchesRingType(v)) return true;
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

export function resolveCanonicalType(categories, urlSegment) {
  if (!urlSegment) return "";
  let resolved = "";
  if (categories?.length) {
    resolved = resolveTypeFromCategories(categories, urlSegment);
  }
  if (!resolved) resolved = fallbackTypeFromSlug(urlSegment);
  return preferParentTypeLabel(categories, resolved);
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
  const siblings = siblingTypeLabels(categoryRows);

  if (fieldMatchesJewelryType(sub, canonicalType)) return true;

  if (fieldMatchesJewelryType(cat, canonicalType)) {
    if (sub) {
      const subIsOtherType =
        !fieldMatchesJewelryType(sub, canonicalType) &&
        siblings.some(
          (label) =>
            fieldMatchesJewelryType(sub, label) &&
            !fieldMatchesJewelryType(label, canonicalType)
        );
      if (subIsOtherType) return false;
    }
    return true;
  }

  return false;
}

export function filterCollectionProducts(
  products,
  { collectionName, canonicalType, categoryRows }
) {
  const collection = normalizeSegment(collectionName);
  return products.filter((product) => {
    if (normalizeSegment(product.collection) !== collection) return false;
    if (canonicalType) {
      return productMatchesCanonicalType(product, canonicalType, categoryRows);
    }
    return true;
  });
}
