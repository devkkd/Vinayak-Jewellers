import { listBackendProducts } from "../api/backendProductsAPI";
import { fetchCollectionPageProducts } from "./collectionMembership";

const PREFETCHED = new Set();

export function prefetchCollection(collectionName) {
  if (!collectionName || PREFETCHED.has(collectionName)) return;
  PREFETCHED.add(collectionName);
  fetchCollectionPageProducts(listBackendProducts, collectionName).catch(() => {
    PREFETCHED.delete(collectionName);
  });
}

const POPULAR = ["Gold", "Silver", "Diamond", "Gifting", "Mens"];

export function prefetchPopularCollections() {
  if (typeof window === "undefined") return;

  const run = () => {
    for (const name of POPULAR) prefetchCollection(name);
  };

  if ("requestIdleCallback" in window) {
    requestIdleCallback(run, { timeout: 5000 });
  } else {
    setTimeout(run, 2500);
  }
}

/** Map nav path → collection name for hover prefetch */
export function prefetchFromPath(path) {
  const map = {
    "/gold": "Gold",
    "/silver": "Silver",
    "/diamond": "Diamond",
    "/gifting": "Gifting",
    "/mens": "Mens",
    "/coins": "Coins",
    "/wedding": "Wedding Collection",
    "/birthstones": "Birth Stones",
  };
  const base = (path || "").split("/").slice(0, 2).join("/") || "/";
  const name = map[base];
  if (name) prefetchCollection(name);
}
