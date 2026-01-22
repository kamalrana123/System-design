# Types of Caching & Strategies

Caching can be implemented at various layers of a system. Understanding where to cache and which strategy to use is crucial for system design.

## Caching Layers

### 1. Client-Side Caching (Browser)
Browsers cache static assets (images, CSS, JS) and API responses to avoid downloading them again. Controlled via HTTP headers (`Cache-Control`, `Expires`, `ETag`).

### 2. CDN (Content Delivery Network) Caching
CDNs cache static content at edge servers geographically closer to the user, significantly reducing latency for global users.

### 3. Load Balancer / Reverse Proxy Caching
Load balancers (like Nginx) can cache responses from upstream servers for a short duration, protecting backend servers from traffic spikes.

### 4. Application Caching (Local Cache)
Storing data in the memory of the application server itself (e.g., using a library like Guava or an in-memory object). Fast but hard to sync across multiple server instances.

### 5. Distributed Caching
Using an external service like **Redis** or **Memcached**. Shared across all application servers. Slower than local cache (network call involved) but ensures consistency across instances and survives app restarts.

### 6. Database Caching
Databases have their own internal buffers/caches to keep frequently accessed pages in memory.

---

## Caching Strategies (Patterns)

### 1. Cache-Aside (Lazy Loading)
*   **Flow**: App checks cache -> If miss, App reads DB -> App writes to cache -> App returns data.
*   **Pros**: Only requested data is cached. resilient to cache failure.
*   **Cons**: First request is slow (cache miss). Data can become stale.

### 2. Read-Through
*   **Flow**: App asks Cache -> Cache (on miss) reads DB -> Cache updates itself -> Cache returns data.
*   **Pros**: App logic is simpler (transparent).
*   **Cons**: First request is still slow.

### 3. Write-Through
*   **Flow**: App writes to Cache -> Cache synchronously writes to DB -> Return success.
*   **Pros**: Data in cache is always up-to-date.
*   **Cons**: Higher write latency (two writes).

### 4. Write-Around
*   **Flow**: App writes directly to DB (bypassing cache).
*   **Pros**: Good for data written once and read rarely (prevents cache flooding).
*   **Cons**: Read latency for recently written data is high (cache miss).

### 5. Write-Back (Write-Behind)
*   **Flow**: App writes to Cache -> Return success immediately -> Cache asynchronously writes to DB.
*   **Pros**: Very low write latency. Good for write-heavy workloads.
*   **Cons**: Risk of data loss if cache crashes before syncing to DB.
