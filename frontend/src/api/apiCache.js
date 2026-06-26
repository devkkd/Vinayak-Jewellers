const DEFAULT_TTL_MS = 10 * 60 * 1000;
const SESSION_PREFIX = "vj_cache:";
const store = new Map();
const inflight = new Map();

export function cacheKey(prefix, params = {}) {
  return `${prefix}:${JSON.stringify(params)}`;
}

function loadFromSession(key) {
  try {
    const raw = sessionStorage.getItem(SESSION_PREFIX + key);
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (Date.now() > entry.expires) {
      sessionStorage.removeItem(SESSION_PREFIX + key);
      return null;
    }
    return entry.data;
  } catch {
    return null;
  }
}

function saveToSession(key, data, ttlMs) {
  try {
    const payload = JSON.stringify({ data, expires: Date.now() + ttlMs });
    if (payload.length > 800_000) return;
    sessionStorage.setItem(SESSION_PREFIX + key, payload);
  } catch {
    /* quota exceeded — memory cache still works */
  }
}

function getEntry(key) {
  const entry = store.get(key);
  if (entry && Date.now() <= entry.expires) return entry.data;

  const fromSession = loadFromSession(key);
  if (fromSession !== null) {
    store.set(key, { data: fromSession, expires: Date.now() + DEFAULT_TTL_MS });
    return fromSession;
  }
  return null;
}

export function peekCache(key) {
  const data = getEntry(key);
  return data !== null ? data : undefined;
}

export function setCache(key, data, ttlMs = DEFAULT_TTL_MS) {
  store.set(key, { data, expires: Date.now() + ttlMs });
  saveToSession(key, data, ttlMs);
}

export async function cachedFetch(key, fetcher, ttlMs = DEFAULT_TTL_MS) {
  const hit = getEntry(key);
  if (hit !== null) return hit;

  if (inflight.has(key)) return inflight.get(key);

  const promise = Promise.resolve()
    .then(fetcher)
    .then((data) => {
      setCache(key, data, ttlMs);
      inflight.delete(key);
      return data;
    })
    .catch((err) => {
      inflight.delete(key);
      throw err;
    });

  inflight.set(key, promise);
  return promise;
}

export function invalidateCachePrefix(prefix) {
  for (const key of store.keys()) {
    if (key.startsWith(prefix)) store.delete(key);
  }
  for (const key of inflight.keys()) {
    if (key.startsWith(prefix)) inflight.delete(key);
  }
  try {
    for (let i = sessionStorage.length - 1; i >= 0; i--) {
      const k = sessionStorage.key(i);
      if (k?.startsWith(SESSION_PREFIX + prefix)) {
        sessionStorage.removeItem(k);
      }
    }
  } catch {
    /* ignore */
  }
}
